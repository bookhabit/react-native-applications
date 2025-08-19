import { Movie, MovieDetail, MovieResponse } from "@/types/movie";

// 샘플 영화 데이터
export const mockMovie: Movie = {
  id: 1,
  title: "테스트 영화",
  overview: "이것은 테스트용 영화입니다.",
  poster_path: "/test-poster.jpg",
  backdrop_path: "/test-backdrop.jpg",
  release_date: "2024-01-01",
  vote_average: 8.5,
  vote_count: 1000,
  popularity: 100.0,
  adult: false,
  genre_ids: [28, 12],
  original_title: "Test Movie",
  original_language: "ko",
};

export const mockMovie2: Movie = {
  id: 2,
  title: "테스트 영화 2",
  overview: "두 번째 테스트용 영화입니다.",
  poster_path: "/test-poster-2.jpg",
  backdrop_path: "/test-backdrop-2.jpg",
  release_date: "2024-02-01",
  vote_average: 7.8,
  vote_count: 800,
  popularity: 85.0,
  adult: false,
  genre_ids: [35, 18],
  original_title: "Test Movie 2",
  original_language: "ko",
};

export const mockMovieResponse: MovieResponse = {
  page: 1,
  results: [mockMovie, mockMovie2],
  total_pages: 5,
  total_results: 100,
};

export const mockMovieDetail: MovieDetail = {
  ...mockMovie,
  budget: 50000000,
  genres: [
    { id: 28, name: "액션" },
    { id: 12, name: "모험" },
  ],
  production_companies: [
    {
      id: 1,
      logo_path: "/company-logo.jpg",
      name: "테스트 프로덕션",
      origin_country: "KR",
    },
  ],
  production_countries: [
    {
      iso_3166_1: "KR",
      name: "대한민국",
    },
  ],
  revenue: 150000000,
  runtime: 120,
  spoken_languages: [
    {
      english_name: "Korean",
      iso_639_1: "ko",
      name: "한국어",
    },
  ],
  status: "Released",
  tagline: "테스트용 태그라인",
  title: "테스트 영화",
  vote_average: 8.5,
  vote_count: 1000,
};

// API 에러 응답
export const mockApiError = {
  status: 500,
  message: "Internal Server Error",
};

// 빈 검색 결과
export const mockEmptySearchResponse: MovieResponse = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
};
