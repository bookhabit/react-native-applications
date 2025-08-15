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
  | "step-counter"
  | "form"
  | "action-sheet"
  | "modal";

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
    "form",
    "action-sheet",
    "modal",
  ].includes(route as AppRoute);
}
