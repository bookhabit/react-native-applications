export type AppRoute =
  | "todo"
  | "weather"
  | "notes"
  | "chat"
  | "movies"
  | "calendar"
  | "gallery"
  | "shop"
  | "quiz"
  | "step-counter";

export interface AppInfo {
  title: string;
  description: string;
  route: AppRoute;
  icon: string;
  color: string;
}

// 타입 가드 함수
export function isValidRoute(route: string): route is AppRoute {
  return [
    "todo",
    "weather",
    "notes",
    "chat",
    "movies",
    "calendar",
    "gallery",
    "shop",
    "quiz",
    "step-counter",
  ].includes(route as AppRoute);
}
