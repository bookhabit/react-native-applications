import { TextBox } from "@/components/atom/TextBox";
import { Colors } from "@/constants/Colors";
import { getOptimizedImageUrl } from "@/hooks/api/movieApi";
import { Movie } from "@/types/movie";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { memo, useCallback } from "react";
import {
  Dimensions,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface MovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (movie: Movie) => void;
  showFavoriteButton?: boolean;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 60) / 2; // 2열 그리드, 좌우 패딩 20씩, 카드 간격 20

// 간단한 blurhash (회색 그라데이션)
const blurhash = "L5H2EC=PM+yV0g-mq.wG9c010J}I";

export const MovieCard: React.FC<MovieCardProps> = memo(
  ({
    movie,
    onPress,
    isFavorite = false,
    onToggleFavorite,
    showFavoriteButton = true,
  }) => {
    const posterUrl = getOptimizedImageUrl(movie.poster_path, "poster");

    const handleToggleFavorite = useCallback(
      (e: GestureResponderEvent) => {
        if (e && e.stopPropagation) {
          e.stopPropagation();
        }
        if (onToggleFavorite) {
          onToggleFavorite(movie);
        }
      },
      [onToggleFavorite, movie]
    );

    const handlePress = useCallback(() => {
      onPress(movie);
    }, [onPress, movie]);

    const formatRating = (rating: number) => {
      return rating.toFixed(1);
    };

    const formatYear = (dateString: string) => {
      return new Date(dateString).getFullYear();
    };

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={handlePress}
        activeOpacity={0.7}
        testID="movie-card"
      >
        <View style={styles.imageContainer}>
          {posterUrl ? (
            <Image
              source={{ uri: posterUrl }}
              style={styles.poster}
              contentFit="cover"
              transition={200}
              cachePolicy="memory-disk"
              placeholder={blurhash}
              placeholderContentFit="cover"
              testID="movie-poster"
            />
          ) : (
            <View style={styles.placeholder} testID="movie-poster-placeholder">
              <Ionicons
                name="film-outline"
                size={40}
                color={Colors.textSecondary}
              />
            </View>
          )}

          {showFavoriteButton && onToggleFavorite && (
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={handleToggleFavorite}
              activeOpacity={0.8}
              testID="favorite-button"
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={20}
                color={isFavorite ? Colors.error : Colors.textSecondary}
              />
            </TouchableOpacity>
          )}

          {movie.vote_average > 0 && (
            <View style={styles.rating} testID="movie-rating">
              <Ionicons name="star" size={12} color={Colors.warning} />
              <TextBox type="caption1" style={styles.ratingText}>
                {movie.vote_average.toFixed(1)}
              </TextBox>
            </View>
          )}
        </View>

        <View style={styles.info}>
          <TextBox type="body2" style={styles.title} numberOfLines={2}>
            {movie.title}
          </TextBox>
          {movie.release_date && (
            <TextBox type="caption1" style={styles.year}>
              {new Date(movie.release_date).getFullYear()}
            </TextBox>
          )}
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginBottom: 20,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 8,
  },
  poster: {
    width: "100%",
    height: CARD_WIDTH * 1.5,
    borderRadius: 12,
    backgroundColor: Colors.border,
  },
  placeholder: {
    width: "100%",
    height: CARD_WIDTH * 1.5,
    borderRadius: 12,
    backgroundColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  rating: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 2,
    fontSize: 10,
  },
  info: {
    paddingHorizontal: 4,
  },
  title: {
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 16,
  },
  year: {
    color: Colors.textSecondary,
  },
});
