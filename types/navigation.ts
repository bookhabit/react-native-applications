export type AppRoute =
  | "/todo"
  | "/weather"
  | "/notes"
  | "/chat"
  | "/movies"
  | "/calendar"
  | "/gallery"
  | "/shop"
  | "/quiz"
  | "/step-counter";

export interface AppInfo {
  title: string;
  description: string;
  route: AppRoute;
  icon: string;
  color: string;
}
