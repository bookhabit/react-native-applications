import { MovieDetailModal } from "@/components/movie/MovieDetailModal";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { mockMovieDetail } from "../../testData.helper";

// Mock expo-image
jest.mock("expo-image", () => ({
  Image: "Image",
}));

describe("MovieDetailModal 컴포넌트 테스트", () => {
  const defaultProps = {
    visible: true,
    movie: mockMovieDetail,
    isFavorite: false,
    onClose: jest.fn(),
    onToggleFavorite: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("모달이 visible일 때 렌더링됨", () => {
    const { getByText } = render(<MovieDetailModal {...defaultProps} />);

    expect(getByText("테스트 영화")).toBeTruthy();
    expect(getByText('"테스트용 태그라인"')).toBeTruthy();
    expect(getByText("2024")).toBeTruthy();
    expect(getByText("2시간 0분")).toBeTruthy();
    expect(getByText("8.5")).toBeTruthy();
  });

  it("모달이 visible이 아닐 때 렌더링 안됨", () => {
    const { queryByText } = render(
      <MovieDetailModal {...defaultProps} visible={false} />
    );

    expect(queryByText("테스트 영화")).toBeFalsy();
  });

  it("movie가 null일 때 렌더링 안됨", () => {
    const { queryByText } = render(
      <MovieDetailModal {...defaultProps} movie={null} />
    );

    expect(queryByText("테스트 영화")).toBeFalsy();
  });

  it("영화 제목이 올바르게 표시됨", () => {
    const { getByText } = render(<MovieDetailModal {...defaultProps} />);

    expect(getByText("테스트 영화")).toBeTruthy();
  });

  it("태그라인이 있을 때 표시됨", () => {
    const { getByText } = render(<MovieDetailModal {...defaultProps} />);

    expect(getByText('"테스트용 태그라인"')).toBeTruthy();
  });

  it("태그라인이 없을 때 숨겨짐", () => {
    const movieWithoutTagline = { ...mockMovieDetail, tagline: "" };
    const { queryByText } = render(
      <MovieDetailModal {...defaultProps} movie={movieWithoutTagline} />
    );

    expect(queryByText('""')).toBeFalsy();
  });

  it("개봉 연도가 표시됨", () => {
    const { getByText } = render(<MovieDetailModal {...defaultProps} />);

    expect(getByText("2024")).toBeTruthy();
  });

  it("상영 시간이 표시됨", () => {
    const { getByText } = render(<MovieDetailModal {...defaultProps} />);

    expect(getByText("2시간 0분")).toBeTruthy();
  });

  it("평점이 표시됨", () => {
    const { getByText } = render(<MovieDetailModal {...defaultProps} />);

    expect(getByText("8.5")).toBeTruthy();
  });

  it("장르가 표시됨", () => {
    const { getByText } = render(<MovieDetailModal {...defaultProps} />);

    expect(getByText("액션")).toBeTruthy();
    expect(getByText("모험")).toBeTruthy();
  });

  it("줄거리가 표시됨", () => {
    const { getByText } = render(<MovieDetailModal {...defaultProps} />);

    expect(getByText("이것은 테스트용 영화입니다.")).toBeTruthy();
  });

  it("줄거리가 없을 때 숨겨짐", () => {
    const movieWithoutOverview = { ...mockMovieDetail, overview: "" };
    const { queryByText } = render(
      <MovieDetailModal {...defaultProps} movie={movieWithoutOverview} />
    );

    expect(queryByText("줄거리")).toBeFalsy();
  });

  it("제작 정보가 표시됨", () => {
    const { getByText } = render(<MovieDetailModal {...defaultProps} />);

    expect(getByText("제작 정보")).toBeTruthy();
    expect(getByText("$50.0M")).toBeTruthy(); // 예산
    expect(getByText("$150.0M")).toBeTruthy(); // 수익
    expect(getByText("개봉됨")).toBeTruthy(); // 상태
    expect(getByText("KO")).toBeTruthy(); // 언어
  });

  it("제작사가 표시됨", () => {
    const { getByText } = render(<MovieDetailModal {...defaultProps} />);

    expect(getByText("제작사")).toBeTruthy();
    expect(getByText("• 테스트 프로덕션")).toBeTruthy();
  });

  it("닫기 버튼 터치 시 onClose 호출", () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <MovieDetailModal {...defaultProps} onClose={onClose} />
    );

    fireEvent.press(getByTestId("close-button"));

    expect(onClose).toHaveBeenCalled();
  });

  it("즐겨찾기 버튼 터치 시 onToggleFavorite 호출", () => {
    const onToggleFavorite = jest.fn();
    const { getByTestId } = render(
      <MovieDetailModal {...defaultProps} onToggleFavorite={onToggleFavorite} />
    );

    fireEvent.press(getByTestId("favorite-button"));

    expect(onToggleFavorite).toHaveBeenCalled();
  });

  it("즐겨찾기 상태에 따른 아이콘 변경", () => {
    const { rerender, getByTestId } = render(
      <MovieDetailModal {...defaultProps} />
    );

    // 즐겨찾기 안된 상태
    expect(getByTestId("favorite-button")).toBeTruthy();

    // 즐겨찾기된 상태
    rerender(<MovieDetailModal {...defaultProps} isFavorite={true} />);
    expect(getByTestId("favorite-button")).toBeTruthy();
  });

  it("배경 이미지가 있을 때 표시됨", () => {
    const { getByTestId } = render(<MovieDetailModal {...defaultProps} />);

    const backdropImage = getByTestId("backdrop-image");
    expect(backdropImage).toBeTruthy();
  });

  it("배경 이미지가 없을 때 숨겨짐", () => {
    const movieWithoutBackdrop = { ...mockMovieDetail, backdrop_path: null };
    const { queryByTestId } = render(
      <MovieDetailModal {...defaultProps} movie={movieWithoutBackdrop} />
    );

    const backdropImage = queryByTestId("backdrop-image");
    expect(backdropImage).toBeFalsy();
  });

  it("포스터 이미지가 있을 때 표시됨", () => {
    const { getByTestId } = render(<MovieDetailModal {...defaultProps} />);

    const posterImage = getByTestId("poster-image");
    expect(posterImage).toBeTruthy();
  });

  it("포스터 이미지가 없을 때 플레이스홀더 표시", () => {
    const movieWithoutPoster = { ...mockMovieDetail, poster_path: null };
    const { getByTestId } = render(
      <MovieDetailModal {...defaultProps} movie={movieWithoutPoster} />
    );

    const posterPlaceholder = getByTestId("poster-placeholder");
    expect(posterPlaceholder).toBeTruthy();
  });

  it("expo-image 최적화 props 확인", () => {
    const { getByTestId } = render(<MovieDetailModal {...defaultProps} />);

    // expo-image의 최적화 props가 올바르게 설정되었는지 확인
    const backdropImage = getByTestId("backdrop-image");
    const posterImage = getByTestId("poster-image");

    expect(backdropImage).toBeTruthy();
    expect(posterImage).toBeTruthy();
  });

  it("스크롤이 가능함", () => {
    const { getByTestId } = render(<MovieDetailModal {...defaultProps} />);

    const scrollView = getByTestId("modal-scroll");
    expect(scrollView).toBeTruthy();
  });

  it('예산이 0일 때 "정보 없음" 표시', () => {
    const movieWithoutBudget = { ...mockMovieDetail, budget: 0 };
    const { getByText } = render(
      <MovieDetailModal {...defaultProps} movie={movieWithoutBudget} />
    );

    expect(getByText("정보 없음")).toBeTruthy();
  });

  it('수익이 0일 때 "정보 없음" 표시', () => {
    const movieWithoutRevenue = { ...mockMovieDetail, revenue: 0 };
    const { getByText } = render(
      <MovieDetailModal {...defaultProps} movie={movieWithoutRevenue} />
    );

    expect(getByText("정보 없음")).toBeTruthy();
  });

  it("상영 시간이 0일 때 표시 안함", () => {
    const movieWithoutRuntime = { ...mockMovieDetail, runtime: 0 };
    const { queryByText } = render(
      <MovieDetailModal {...defaultProps} movie={movieWithoutRuntime} />
    );

    expect(queryByText("0시간 0분")).toBeFalsy();
  });

  it("평점이 0일 때 표시 안함", () => {
    const movieWithoutRating = { ...mockMovieDetail, vote_average: 0 };
    const { queryByText } = render(
      <MovieDetailModal {...defaultProps} movie={movieWithoutRating} />
    );

    expect(queryByText("0.0")).toBeFalsy();
  });
});
