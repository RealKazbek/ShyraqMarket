import { ApiError } from "./errors";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  clearAuthStorage,
} from "@/lib/storage";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://127.0.0.1:8000";

const REFRESH_PATH = process.env.NEXT_PUBLIC_REFRESH_PATH || "/auth/refresh/";

const DEFAULT_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS || 15000);

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;
const pendingRequests: Array<() => void> = [];

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => reject(new ApiError(0, "Request timeout")), ms);
    p.then((v) => {
      clearTimeout(id);
      resolve(v);
    }).catch((e) => {
      clearTimeout(id);
      reject(e);
    });
  });
}

async function doRefreshToken(): Promise<void> {
  if (isRefreshing && refreshPromise) return refreshPromise;
  isRefreshing = true;

  const fn = async () => {
    const refresh = getRefreshToken();
    if (!refresh) throw new ApiError(401, "No refresh token");

    const res = await fetch(`${API_URL}${REFRESH_PATH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new ApiError(
        res.status,
        `Refresh failed: ${text}` || "Refresh failed"
      );
    }

    const data = (await res.json()) as { access: string; refresh?: string };
    if (!data?.access) throw new ApiError(500, "Invalid refresh response");

    setAccessToken(data.access);
    if (data.refresh) setRefreshToken(data.refresh);
  };

  refreshPromise = fn()
    .then(() => {
      isRefreshing = false;
      refreshPromise = null;
      pendingRequests.splice(0).forEach((cb) => cb());
    })
    .catch((err) => {
      isRefreshing = false;
      refreshPromise = null;
      pendingRequests.splice(0).forEach((cb) => cb());
      throw err;
    });

  return refreshPromise;
}

type ApiOptions = RequestInit & {
  timeoutMs?: number;
  enableRefresh?: boolean;
};

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const {
    timeoutMs = DEFAULT_TIMEOUT,
    enableRefresh = true,
    headers: hdrs,
    ...rest
  } = options;

  const token = getAccessToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(hdrs || {}),
  };

  const exec = () =>
    fetch(`${API_URL}${endpoint}`, {
      ...rest,
      headers,
    });

  let response: Response;
  try {
    response = await withTimeout(exec(), timeoutMs);
  } catch (e: unknown) {
    if (e instanceof ApiError) throw e;
    if (e instanceof Error) {
      throw new ApiError(0, e.message || "Network error");
    }
    throw new ApiError(0, "Unknown network error");
  }

  if (response.status === 401 && enableRefresh) {
    try {
      if (isRefreshing && refreshPromise) {
        await refreshPromise;
      } else {
        await doRefreshToken();
      }

      const newAccess = getAccessToken();
      const retryHeaders: HeadersInit = {
        ...headers,
        ...(newAccess ? { Authorization: `Bearer ${newAccess}` } : {}),
      };

      response = await withTimeout(
        fetch(`${API_URL}${endpoint}`, { ...rest, headers: retryHeaders }),
        timeoutMs
      );
    } catch (err) {
      clearAuthStorage();
      window.dispatchEvent(new Event("userLoggedOut"));
      const msg = err instanceof ApiError ? err.message : "Unauthorized";
      throw new ApiError(401, msg);
    }
  }

  if (
    (response.status === 429 || response.status >= 500) &&
    response.status < 600
  ) {
    await new Promise((r) => setTimeout(r, 500));
    response = await withTimeout(exec(), timeoutMs);
  }

  if (!response.ok) {
    let payload: unknown = null;
    let message = `API error ${response.status}`;
    try {
      const text = await response.text();
      payload = text;
      if (text) message += `: ${text}`;
    } catch {
      /* ignore */
    }
    throw new ApiError(response.status, message, payload);
  }

  try {
    return (await response.json()) as T;
  } catch {
    return {} as T;
  }
}
