import { getOptimizedImageUrl } from "@/hooks/api/movieApi";

describe("이미지 URL 헬퍼 함수 테스트", () => {
  it("포스터 URL을 올바른 크기로 생성", () => {
    const posterUrl = getOptimizedImageUrl("/test-poster.jpg", "poster");
    expect(posterUrl).toContain("w500");
    expect(posterUrl).toContain("/test-poster.jpg");
  });

  it("배경 URL을 고해상도로 생성", () => {
    const backdropUrl = getOptimizedImageUrl("/test-backdrop.jpg", "backdrop");
    expect(backdropUrl).toContain("w1280");
    expect(backdropUrl).toContain("/test-backdrop.jpg");
  });

  it("썸네일 URL을 작은 크기로 생성", () => {
    const thumbnailUrl = getOptimizedImageUrl("/test-poster.jpg", "thumbnail");
    expect(thumbnailUrl).toContain("w200");
    expect(thumbnailUrl).toContain("/test-poster.jpg");
  });

  it("poster_path가 null일 때 null 반환", () => {
    const posterUrl = getOptimizedImageUrl(null, "poster");
    expect(posterUrl).toBeNull();
  });

  it("기본 타입은 poster로 설정", () => {
    const posterUrl = getOptimizedImageUrl("/test-poster.jpg");
    expect(posterUrl).toContain("w500");
  });
});
