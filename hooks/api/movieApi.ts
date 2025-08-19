import { API_ENDPOINT } from "@/constants/endpoint";
import { MovieDetail, MovieResponse, SearchParams } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

const TMDB_API_KEY = process.env.EXPO_PUBLIC_MOVIE_API_KEY;
const BASE_URL = API_ENDPOINT.TMDB.BASE_URL;

if (!TMDB_API_KEY) {
  throw new Error("TMDB_API_KEY가 설정되지 않았습니다.");
}

// API 호출 함수들
const fetchMovies = async (
  endpoint: string,
  page: number = 1
): Promise<MovieResponse> => {
  const response = await fetch(
    `${BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=ko-KR&page=${page}`
  );

  if (!response.ok) {
    throw new Error("영화 데이터를 불러오는데 실패했습니다.");
  }

  return response.json();
};

const searchMovies = async (params: SearchParams): Promise<MovieResponse> => {
  const searchParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    language: "ko-KR",
    query: params.query,
    page: params.page?.toString() || "1",
    include_adult: params.include_adult?.toString() || "false",
  });

  if (params.year) {
    searchParams.append("year", params.year.toString());
  }

  const response = await fetch(
    `${BASE_URL}/search/movie?${searchParams.toString()}`
  );

  if (!response.ok) {
    throw new Error("영화 검색에 실패했습니다.");
  }

  return response.json();
};

const fetchMovieDetail = async (movieId: number): Promise<MovieDetail> => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=ko-KR&append_to_response=credits,videos,images`
  );

  if (!response.ok) {
    throw new Error("영화 상세 정보를 불러오는데 실패했습니다.");
  }

  return response.json();
};

// React Query 훅들
export const useMovies = (endpoint: string, page: number = 1) => {
  return useQuery({
    queryKey: ["movies", endpoint, page],
    queryFn: () => fetchMovies(endpoint, page),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};

export const useSearchMovies = (params: SearchParams) => {
  return useQuery({
    queryKey: ["search", params],
    queryFn: () => searchMovies(params),
    enabled: !!params.query && params.query.length > 0,
    staleTime: 2 * 60 * 1000, // 2분
    gcTime: 5 * 60 * 1000, // 5분
  });
};

export const useMovieDetail = (movieId: number) => {
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovieDetail(movieId),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000, // 10분
    gcTime: 30 * 60 * 1000, // 30분
  });
};

// 이미지 URL 생성 헬퍼 함수
export const getImageUrl = (path: string | null, size: string = "w500") => {
  if (!path) return null;
  return `${API_ENDPOINT.TMDB.IMAGE_BASE_URL}/${size}${path}`;
};

// 포스터 이미지 URL
export const getPosterUrl = (path: string | null, size: string = "w500") => {
  return getImageUrl(path, size);
};

// 배경 이미지 URL
export const getBackdropUrl = (path: string | null, size: string = "w1280") => {
  return getImageUrl(path, size);
};

// 썸네일 이미지 URL
export const getThumbnailUrl = (path: string | null) => {
  return getImageUrl(path, "w200");
};
