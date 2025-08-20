import { TextBox } from "@/components/atom/TextBox";
import { Button } from "@/components/form";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

interface WeatherData {
  location: string;
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    description: string;
    icon: string;
  };
  forecast: Array<{
    date: string;
    temp_min: number;
    temp_max: number;
    description: string;
    icon: string;
  }>;
}

export default function WeatherScreen() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchCity, setSearchCity] = useState("");
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    // 먼저 현재 권한 상태 확인
    const { status: currentStatus } = await Location.getForegroundPermissionsAsync();
    
    if (currentStatus === "granted") {
      setLocationPermission(true);
      return;
    }
    
    // 권한이 없으면 사용자에게 설명
    Alert.alert(
      "위치 권한 필요",
      "현재 위치의 날씨 정보를 가져오기 위해 위치 권한이 필요합니다.\n\n'허용'을 선택하면 현재 위치를 기반으로 정확한 날씨 정보를 제공할 수 있습니다.",
      [
        {
          text: "거부",
          style: "cancel",
          onPress: () => setLocationPermission(false),
        },
        {
          text: "허용",
          onPress: async () => {
            try {
              const { status } = await Location.requestForegroundPermissionsAsync();
              setLocationPermission(status === "granted");
              
              if (status === "granted") {
                Alert.alert(
                  "권한 허용됨",
                  "위치 권한이 허용되었습니다. 이제 '현재 위치 날씨' 버튼을 눌러 현재 위치의 날씨 정보를 확인할 수 있습니다.",
                  [{ text: "확인" }]
                );
              } else {
                Alert.alert(
                  "권한 거부됨",
                  "위치 권한이 거부되었습니다. 설정에서 수동으로 권한을 허용하거나, 도시명을 직접 검색하여 날씨 정보를 확인할 수 있습니다.",
                  [{ text: "확인" }]
                );
              }
            } catch (error) {
              Alert.alert(
                "오류",
                "권한 요청 중 오류가 발생했습니다. 다시 시도해주세요.",
                [{ text: "확인" }]
              );
              setLocationPermission(false);
            }
          },
        },
      ]
    );
  };

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000,
        distanceInterval: 10,
      });
      await fetchWeatherByCoords(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      console.error("위치 가져오기 오류:", error);
      Alert.alert(
        "위치 정보 가져오기 실패",
        "현재 위치를 가져올 수 없습니다.\n\n가능한 원인:\n• GPS 신호가 약함\n• 실내에 있어 위치 확인이 어려움\n• 네트워크 연결 문제\n\n도시명을 직접 검색하여 날씨 정보를 확인해보세요.",
        [{ text: "확인" }]
      );
    } finally {
      setLoading(false);
    }
  };

  const searchWeather = () => {
    if (searchCity.trim()) {
      fetchWeatherByCity(searchCity.trim());
    }
  };

  const fetchWeatherByCity = async (city: string) => {
    try {
      setLoading(true);
      // 실제 API 호출 대신 모의 데이터 사용
      const mockWeatherData: WeatherData = {
        location: city,
        current: {
          temp: Math.floor(Math.random() * 30) + 5,
          feels_like: Math.floor(Math.random() * 30) + 5,
          humidity: Math.floor(Math.random() * 40) + 40,
          wind_speed: Math.floor(Math.random() * 20) + 5,
          description: getRandomWeatherDescription(),
          icon: getRandomWeatherIcon(),
        },
        forecast: generateForecast(),
      };
      
      setWeatherData(mockWeatherData);
    } catch (error) {
      Alert.alert("오류", "날씨 정보를 가져올 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      // 실제 API 호출 대신 모의 데이터 사용
      const mockWeatherData: WeatherData = {
        location: "현재 위치",
        current: {
          temp: Math.floor(Math.random() * 30) + 5,
          feels_like: Math.floor(Math.random() * 30) + 5,
          humidity: Math.floor(Math.random() * 40) + 40,
          wind_speed: Math.floor(Math.random() * 20) + 5,
          description: getRandomWeatherDescription(),
          icon: getRandomWeatherIcon(),
        },
        forecast: generateForecast(),
      };
      
      setWeatherData(mockWeatherData);
    } catch (error) {
      Alert.alert("오류", "날씨 정보를 가져올 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  const getRandomWeatherDescription = () => {
    const descriptions = [
      "맑음", "구름 많음", "흐림", "비", "눈", "안개", "천둥번개"
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };

  const getRandomWeatherIcon = () => {
    const icons = [
      "sunny", "partly-sunny", "cloudy", "rainy", "snow", "thunderstorm"
    ];
    return icons[Math.floor(Math.random() * icons.length)];
  };

  const generateForecast = () => {
    const forecast = [];
    for (let i = 1; i <= 7; i++) {
      forecast.push({
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
        temp_min: Math.floor(Math.random() * 20) + 0,
        temp_max: Math.floor(Math.random() * 20) + 15,
        description: getRandomWeatherDescription(),
        icon: getRandomWeatherIcon(),
      });
    }
    return forecast;
  };

  const getWeatherIcon = (iconName: string) => {
    const iconMap: { [key: string]: string } = {
      sunny: "sunny",
      "partly-sunny": "partly-sunny",
      cloudy: "cloudy",
      rainy: "rainy",
      snow: "snow",
      thunderstorm: "thunderstorm",
    };
    return iconMap[iconName] || "partly-sunny";
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TextBox type="title1" style={styles.title}>
          날씨 정보
        </TextBox>
        <TextBox type="body1" style={styles.description}>
          현재 위치의 날씨 정보를 확인하는 앱입니다.
        </TextBox>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          value={searchCity}
          onChangeText={setSearchCity}
          placeholder="도시명을 입력하세요..."
          style={styles.searchInput}
          onSubmitEditing={searchWeather}
        />
        <Button
          title="검색"
          onPress={searchWeather}
          style={styles.searchButton}
          disabled={!searchCity.trim()}
        />
      </View>

      <View style={styles.locationButtonContainer}>
        <Button
          title="현재 위치 날씨"
          onPress={getCurrentLocation}
          style={styles.locationButton}
          disabled={!locationPermission}
        />
        {locationPermission === false && (
          <View style={styles.permissionContainer}>
            <Text style={styles.permissionText}>
              위치 권한이 필요합니다
            </Text>
            <Text style={styles.permissionSubText}>
              현재 위치의 날씨 정보를 확인하려면 위치 권한을 허용해주세요
            </Text>
            <TouchableOpacity
              style={styles.retryPermissionButton}
              onPress={checkLocationPermission}
            >
              <Text style={styles.retryPermissionButtonText}>권한 다시 요청</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.tint} />
          <Text style={styles.loadingText}>날씨 정보를 가져오는 중...</Text>
        </View>
      )}

      {weatherData && !loading && (
        <ScrollView style={styles.weatherContainer} showsVerticalScrollIndicator={false}>
          {/* 현재 날씨 */}
          <View style={styles.currentWeather}>
            <Text style={styles.locationText}>{weatherData.location}</Text>
            <View style={styles.currentWeatherMain}>
              <Ionicons
                name={getWeatherIcon(weatherData.current.icon) as any}
                size={80}
                color={Colors.light.tint}
              />
              <View style={styles.currentWeatherInfo}>
                <Text style={styles.temperatureText}>
                  {weatherData.current.temp}°C
                </Text>
                <Text style={styles.descriptionText}>
                  {weatherData.current.description}
                </Text>
                <Text style={styles.feelsLikeText}>
                  체감온도 {weatherData.current.feels_like}°C
                </Text>
              </View>
            </View>
            <View style={styles.weatherDetails}>
              <View style={styles.weatherDetail}>
                <Ionicons name="water-outline" size={20} color={Colors.light.tint} />
                <Text style={styles.detailText}>습도 {weatherData.current.humidity}%</Text>
              </View>
              <View style={styles.weatherDetail}>
                <Ionicons name="wine-outline" size={20} color={Colors.light.tint} />
                <Text style={styles.detailText}>풍속 {weatherData.current.wind_speed}m/s</Text>
              </View>
            </View>
          </View>

          {/* 일주일 예보 */}
          <View style={styles.forecastContainer}>
            <Text style={styles.forecastTitle}>7일 예보</Text>
            {weatherData.forecast.map((day, index) => (
              <View key={index} style={styles.forecastDay}>
                <Text style={styles.forecastDate}>{day.date}</Text>
                <Ionicons
                  name={getWeatherIcon(day.icon) as any}
                  size={30}
                  color={Colors.light.tint}
                />
                <Text style={styles.forecastDescription}>{day.description}</Text>
                <View style={styles.forecastTemp}>
                  <Text style={styles.forecastTempMax}>{day.temp_max}°</Text>
                  <Text style={styles.forecastTempMin}>{day.temp_min}°</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {!weatherData && !loading && (
        <View style={styles.emptyState}>
          <Ionicons name="partly-sunny" size={80} color={Colors.light.textSecondary} />
          <Text style={styles.emptyStateText}>
            도시명을 검색하거나 현재 위치 버튼을 눌러주세요
          </Text>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 20,
    alignItems: "center",
  },
  title: {
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 24,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
  },
  searchButton: {
    minWidth: 80,
  },
  locationButtonContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  locationButton: {
    backgroundColor: Colors.light.tint,
  },
  permissionText: {
    textAlign: "center",
    color: Colors.light.error,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  permissionSubText: {
    textAlign: "center",
    color: Colors.light.textSecondary,
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
  },
  permissionContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  retryPermissionButton: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryPermissionButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  weatherContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  currentWeather: {
    backgroundColor: Colors.light.background,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  locationText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 15,
    color: Colors.light.text,
  },
  currentWeatherMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  currentWeatherInfo: {
    alignItems: "center",
  },
  temperatureText: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 18,
    color: Colors.light.textSecondary,
    marginBottom: 5,
  },
  feelsLikeText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  weatherDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  weatherDetail: {
    alignItems: "center",
  },
  detailText: {
    marginTop: 5,
    fontSize: 14,
    color: Colors.light.text,
  },
  forecastContainer: {
    backgroundColor: Colors.light.background,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: Colors.light.text,
  },
  forecastDay: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.background,
  },
  forecastDate: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.light.text,
    minWidth: 60,
  },
  forecastDescription: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    flex: 1,
    textAlign: "center",
  },
  forecastTemp: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 80,
    justifyContent: "flex-end",
  },
  forecastTempMax: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginRight: 10,
  },
  forecastTempMin: {
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: "center",
    marginTop: 20,
    lineHeight: 24,
  },
});
