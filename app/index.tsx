import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { AppInfo } from "@/types/navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AppCard = ({ title, description, route, icon, color }: AppInfo) => (
  <Link href={route as any} asChild>
    <TouchableOpacity style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <ThemedText style={styles.icon}>{icon}</ThemedText>
      </View>
      <View style={styles.cardContent}>
        <ThemedText type="subtitle" style={styles.cardTitle}>
          {title}
        </ThemedText>
      </View>
    </TouchableOpacity>
  </Link>
);

export default function AppSelector() {
  const colorScheme = useColorScheme();
  const { bottom } = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const tintColor = Colors[colorScheme ?? "light"].tint;

  // 카드 너비 계산 (화면 너비의 45%, 최소 150px)
  const paddingHorizontal = 16;
  const cardWidth = screenWidth / 2 - paddingHorizontal * 2;

  const apps: AppInfo[] = [
    {
      title: "To-Do 리스트",
      description: "할 일을 관리하고 완료 상태를 추적하세요",
      route: "/todo",
      icon: "📝",
      color: "#4CAF50",
    },
    {
      title: "날씨 정보",
      description: "현재 위치의 날씨 정보를 확인하세요",
      route: "/weather",
      icon: "🌤️",
      color: "#2196F3",
    },
    {
      title: "메모장",
      description: "제목과 내용을 포함한 메모를 작성하세요",
      route: "/notes",
      icon: "📓",
      color: "#FF9800",
    },
    {
      title: "채팅 앱",
      description: "실시간 1:1 채팅을 경험할 수 있는 앱입니다",
      route: "/chat",
      icon: "💬",
      color: "#9C27B0",
    },
    {
      title: "영화 검색",
      description: "영화를 검색하고 즐겨찾기에 추가하세요",
      route: "/movies",
      icon: "🎬",
      color: "#E91E63",
    },
    {
      title: "캘린더",
      description: "일정을 관리하고 달력으로 확인하세요",
      route: "/calendar",
      icon: "📅",
      color: "#607D8B",
    },
    {
      title: "이미지 갤러리",
      description: "이미지를 업로드하고 관리하세요",
      route: "/gallery",
      icon: "🖼️",
      color: "#795548",
    },
    {
      title: "쇼핑몰",
      description: "상품을 둘러보고 장바구니에 담아보세요",
      route: "/shop",
      icon: "🛒",
      color: "#FF5722",
    },
    {
      title: "퀴즈 앱",
      description: "재미있는 퀴즈를 풀어보세요",
      route: "/quiz",
      icon: "🧩",
      color: "#00BCD4",
    },
    {
      title: "만보기",
      description: "걸음 수를 측정하고 목표를 달성하세요",
      route: "/step-counter",
      icon: "👟",
      color: "#8BC34A",
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingTop: 24, paddingBottom: bottom + 24 }}
      >
        <View style={styles.header}>
          <ThemedText style={styles.subtitle}>
            React Native로 구현한 10가지 애플리케이션을 체험해보세요
          </ThemedText>
        </View>

        <View
          style={[
            styles.grid,
            { paddingHorizontal: paddingHorizontal, gap: 16 },
          ]}
        >
          {apps.map((app, index) => (
            <View
              key={index}
              style={[
                styles.cardWrapper,
                {
                  width: cardWidth,
                },
              ]}
            >
              <AppCard {...app} />
            </View>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.8,
    paddingHorizontal: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  cardWrapper: {
    // 카드 래퍼는 동적 너비를 가짐
    height: 140,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: 140,
    flex: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    fontSize: 24,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    marginBottom: 8,
    fontSize: 16,
  },
  cardDescription: {
    fontSize: 12,
    lineHeight: 16,
    opacity: 0.7,
  },
});
