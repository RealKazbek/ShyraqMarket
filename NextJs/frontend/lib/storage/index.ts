export * from "./keys";
export * from "./base";
export * from "./tokens";
export * from "./user";

import { clearTokens } from "./tokens";
import { removeUser } from "./user";

export function clearAuthStorage() {
  clearTokens();
  removeUser();
}
