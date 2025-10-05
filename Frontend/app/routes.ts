import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  ...prefix("auth", [
    route("registration", "routes/auth/registration.tsx"),
    route("login", "routes/auth/login.tsx"),
  ]),
] satisfies RouteConfig;
