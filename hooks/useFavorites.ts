import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie } from "@/types/movie";

const FAVORITES_KEY = "@movie_favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // 즐겨찾기 목록 불러오기
  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("즐겨찾기 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 즐겨찾기 추가
  const addToFavorites = async (movie: Movie) => {
    try {
      const newFavorites = [...favorites, movie];
      setFavorites(newFavorites);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error("즐겨찾기 추가 실패:", error);
    }
  };

  // 즐겨찾기 제거
  const removeFromFavorites = async (movieId: number) => {
    try {
      const newFavorites = favorites.filter(movie => movie.id !== movieId);
      setFavorites(newFavorites);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error("즐겨찾기 제거 실패:", error);
    }
  };

  // 즐겨찾기 여부 확인
  const isFavorite = (movieId: number) => {
    return favorites.some(movie => movie.id === movieId);
  };

  // 즐겨찾기 토글
  const toggleFavorite = async (movie: Movie) => {
    if (isFavorite(movie.id)) {
      await removeFromFavorites(movie.id);
    } else {
      await addToFavorites(movie);
    }
  };

  // 즐겨찾기 전체 삭제
  const clearFavorites = async () => {
    try {
      setFavorites([]);
      await AsyncStorage.removeItem(FAVORITES_KEY);
    } catch (error) {
      console.error("즐겨찾기 전체 삭제 실패:", error);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  };
};
