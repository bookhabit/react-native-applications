import { TextBox } from "@/components/atom/TextBox";

import { CategorySelector } from "@/components/movie/CategorySelector";
import { MovieCard } from "@/components/movie/MovieCard";
import { MovieDetailModal } from "@/components/movie/MovieDetailModal";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import {
  useMovieDetail,
  useMovies,
  useSearchMovies,
} from "@/hooks/api/movieApi";
import { useDebounce } from "@/hooks/useDebounce";
import { useFavorites } from "@/hooks/useFavorites";
import { Category as CategoryType, Movie } from "@/types/movie";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// 카테고리 정의
const CATEGORIES: CategoryType[] = [
  { id: "now_playing", name: "현재 상영", endpoint: "/movie/now_playing" },
  { id: "popular", name: "인기 영화", endpoint: "/movie/popular" },
  { id: "top_rated", name: "평점 높은", endpoint: "/movie/top_rated" },
  { id: "upcoming", name: "개봉 예정", endpoint: "/movie/upcoming" },
  { id: "favorites", name: "즐겨찾기", endpoint: "" },
];

export default function MoviesScreen() {
  const [selectedCategory, setSelectedCategory] = useState("now_playing");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  // 디바운스된 검색어
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // 즐겨찾기 훅
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  // 현재 선택된 카테고리
  const currentCategory = CATEGORIES.find((cat) => cat.id === selectedCategory);

  // API 호출
  const {
    data: moviesData,
    isLoading: moviesLoading,
    error: moviesError,
    refetch: refetchMovies,
    fetchNextPage: fetchNextMovies,
    hasNextPage: hasNextMovies,
    isFetchingNextPage: isFetchingNextMovies,
  } = useMovies(currentCategory?.endpoint || "/movie/now_playing");

  // 검색 API 호출
  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError,
    fetchNextPage: fetchNextSearch,
    hasNextPage: hasNextSearch,
    isFetchingNextPage: isFetchingNextSearch,
  } = useSearchMovies({
    query: debouncedSearchQuery,
  });

  // 영화 상세 정보
  const { data: movieDetail, isLoading: detailLoading } = useMovieDetail(
    selectedMovie?.id || 0
  );

  // 현재 표시할 데이터 결정
  const isSearchMode = debouncedSearchQuery.length > 0;
  const isFavoritesMode = selectedCategory === "favorites";

  // useInfiniteQuery 데이터를 평면화 (useMemo로 최적화)
  const flattenMoviesData = useMemo(
    () => moviesData?.pages.flatMap((page) => page.results) || [],
    [moviesData?.pages]
  );

  const flattenSearchData = useMemo(
    () => searchData?.pages.flatMap((page) => page.results) || [],
    [searchData?.pages]
  );

  const currentData = useMemo(() => {
    if (isSearchMode) return flattenSearchData;
    if (isFavoritesMode) return favorites;
    return flattenMoviesData;
  }, [
    isSearchMode,
    isFavoritesMode,
    flattenSearchData,
    favorites,
    flattenMoviesData,
  ]);

  console.log("영화데이터", flattenMoviesData.length);

  const isLoading = moviesLoading || searchLoading;
  const isFetchingNext = isFetchingNextMovies || isFetchingNextSearch;
  const error = moviesError || searchError;

  // 카테고리 변경 핸들러
  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery("");
  }, []);

  // 영화 카드 클릭 핸들러
  const handleMoviePress = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
    setDetailModalVisible(true);
  }, []);

  // 즐겨찾기 토글 핸들러
  const handleToggleFavorite = useCallback(
    (movie: Movie) => {
      toggleFavorite(movie);
    },
    [toggleFavorite]
  );

  // 모달 닫기 핸들러
  const handleCloseModal = useCallback(() => {
    setDetailModalVisible(false);
    setSelectedMovie(null);
  }, []);

  // 즐겨찾기 토글 (모달에서)
  const handleModalToggleFavorite = useCallback(() => {
    if (selectedMovie) {
      toggleFavorite(selectedMovie);
    }
  }, [selectedMovie, toggleFavorite]);

  // 새로고침 핸들러
  const handleRefresh = useCallback(() => {
    if (isSearchMode) {
      // 검색 모드에서는 새로고침 불가
      return;
    }
    refetchMovies();
  }, [isSearchMode, refetchMovies]);

  // 페이지네이션 핸들러
  const handleLoadMore = useCallback(() => {
    if (isLoading || isFavoritesMode) return;

    if (isSearchMode) {
      if (hasNextSearch && !isFetchingNextSearch) {
        fetchNextSearch();
      }
    } else {
      if (hasNextMovies && !isFetchingNextMovies) {
        fetchNextMovies();
      }
    }
  }, [
    isLoading,
    isFavoritesMode,
    isSearchMode,
    hasNextSearch,
    isFetchingNextSearch,
    fetchNextSearch,
    hasNextMovies,
    isFetchingNextMovies,
    fetchNextMovies,
  ]);

  // 에러 처리
  if (error) {
    return (
      <ThemedView style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color={Colors.error} />
        <TextBox type="title2" style={styles.errorTitle}>
          오류가 발생했습니다
        </TextBox>
        <TextBox type="body2" style={styles.errorMessage}>
          영화 정보를 불러오는데 실패했습니다. 다시 시도해주세요.
        </TextBox>
      </ThemedView>
    );
  }

  // 렌더 아이템
  const renderMovieItem = useCallback(
    ({ item }: { item: Movie }) => (
      <MovieCard
        movie={item}
        onPress={handleMoviePress}
        isFavorite={isFavorite(item.id)}
        onToggleFavorite={handleToggleFavorite}
        showFavoriteButton={!isFavoritesMode}
      />
    ),
    [handleMoviePress, isFavorite, handleToggleFavorite, isFavoritesMode]
  );

  // keyExtractor 최적화
  const keyExtractor = useCallback((item: Movie) => item.id.toString(), []);

  // 빈 상태 렌더링
  const renderEmptyState = useCallback(() => {
    if (isLoading) return null;

    let message = "영화를 찾을 수 없습니다.";
    if (isSearchMode) {
      message = `"${debouncedSearchQuery}"에 대한 검색 결과가 없습니다.`;
    } else if (isFavoritesMode) {
      message = "즐겨찾기한 영화가 없습니다.";
    }

    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name={isFavoritesMode ? "heart-outline" : "search-outline"}
          size={64}
          color={Colors.textSecondary}
        />
        <TextBox type="title2" style={styles.emptyTitle}>
          {isFavoritesMode ? "즐겨찾기 없음" : "검색 결과 없음"}
        </TextBox>
        <TextBox type="body2" style={styles.emptyMessage}>
          {message}
        </TextBox>
      </View>
    );
  }, [isLoading, isSearchMode, isFavoritesMode, debouncedSearchQuery]);

  // 로딩 푸터
  const renderFooter = useCallback(() => {
    if (!isFetchingNext || isFavoritesMode) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={Colors.primary} />
      </View>
    );
  }, [isFetchingNext, isFavoritesMode]);

  return (
    <ThemedView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        {/* 검색 입력 */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.textSecondary} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="영화 제목을 검색하세요..."
            style={styles.searchInput}
            autoCapitalize="none"
            autoCorrect={false}
            testID="search-input"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              testID="clear-search"
            >
              <Ionicons
                name="close-circle"
                size={20}
                color={Colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 카테고리 선택 */}
      {!isSearchMode && (
        <CategorySelector
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
        />
      )}

      {/* 영화 목록 */}
      <FlatList
        data={currentData}
        renderItem={renderMovieItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        ListEmptyComponent={renderEmptyState}
        ListFooterComponent={renderFooter}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={5}
        initialNumToRender={10}
        updateCellsBatchingPeriod={100}
        disableVirtualization={false}
        getItemLayout={undefined}
        testID="movies-flatlist"
      />

      {/* 영화 상세 모달 */}
      <MovieDetailModal
        visible={detailModalVisible}
        movie={movieDetail || null}
        isFavorite={selectedMovie ? isFavorite(selectedMovie.id) : false}
        onClose={handleCloseModal}
        onToggleFavorite={handleModalToggleFavorite}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
    height: 50,
  },
  searchInput: {
    flex: 1, // ✅ 남은 공간을 모두 차지
    fontSize: 16,
    height: "100%", // 높이도 컨테이너에 맞게
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  errorTitle: {
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  errorMessage: {
    textAlign: "center",
    color: Colors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    minHeight: 400,
  },
  emptyTitle: {
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  emptyMessage: {
    textAlign: "center",
    color: Colors.textSecondary,
  },
  footerLoader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 8,
  },
  footerText: {
    color: Colors.textSecondary,
  },
});
