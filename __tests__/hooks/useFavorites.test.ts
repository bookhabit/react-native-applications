import { useFavorites } from "@/hooks/useFavorites";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { act, renderHook, waitFor } from "@testing-library/react-native";
import { mockMovie, mockMovie2 } from "../testData";

// AsyncStorage Mock
const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe("useFavorites 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAsyncStorage.clear();
  });

  afterEach(() => {
    mockAsyncStorage.clear();
  });

  it("초기 상태에서 빈 즐겨찾기 목록을 반환", async () => {
    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.favorites).toEqual([]);
      expect(result.current.loading).toBe(false);
    });
  });

  it("즐겨찾기에 영화를 추가", async () => {
    const { result } = renderHook(() => useFavorites());

    await act(async () => {
      result.current.addToFavorites(mockMovie);
    });

    await waitFor(() => {
      expect(result.current.favorites).toHaveLength(1);
      expect(result.current.favorites).toContain(mockMovie);
    });
  });

  it("즐겨찾기에서 영화를 제거", async () => {
    const { result } = renderHook(() => useFavorites());

    // 먼저 영화 추가
    await act(async () => {
      result.current.addToFavorites(mockMovie);
    });

    await waitFor(() => {
      expect(result.current.favorites).toHaveLength(1);
    });

    // 영화 제거
    await act(async () => {
      result.current.removeFromFavorites(mockMovie.id);
    });

    await waitFor(() => {
      expect(result.current.favorites).toHaveLength(0);
    });
  });

  it("즐겨찾기 상태 확인", async () => {
    const { result } = renderHook(() => useFavorites());

    // 초기 상태
    expect(result.current.isFavorite(mockMovie.id)).toBe(false);

    // 영화 추가
    await act(async () => {
      result.current.addToFavorites(mockMovie);
    });

    await waitFor(() => {
      expect(result.current.isFavorite(mockMovie.id)).toBe(true);
    });
  });

  it("즐겨찾기 토글 기능", async () => {
    const { result } = renderHook(() => useFavorites());

    // 토글하여 추가
    await act(async () => {
      result.current.toggleFavorite(mockMovie);
    });

    await waitFor(() => {
      expect(result.current.isFavorite(mockMovie.id)).toBe(true);
    });

    // 토글하여 제거
    await act(async () => {
      result.current.toggleFavorite(mockMovie);
    });

    await waitFor(() => {
      expect(result.current.isFavorite(mockMovie.id)).toBe(false);
    });
  });

  it("여러 영화를 즐겨찾기에 추가", async () => {
    const { result } = renderHook(() => useFavorites());

    // 첫 번째 영화 추가
    await act(async () => {
      result.current.addToFavorites(mockMovie);
    });

    await waitFor(() => {
      expect(result.current.favorites).toHaveLength(1);
    });

    // 두 번째 영화 추가
    await act(async () => {
      result.current.addToFavorites(mockMovie2);
    });

    await waitFor(() => {
      expect(result.current.favorites).toHaveLength(2);
      expect(result.current.favorites).toContain(mockMovie);
      expect(result.current.favorites).toContain(mockMovie2);
    });
  });

  it("모든 즐겨찾기 초기화", async () => {
    const { result } = renderHook(() => useFavorites());

    // 영화들 추가
    await act(async () => {
      result.current.addToFavorites(mockMovie);
    });

    await waitFor(() => {
      expect(result.current.favorites).toHaveLength(1);
    });

    await act(async () => {
      result.current.addToFavorites(mockMovie2);
    });

    await waitFor(() => {
      expect(result.current.favorites).toHaveLength(2);
    });

    // 모든 즐겨찾기 초기화
    await act(async () => {
      result.current.clearFavorites();
    });

    await waitFor(() => {
      expect(result.current.favorites).toHaveLength(0);
    });
  });

  it("AsyncStorage에 즐겨찾기 데이터 저장", async () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addToFavorites(mockMovie);
    });

    await waitFor(() => {
      expect(result.current.favorites).toContain(mockMovie);
    });

    // AsyncStorage에 저장되었는지 확인
    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
      "@movie_favorites",
      JSON.stringify([mockMovie])
    );
  });

  it("AsyncStorage에서 즐겨찾기 데이터 로드", async () => {
    // AsyncStorage에 기존 데이터 설정
    const existingFavorites = [mockMovie, mockMovie2];
    mockAsyncStorage.getItem.mockResolvedValueOnce(
      JSON.stringify(existingFavorites)
    );

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.favorites).toEqual(existingFavorites);
    });
  });

  it("AsyncStorage가 비어있을 때 빈 배열 반환", async () => {
    mockAsyncStorage.getItem.mockResolvedValueOnce(null);

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.favorites).toEqual([]);
    });
  });

  it("AsyncStorage 에러 처리", async () => {
    mockAsyncStorage.getItem.mockRejectedValueOnce(new Error("Storage error"));

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.favorites).toEqual([]);
    });
  });
});
