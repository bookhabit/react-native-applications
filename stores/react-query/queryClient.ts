import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, //  default 0
      gcTime: 1000 * 60 * 5, // 5분 동안 메모리에 유지 - default 5 분
      retry: 1, // 실패 시 1번만 재시도
      retryDelay: 1000, // 재시도 간격 1초 (밀리초 단위)
    },
  },
});

export { queryClient };
