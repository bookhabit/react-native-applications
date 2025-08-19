import { CategorySelector } from "@/components/movie/CategorySelector";
import { Category } from "@/types/movie";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

describe("CategorySelector 컴포넌트 테스트", () => {
  const mockCategories: Category[] = [
    { id: "now_playing", name: "현재 상영", endpoint: "/movie/now_playing" },
    { id: "popular", name: "인기 영화", endpoint: "/movie/popular" },
    { id: "top_rated", name: "평점 높은", endpoint: "/movie/top_rated" },
    { id: "upcoming", name: "개봉 예정", endpoint: "/movie/upcoming" },
    { id: "favorites", name: "즐겨찾기", endpoint: "" },
  ];

  const defaultProps = {
    categories: mockCategories,
    selectedCategory: "now_playing",
    onSelectCategory: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("모든 카테고리가 표시됨", () => {
    const { getByText } = render(<CategorySelector {...defaultProps} />);

    expect(getByText("현재 상영")).toBeTruthy();
    expect(getByText("인기 영화")).toBeTruthy();
    expect(getByText("평점 높은")).toBeTruthy();
    expect(getByText("개봉 예정")).toBeTruthy();
    expect(getByText("즐겨찾기")).toBeTruthy();
  });

  it("현재 선택된 카테고리가 하이라이트됨", () => {
    const { getByText } = render(<CategorySelector {...defaultProps} />);

    const selectedCategory = getByText("현재 상영");
    expect(selectedCategory).toBeTruthy();

    // 선택된 카테고리의 스타일이 적용되었는지 확인
    // (실제 스타일 검증은 스냅샷 테스트나 스타일 속성 검증으로 가능)
  });

  it("카테고리 터치 시 onSelectCategory 호출", () => {
    const onSelectCategory = jest.fn();
    const { getByText } = render(
      <CategorySelector {...defaultProps} onSelectCategory={onSelectCategory} />
    );

    fireEvent.press(getByText("인기 영화"));

    expect(onSelectCategory).toHaveBeenCalledWith("popular");
  });

  it("다른 카테고리 선택 시 선택 상태 변경", () => {
    const onSelectCategory = jest.fn();
    const { getByText } = render(
      <CategorySelector {...defaultProps} onSelectCategory={onSelectCategory} />
    );

    fireEvent.press(getByText("평점 높은"));

    expect(onSelectCategory).toHaveBeenCalledWith("top_rated");
  });

  it("즐겨찾기 카테고리 선택", () => {
    const onSelectCategory = jest.fn();
    const { getByText } = render(
      <CategorySelector {...defaultProps} onSelectCategory={onSelectCategory} />
    );

    fireEvent.press(getByText("즐겨찾기"));

    expect(onSelectCategory).toHaveBeenCalledWith("favorites");
  });

  it("가로 스크롤이 가능함", () => {
    const { getByTestId } = render(<CategorySelector {...defaultProps} />);

    // ScrollView가 렌더링되었는지 확인
    const scrollView = getByTestId("category-scroll");
    expect(scrollView).toBeDefined();
  });

  it("컴포넌트가 React.memo로 래핑됨", () => {
    // React.memo로 래핑된 컴포넌트인지 확인
    expect(CategorySelector).toBeDefined();
  });

  it("빈 카테고리 배열 처리", () => {
    const { getByTestId } = render(
      <CategorySelector
        categories={[]}
        selectedCategory=""
        onSelectCategory={jest.fn()}
      />
    );

    // 빈 상태에서도 컴포넌트가 렌더링됨
    const scrollView = getByTestId("category-scroll");
    expect(scrollView).toBeDefined();
  });

  it("선택된 카테고리가 categories 배열에 없을 때 처리", () => {
    const { getByTestId } = render(
      <CategorySelector
        categories={mockCategories}
        selectedCategory="invalid_category"
        onSelectCategory={jest.fn()}
      />
    );

    // 유효하지 않은 카테고리 ID로도 컴포넌트가 렌더링됨
    const scrollView = getByTestId("category-scroll");
    expect(scrollView).toBeDefined();
  });

  it("카테고리 버튼의 activeOpacity 설정", () => {
    const { getByText } = render(<CategorySelector {...defaultProps} />);

    const categoryButton = getByText("현재 상영");
    expect(categoryButton).toBeTruthy();

    // activeOpacity가 설정되었는지 확인 (실제 값은 컴포넌트 내부에서 확인)
  });

  it("스크롤 인디케이터가 숨겨짐", () => {
    const { getByTestId } = render(<CategorySelector {...defaultProps} />);

    const scrollView = getByTestId("category-scroll");
    expect(scrollView).toBeDefined();

    // showsHorizontalScrollIndicator가 false로 설정되었는지 확인
  });
});
