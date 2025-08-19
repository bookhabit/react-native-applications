import { useDebounce } from "@/hooks/useDebounce";
import { act, renderHook } from "@testing-library/react-native";

describe("useDebounce 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  it("초기값을 올바르게 반환", () => {
    const { result } = renderHook(() => useDebounce("초기값", 500));
    expect(result.current).toBe("초기값");
  });

  it("값 변경 후 지정된 지연 시간만큼 대기", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "초기값", delay: 500 } }
    );

    expect(result.current).toBe("초기값");

    rerender({ value: "새로운값", delay: 500 });

    // 아직 지연 시간이 지나지 않았으므로 이전 값 유지
    expect(result.current).toBe("초기값");

    // 타이머를 500ms만큼 진행
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // 이제 새 값이 반환되어야 함
    expect(result.current).toBe("새로운값");
  });

  it("새로운 입력 시 이전 타이머 취소", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "초기값", delay: 500 } }
    );

    expect(result.current).toBe("초기값");

    // 첫 번째 값 변경
    rerender({ value: "첫번째값", delay: 500 });

    // 200ms 후 두 번째 값 변경
    act(() => {
      jest.advanceTimersByTime(200);
    });

    rerender({ value: "두번째값", delay: 500 });

    // 200ms 더 진행 (총 400ms)
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // 아직 첫 번째 타이머가 취소되고 두 번째 타이머가 진행 중이므로 첫 번째 값 유지
    expect(result.current).toBe("초기값");

    // 100ms 더 진행 (총 500ms)
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // 이제 두 번째 값이 반환되어야 함
    expect(result.current).toBe("두번째값");
  });

  it("다양한 지연 시간 설정", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "초기값", delay: 1000 } }
    );

    expect(result.current).toBe("초기값");

    rerender({ value: "새로운값", delay: 1000 });

    // 500ms 진행
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // 아직 지연 시간이 지나지 않았으므로 이전 값 유지
    expect(result.current).toBe("초기값");

    // 500ms 더 진행 (총 1000ms)
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // 이제 새 값이 반환되어야 함
    expect(result.current).toBe("새로운값");
  });

  it("빈 문자열 처리", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "초기값", delay: 300 } }
    );

    expect(result.current).toBe("초기값");

    rerender({ value: "", delay: 300 });

    // 300ms 진행
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe("");
  });

  it("숫자 값 처리", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 0, delay: 200 } }
    );

    expect(result.current).toBe(0);

    rerender({ value: 42, delay: 200 });

    // 200ms 진행
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe(42);
  });

  it("객체 값 처리", () => {
    const initialObj = { name: "초기" };
    const newObj = { name: "새로운" };

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: initialObj, delay: 400 } }
    );

    expect(result.current).toEqual(initialObj);

    rerender({ value: newObj, delay: 400 });

    // 400ms 진행
    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(result.current).toEqual(newObj);
  });

  it("0ms 지연 시간 처리", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "초기값", delay: 0 } }
    );

    expect(result.current).toBe("초기값");

    rerender({ value: "새로운값", delay: 0 });

    // 0ms 지연이므로 즉시 새 값 반환
    expect(result.current).toBe("새로운값");
  });

  it("음수 지연 시간 처리", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "초기값", delay: -100 } }
    );

    expect(result.current).toBe("초기값");

    rerender({ value: "새로운값", delay: -100 });

    // 음수 지연이므로 즉시 새 값 반환
    expect(result.current).toBe("새로운값");
  });
});
