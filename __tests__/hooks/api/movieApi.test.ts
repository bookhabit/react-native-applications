import { AXIOS } from "@/api/config";
import {
  getOptimizedImageUrl,
  useMovieDetail,
  useMovies,
  useSearchMovies,
} from "@/hooks/api/movieApi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react-native";
import React from "react";
import { mockMovieDetail, mockMovieResponse } from "../../testData";

// Mock AXIOS
const mockAxios = AXIOS as jest.Mocked<typeof AXIOS>;

// QueryClient 래퍼 컴포넌트
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => {
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children
    );
  };
};

describe("movieApi 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("useMovies", () => {
    it("영화 목록을 정상적으로 가져옴", async () => {
      mockAxios.get.mockResolvedValueOnce({
        status: 200,
        data: mockMovieResponse,
      });

      const { result } = renderHook(() => useMovies("/movie/now_playing"), {
        wrapper: createWrapper(),
      });

      // 초기 상태 확인
      expect(result.current).toBeDefined();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toBeDefined();
      expect(result.current.data?.pages[0]).toEqual(mockMovieResponse);
    });

    it("API 에러 발생 시 적절한 에러 상태", async () => {
      mockAxios.get.mockRejectedValueOnce(new Error("API Error"));

      const { result } = renderHook(() => useMovies("/movie/now_playing"), {
        wrapper: createWrapper(),
      });

      // 초기 상태 확인
      expect(result.current).toBeDefined();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBeDefined();
      expect(result.current.data).toBeUndefined();
    });

    it("페이지네이션 정보가 올바르게 설정됨", async () => {
      mockAxios.get.mockResolvedValueOnce({
        status: 200,
        data: mockMovieResponse,
      });

      const { result } = renderHook(() => useMovies("/movie/now_playing"), {
        wrapper: createWrapper(),
      });

      // 초기 상태 확인
      expect(result.current).toBeDefined();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toBeDefined();
      expect(result.current.data?.pages[0].page).toBe(1);
      expect(result.current.data?.pages[0].total_pages).toBe(10);
      expect(result.current.data?.pages[0].total_results).toBe(200);
    });
  });

  describe("useSearchMovies", () => {
    it("검색어가 있을 때만 API 호출", () => {
      const { result } = renderHook(
        () => useSearchMovies({ query: "테스트", page: 1 }),
        { wrapper: createWrapper() }
      );

      // 초기 상태 확인
      expect(result.current).toBeDefined();
      expect(result.current.isLoading).toBe(true);
    });

    it("빈 검색어일 때 API 호출 안함", () => {
      const { result } = renderHook(
        () => useSearchMovies({ query: "", page: 1 }),
        { wrapper: createWrapper() }
      );

      // 초기 상태 확인
      expect(result.current).toBeDefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
    });

    it("검색 결과를 정상적으로 반환", async () => {
      mockAxios.get.mockResolvedValueOnce({
        status: 200,
        data: mockMovieResponse,
      });

      const { result } = renderHook(
        () => useSearchMovies({ query: "테스트", page: 1 }),
        { wrapper: createWrapper() }
      );

      // 초기 상태 확인
      expect(result.current).toBeDefined();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toBeDefined();
      expect(result.current.data?.pages[0]).toEqual(mockMovieResponse);
    });
  });

  describe("useMovieDetail", () => {
    it("유효한 영화 ID로 상세 정보 가져오기", async () => {
      mockAxios.get.mockResolvedValueOnce({
        status: 200,
        data: mockMovieDetail,
      });

      const { result } = renderHook(() => useMovieDetail(1), {
        wrapper: createWrapper(),
      });

      // 초기 상태 확인
      expect(result.current).toBeDefined();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockMovieDetail);
    });

    it("잘못된 영화 ID로 에러 발생", async () => {
      mockAxios.get.mockRejectedValueOnce(new Error("Movie not found"));

      const { result } = renderHook(() => useMovieDetail(999), {
        wrapper: createWrapper(),
      });

      // 초기 상태 확인
      expect(result.current).toBeDefined();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBeDefined();
      expect(result.current.data).toBeUndefined();
    });
  });

  describe("이미지 URL 헬퍼 함수", () => {
    it("포스터 URL을 올바른 크기로 생성", () => {
      const posterUrl = getOptimizedImageUrl("/test-poster.jpg", "poster");
      expect(posterUrl).toContain("w500");
      expect(posterUrl).toContain("/test-poster.jpg");
    });

    it("배경 URL을 고해상도로 생성", () => {
      const backdropUrl = getOptimizedImageUrl(
        "/test-backdrop.jpg",
        "backdrop"
      );
      expect(backdropUrl).toContain("w1280");
      expect(backdropUrl).toContain("/test-backdrop.jpg");
    });

    it("썸네일 URL을 작은 크기로 생성", () => {
      const thumbnailUrl = getOptimizedImageUrl(
        "/test-poster.jpg",
        "thumbnail"
      );
      expect(thumbnailUrl).toContain("w200");
      expect(thumbnailUrl).toContain("/test-poster.jpg");
    });

    it("poster_path가 null일 때 null 반환", () => {
      const posterUrl = getOptimizedImageUrl(null, "poster");
      expect(posterUrl).toBeNull();
    });

    it("기본 타입은 poster로 설정", () => {
      const posterUrl = getOptimizedImageUrl("/test-poster.jpg");
      expect(posterUrl).toContain("w500");
    });
  });
});
