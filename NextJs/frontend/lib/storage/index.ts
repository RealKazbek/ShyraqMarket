export * from "./keys";
export * from "./base";
export * from "./tokens";
export * from "./user";
export * from "./cart";
export * from "./favorites";

import { clearTokens } from "./tokens";
import { removeUser } from "./user";

export function clearAuthStorage() {
  clearTokens();
  removeUser();
}
