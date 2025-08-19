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
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  const formatBudget = (budget: number) => {
    if (budget === 0) return "정보 없음";
    return `$${(budget / 1000000).toFixed(1)}M`;
  };

  const formatRevenue = (revenue: number) => {
    if (revenue === 0) return "정보 없음";
    return `$${(revenue / 1000000).toFixed(1)}M`;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onToggleFavorite}
            style={styles.favoriteButton}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? Colors.fillHeart : Colors.heart}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* 배경 이미지 */}
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
              />
              <View style={styles.backdropOverlay} />
            </View>
          )}

          {/* 포스터와 기본 정보 */}
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
              />
            ) : (
              <View style={styles.posterPlaceholder}>
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
                    <TextBox
                      type="body3"
                      style={styles.metaText}
                      lightColor={Colors.white}
                    >
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
                    <TextBox
                      type="body3"
                      style={styles.metaText}
                      lightColor={Colors.white}
                    >
                      {formatRuntime(movie.runtime)}
                    </TextBox>
                  </View>
                )}

                {movie.vote_average > 0 && (
                  <View style={styles.metaItem}>
                    <Ionicons name="star" size={16} color={Colors.warning} />
                    <TextBox
                      type="body3"
                      style={styles.metaText}
                      lightColor={Colors.white}
                    >
                      {movie.vote_average.toFixed(1)}
                    </TextBox>
                  </View>
                )}
              </View>

              {movie.genres && movie.genres.length > 0 && (
                <View style={styles.genresContainer}>
                  {movie.genres.map((genre) => (
                    <View key={genre.id} style={styles.genreTag}>
                      <TextBox
                        type="body3"
                        style={styles.genreText}
                        lightColor={Colors.white}
                      >
                        {genre.name}
                      </TextBox>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* 줄거리 */}
          {movie.overview && (
            <View style={styles.section}>
              <TextBox type="title2" style={styles.sectionTitle}>
                줄거리
              </TextBox>
              <TextBox type="body2" style={styles.overview}>
                {movie.overview}
              </TextBox>
            </View>
          )}

          {/* 제작 정보 */}
          <View style={styles.section}>
            <TextBox type="title2" style={styles.sectionTitle}>
              제작 정보
            </TextBox>

            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <TextBox type="body3" style={styles.infoLabel}>
                  예산
                </TextBox>
                <TextBox type="body2" style={styles.infoValue}>
                  {formatBudget(movie.budget)}
                </TextBox>
              </View>

              <View style={styles.infoItem}>
                <TextBox type="body3" style={styles.infoLabel}>
                  수익
                </TextBox>
                <TextBox type="body2" style={styles.infoValue}>
                  {formatRevenue(movie.revenue)}
                </TextBox>
              </View>

              <View style={styles.infoItem}>
                <TextBox type="body3" style={styles.infoLabel}>
                  상태
                </TextBox>
                <TextBox type="body2" style={styles.infoValue}>
                  {movie.status}
                </TextBox>
              </View>

              <View style={styles.infoItem}>
                <TextBox type="body3" style={styles.infoLabel}>
                  언어
                </TextBox>
                <TextBox type="body2" style={styles.infoValue}>
                  {movie.original_language.toUpperCase()}
                </TextBox>
              </View>
            </View>
          </View>

          {/* 제작사 */}
          {movie.production_companies &&
            movie.production_companies.length > 0 && (
              <View style={styles.section}>
                <TextBox type="title2" style={styles.sectionTitle}>
                  제작사
                </TextBox>
                {movie.production_companies.map((company) => (
                  <TextBox
                    key={company.id}
                    type="body2"
                    style={styles.companyName}
                  >
                    • {company.name}
                  </TextBox>
                ))}
              </View>
            )}

          <View style={styles.bottomPadding} />
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
    paddingBottom: 10,
    zIndex: 10,
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
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
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  posterSection: {
    flexDirection: "row",
    padding: 20,
    paddingTop: 120,
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
  },
  title: {
    marginBottom: 8,
    lineHeight: 28,
  },
  tagline: {
    color: Colors.textSecondary,
    fontStyle: "italic",
    marginBottom: 16,
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
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  genreTag: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  genreText: {
    color: Colors.text,
    fontSize: 12,
  },
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: "600",
  },
  overview: {
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  infoItem: {
    minWidth: "45%",
  },
  infoLabel: {
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontWeight: "500",
  },
  companyName: {
    marginBottom: 4,
    color: Colors.textSecondary,
  },
  bottomPadding: {
    height: 40,
  },
});
