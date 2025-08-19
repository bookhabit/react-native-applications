import { TextBox } from "@/components/atom/TextBox";
import { Colors } from "@/constants/Colors";
import { getOptimizedImageUrl } from "@/hooks/api/movieApi";
import { Movie } from "@/types/movie";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { memo } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

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

    const handleFavoritePress = (e: any) => {
      e.stopPropagation();
      onToggleFavorite?.(movie);
    };

    const formatRating = (rating: number) => {
      return rating.toFixed(1);
    };

    const formatYear = (dateString: string) => {
      return new Date(dateString).getFullYear();
    };

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => onPress(movie)}
        activeOpacity={0.8}
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
            />
          ) : (
            <View style={styles.placeholder}>
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
              onPress={handleFavoritePress}
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={20}
                color={isFavorite ? Colors.fillHeart : Colors.heart}
              />
            </TouchableOpacity>
          )}

          {movie.vote_average > 0 && (
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color={Colors.warning} />
              <TextBox
                type="body3"
                style={styles.rating}
                lightColor={Colors.white}
                darkColor={Colors.white}
              >
                {formatRating(movie.vote_average)}
              </TextBox>
            </View>
          )}
        </View>

        <View style={styles.infoContainer}>
          <TextBox type="body2" style={styles.title} numberOfLines={2}>
            {movie.title}
          </TextBox>

          {movie.release_date && (
            <TextBox type="body3" style={styles.year}>
              {formatYear(movie.release_date)}
            </TextBox>
          )}
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
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
  ratingContainer: {
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
  rating: {
    marginLeft: 2,
    fontSize: 10,
  },
  infoContainer: {
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
