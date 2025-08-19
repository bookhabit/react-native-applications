import { useDebounce } from "@/hooks/useDebounce";
import { renderHook } from "@testing-library/react-native";

describe("useDebounce 훅 간단 테스트", () => {
  it("초기값을 올바르게 반환", () => {
    const { result } = renderHook(() => useDebounce("초기값", 500));
    expect(result.current).toBe("초기값");
  });

  it("문자열 값 처리", () => {
    const { result } = renderHook(() => useDebounce("테스트", 100));
    expect(result.current).toBe("테스트");
  });

  it("숫자 값 처리", () => {
    const { result } = renderHook(() => useDebounce(42, 100));
    expect(result.current).toBe(42);
  });
});
