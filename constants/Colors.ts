/**
 * 앱에서 사용하는 색상 상수들
 */

export const Colors = {
  // 기본 색상
  primary: "#0a7ea4",
  secondary: "#687076",
  success: "#28a745",
  warning: "#ffc107",
  error: "#dc3545",

  // 텍스트 색상
  text: "#11181C",
  textSecondary: "#6c757d",

  // 배경 및 테두리 색상
  background: "#fff",
  border: "#e9ecef",

  // 아이콘 색상
  icon: "#687076",
  tabIconDefault: "#687076",
  tabIconSelected: "#0a7ea4",

  // 라이트/다크 모드 호환성을 위한 기존 구조 유지
  light: {
    text: "#11181C",
    background: "#fff",
    tint: "#0a7ea4",
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: "#0a7ea4",
    primary: "#0a7ea4",
    secondary: "#687076",
    success: "#28a745",
    warning: "#ffc107",
    error: "#dc3545",
    border: "#e9ecef",
    textSecondary: "#6c757d",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: "#fff",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: "#fff",
    primary: "#fff",
    secondary: "#9BA1A6",
    success: "#28a745",
    warning: "#ffc107",
    error: "#dc3545",
    border: "#2d3748",
    textSecondary: "#9BA1A6",
  },
};
