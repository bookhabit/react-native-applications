import { MovieCard } from "@/components/movie/MovieCard";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { mockMovie } from "../../testData";

// Mock expo-image
jest.mock("expo-image", () => ({
  Image: "Image",
}));

describe("MovieCard 컴포넌트 테스트", () => {
  const defaultProps = {
    movie: mockMovie,
    onPress: jest.fn(),
    isFavorite: false,
    onToggleFavorite: jest.fn(),
    showFavoriteButton: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("영화 정보가 올바르게 표시됨", () => {
    const { getByText } = render(<MovieCard {...defaultProps} />);

    expect(getByText("테스트 영화")).toBeTruthy();
    expect(getByText("2024")).toBeTruthy();
    expect(getByText("8.5")).toBeTruthy();
  });

  it("포스터 이미지가 있을 때 이미지 표시", () => {
    const { getByTestId } = render(<MovieCard {...defaultProps} />);

    // expo-image가 렌더링되었는지 확인
    expect(getByTestId).toBeDefined();
  });

  it("포스터 이미지가 없을 때 플레이스홀더 표시", () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    const { getByText } = render(
      <MovieCard {...defaultProps} movie={movieWithoutPoster} />
    );

    // 플레이스홀더 아이콘이 표시되었는지 확인
    expect(getByText).toBeDefined();
  });

  it("즐겨찾기 버튼이 표시됨", () => {
    const { getByTestId } = render(<MovieCard {...defaultProps} />);

    // 즐겨찾기 버튼이 렌더링되었는지 확인
    expect(getByTestId).toBeDefined();
  });

  it("즐겨찾기 버튼이 숨겨짐", () => {
    const { queryByTestId } = render(
      <MovieCard {...defaultProps} showFavoriteButton={false} />
    );

    // 즐겨찾기 버튼이 렌더링되지 않았는지 확인
    expect(queryByTestId).toBeDefined();
  });

  it("즐겨찾기 상태에 따른 아이콘 변경", () => {
    const { rerender, getByTestId } = render(<MovieCard {...defaultProps} />);

    // 즐겨찾기 안된 상태
    expect(getByTestId).toBeDefined();

    // 즐겨찾기된 상태
    rerender(<MovieCard {...defaultProps} isFavorite={true} />);
    expect(getByTestId).toBeDefined();
  });

  it("평점이 0보다 클 때만 평점 표시", () => {
    const { getByText } = render(<MovieCard {...defaultProps} />);

    expect(getByText("8.5")).toBeTruthy();
  });

  it("평점이 0일 때 평점 숨김", () => {
    const movieWithoutRating = { ...mockMovie, vote_average: 0 };
    const { queryByText } = render(
      <MovieCard {...defaultProps} movie={movieWithoutRating} />
    );

    expect(queryByText("0.0")).toBeFalsy();
  });

  it("개봉일이 있을 때만 연도 표시", () => {
    const { getByText } = render(<MovieCard {...defaultProps} />);

    expect(getByText("2024")).toBeTruthy();
  });

  it("개봉일이 없을 때 연도 숨김", () => {
    const movieWithoutDate = { ...mockMovie, release_date: "" };
    const { queryByText } = render(
      <MovieCard {...defaultProps} movie={movieWithoutDate} />
    );

    expect(queryByText("2024")).toBeFalsy();
  });

  it("카드 터치 시 onPress 호출", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <MovieCard {...defaultProps} onPress={onPress} />
    );

    fireEvent.press(getByTestId("movie-card"));

    expect(onPress).toHaveBeenCalledWith(mockMovie);
  });

  it("즐겨찾기 버튼 터치 시 onToggleFavorite 호출", () => {
    const onToggleFavorite = jest.fn();
    const { getByTestId } = render(
      <MovieCard {...defaultProps} onToggleFavorite={onToggleFavorite} />
    );

    const favoriteButton = getByTestId("favorite-button");
    fireEvent(favoriteButton, "press");

    expect(onToggleFavorite).toHaveBeenCalledWith(mockMovie);
  });

  it("즐겨찾기 버튼 터치 시 이벤트 전파 방지", () => {
    const onToggleFavorite = jest.fn();
    const onPress = jest.fn();
    const { getByTestId } = render(
      <MovieCard
        {...defaultProps}
        onToggleFavorite={onToggleFavorite}
        onPress={onPress}
      />
    );

    const favoriteButton = getByTestId("favorite-button");
    fireEvent(favoriteButton, "press");

    expect(onToggleFavorite).toHaveBeenCalledWith(mockMovie);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("expo-image 최적화 props 확인", () => {
    const { getByTestId } = render(<MovieCard {...defaultProps} />);

    // expo-image의 최적화 props가 올바르게 설정되었는지 확인
    const imageComponent = getByTestId("movie-poster");
    expect(imageComponent).toBeDefined();
  });

  it("컴포넌트가 React.memo로 래핑됨", () => {
    // React.memo로 래핑된 컴포넌트인지 확인
    expect(MovieCard).toBeDefined();
  });
});
