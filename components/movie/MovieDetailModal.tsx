import { TextBox } from "@/components/atom/TextBox";
import { Colors } from "@/constants/Colors";
import { getOptimizedImageUrl } from "@/hooks/api/movieApi";
import { MovieDetail } from "@/types/movie";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface MovieDetailModalProps {
  visible: boolean;
  movie: MovieDetail | null;
  isFavorite: boolean;
  onClose: () => void;
  onToggleFavorite: () => void;
}

const { width, height } = Dimensions.get("window");

// 간단한 blurhash (회색 그라데이션)
const blurhash = "L5H2EC=PM+yV0g-mq.wG9c010J}I";

export const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
  visible,
  movie,
  isFavorite,
  onClose,
  onToggleFavorite,
}) => {
  if (!movie) return null;

  const backdropUrl = getOptimizedImageUrl(movie.backdrop_path, "backdrop");
  const posterUrl = getOptimizedImageUrl(movie.poster_path, "poster");

  const formatRuntime = (minutes: number) => {
    if (minutes === 0) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  const formatCurrency = (amount: number) => {
    if (amount === 0) return "정보 없음";
    return `$${(amount / 1000000).toFixed(1)}M`;
  };

  const formatStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      Released: "개봉됨",
      "Post Production": "후반 제작",
      "In Production": "제작 중",
      "Pre Production": "전반 제작",
      Canceled: "취소됨",
    };
    return statusMap[status] || status;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
            testID="close-button"
          >
            <Ionicons name="close" size={24} color={Colors.white} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => onToggleFavorite()}
            activeOpacity={0.7}
            testID="favorite-button"
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? Colors.error : Colors.white}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          testID="modal-scroll"
        >
          {/* Background Image */}
          {backdropUrl && (
            <View style={styles.backdropContainer}>
              <Image
                source={{ uri: backdropUrl }}
                style={styles.backdrop}
                contentFit="cover"
                transition={300}
                cachePolicy="memory-disk"
                placeholder={blurhash}
                placeholderContentFit="cover"
                testID="backdrop-image"
              />
              <View style={styles.backdropOverlay} />
            </View>
          )}

          {/* Poster and Basic Info */}
          <View style={styles.posterSection}>
            {posterUrl ? (
              <Image
                source={{ uri: posterUrl }}
                style={styles.poster}
                contentFit="cover"
                transition={200}
                cachePolicy="memory-disk"
                placeholder={blurhash}
                placeholderContentFit="cover"
                testID="poster-image"
              />
            ) : (
              <View
                style={styles.posterPlaceholder}
                testID="poster-placeholder"
              >
                <Ionicons
                  name="film-outline"
                  size={60}
                  color={Colors.textSecondary}
                />
              </View>
            )}

            <View style={styles.basicInfo}>
              <TextBox
                type="title1"
                style={styles.title}
                lightColor={Colors.white}
              >
                {movie.title}
              </TextBox>

              {movie.tagline && (
                <TextBox
                  type="body2"
                  style={styles.tagline}
                  lightColor={Colors.white}
                >
                  "{movie.tagline}"
                </TextBox>
              )}

              <View style={styles.metaInfo}>
                {movie.release_date && (
                  <View style={styles.metaItem}>
                    <Ionicons
                      name="calendar-outline"
                      size={16}
                      color={Colors.white}
                    />
                    <TextBox type="body3" style={styles.metaText}>
                      {new Date(movie.release_date).getFullYear()}
                    </TextBox>
                  </View>
                )}

                {movie.runtime > 0 && (
                  <View style={styles.metaItem}>
                    <Ionicons
                      name="time-outline"
                      size={16}
                      color={Colors.white}
                    />
                    <TextBox type="body3" style={styles.metaText}>
                      {formatRuntime(movie.runtime)}
                    </TextBox>
                  </View>
                )}

                {movie.vote_average > 0 && (
                  <View style={styles.metaItem}>
                    <Ionicons name="star" size={16} color={Colors.warning} />
                    <TextBox type="body3" style={styles.metaText}>
                      {movie.vote_average.toFixed(1)}
                    </TextBox>
                  </View>
                )}
              </View>

              {movie.genres && movie.genres.length > 0 && (
                <View style={styles.genres}>
                  {movie.genres.map((genre) => (
                    <View key={genre.id} style={styles.genreTag}>
                      <TextBox type="caption1" style={styles.genreText}>
                        {genre.name}
                      </TextBox>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Overview */}
          {movie.overview && (
            <View style={styles.section}>
              <TextBox type="title3" style={styles.sectionTitle}>
                줄거리
              </TextBox>
              <TextBox type="body2" style={styles.overview}>
                {movie.overview}
              </TextBox>
            </View>
          )}

          {/* Production Info */}
          <View style={styles.section}>
            <TextBox type="title3" style={styles.sectionTitle}>
              제작 정보
            </TextBox>
            <View style={styles.productionInfo}>
              <View style={styles.productionItem}>
                <TextBox type="body3" style={styles.productionLabel}>
                  예산
                </TextBox>
                <TextBox type="body2" style={styles.productionValue}>
                  {formatCurrency(movie.budget)}
                </TextBox>
              </View>

              <View style={styles.productionItem}>
                <TextBox type="body3" style={styles.productionLabel}>
                  수익
                </TextBox>
                <TextBox type="body2" style={styles.productionValue}>
                  {formatCurrency(movie.revenue)}
                </TextBox>
              </View>

              <View style={styles.productionItem}>
                <TextBox type="body3" style={styles.productionLabel}>
                  상태
                </TextBox>
                <TextBox type="body2" style={styles.productionValue}>
                  {formatStatus(movie.status)}
                </TextBox>
              </View>

              <View style={styles.productionItem}>
                <TextBox type="body3" style={styles.productionLabel}>
                  언어
                </TextBox>
                <TextBox type="body2" style={styles.productionValue}>
                  {movie.original_language.toUpperCase()}
                </TextBox>
              </View>
            </View>
          </View>

          {/* Production Companies */}
          {movie.production_companies &&
            movie.production_companies.length > 0 && (
              <View style={styles.section}>
                <TextBox type="title3" style={styles.sectionTitle}>
                  제작사
                </TextBox>
                <View style={styles.companies}>
                  {movie.production_companies.map((company) => (
                    <TextBox
                      key={company.id}
                      type="body2"
                      style={styles.company}
                    >
                      • {company.name}
                    </TextBox>
                  ))}
                </View>
              </View>
            )}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    zIndex: 1,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  backdropContainer: {
    position: "relative",
    height: 300,
  },
  backdrop: {
    width: "100%",
    height: "100%",
  },
  backdropOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  posterSection: {
    flexDirection: "row",
    padding: 20,
    marginTop: -60,
    zIndex: 2,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 12,
    marginRight: 20,
  },
  posterPlaceholder: {
    width: 120,
    height: 180,
    borderRadius: 12,
    marginRight: 20,
    backgroundColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  basicInfo: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    marginBottom: 8,
    color: Colors.white,
  },
  tagline: {
    marginBottom: 16,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
  metaInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    color: Colors.textSecondary,
  },
  genres: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  genreTag: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  genreText: {
    color: Colors.white,
    fontSize: 12,
  },
  section: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: "600",
  },
  overview: {
    lineHeight: 24,
    color: Colors.textSecondary,
  },
  productionInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  productionItem: {
    minWidth: "45%",
  },
  productionLabel: {
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  productionValue: {
    fontWeight: "500",
  },
  companies: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  company: {
    color: Colors.textSecondary,
  },
});
