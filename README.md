# React Native Applications

## 📱 프로젝트 개요
React Native와 Expo를 사용하여 다양한 모바일 앱 기능들을 구현한 프로젝트입니다. 할일관리, 메모장, 날씨앱, 계산기 등 16개의 기본 앱과 게임, 애니메이션, 네이티브 기능들을 포함합니다.

## 🏗️ 프로젝트 구조

```
react-native-applications/
├── app/                          # Expo Router 기반 앱 구조
│   ├── (drawer)/                # Drawer 네비게이션
│   │   ├── _layout.tsx         # Drawer 레이아웃
│   │   ├── application/         # 메인 애플리케이션
│   │   │   ├── _layout.tsx     # 애플리케이션 레이아웃
│   │   │   ├── index.tsx       # 메인 애플리케이션 화면
│   │   │   ├── basic/          # 기본 앱들
│   │   │   │   ├── todo/       # 할일관리
│   │   │   │   ├── notes/      # 메모장
│   │   │   │   ├── weather/    # 날씨앱
│   │   │   │   ├── calculator/ # 계산기
│   │   │   │   ├── event-test/ # 이벤트테스트
│   │   │   │   ├── dialog-popup-notification/ # 대화상자-팝업-알림
│   │   │   │   ├── list-view/  # 리스트뷰
│   │   │   │   ├── form/       # 폼예제
│   │   │   │   ├── action-sheet/ # 액션시트
│   │   │   │   ├── modal/      # 모달
│   │   │   │   ├── movies/     # 영화정보
│   │   │   │   ├── calendar/   # 캘린더
│   │   │   │   ├── step-counter/ # 스텝카운터
│   │   │   │   ├── gallery/    # 갤러리
│   │   │   │   ├── shop/       # 쇼핑
│   │   │   │   └── quiz/       # 퀴즈
│   │   │   ├── game/           # 게임 앱들
│   │   │   │   ├── 2048/       # 2048 게임
│   │   │   │   ├── snake/      # 스네이크 게임
│   │   │   │   ├── tictactoe/  # 틱택토
│   │   │   │   ├── memory/     # 메모리 게임
│   │   │   │   └── ...         # 기타 게임들
│   │   │   ├── animation/      # 애니메이션 앱들
│   │   │   │   ├── mind-flow/  # 마인드플로우
│   │   │   │   ├── travel-dreams/ # 여행의꿈
│   │   │   │   ├── cook-explorer/ # 요리탐험가
│   │   │   │   ├── money-journey/ # 돈의여정
│   │   │   │   └── quiz-hero/  # 퀴즈히어로
│   │   │   └── native/         # 네이티브 기능 앱들
│   │   │       ├── media-notes/ # 미디어노트
│   │   │       ├── mini-file-explorer/ # 미니파일탐색기
│   │   │       ├── mini-health-tracker/ # 미니건강추적기
│   │   │       ├── secure-notes/ # 보안노트
│   │   │       ├── sensor-playground/ # 센서놀이터
│   │   │       ├── simple-shop/ # 심플상점
│   │   │       ├── trip-logger/ # 여행로거
│   │   │       └── utility-kit/ # 유틸리티키트
│   │   └── (tabs)/             # 탭 네비게이션
│   ├── _layout.tsx             # 루트 레이아웃
│   └── index.tsx               # 메인 인덱스
├── components/                  # 재사용 가능한 컴포넌트들
│   ├── atom/                   # 기본 원자 컴포넌트
│   │   └── TextBox.tsx         # 텍스트 박스
│   ├── form/                   # 폼 관련 컴포넌트
│   │   ├── Button.tsx          # 버튼
│   │   ├── Checkbox.tsx        # 체크박스
│   │   ├── DatePicker.tsx      # 날짜 선택기
│   │   ├── Input.tsx           # 입력 필드
│   │   ├── RadioButton.tsx     # 라디오 버튼
│   │   ├── Select.tsx          # 선택 박스
│   │   ├── Switch.tsx          # 스위치
│   │   ├── TextArea.tsx        # 텍스트 영역
│   │   ├── TimePicker.tsx      # 시간 선택기
│   │   ├── Toggle.tsx          # 토글
│   │   └── index.ts            # 폼 컴포넌트 내보내기
│   ├── movie/                  # 영화 관련 컴포넌트
│   │   ├── CategorySelector.tsx # 카테고리 선택기
│   │   ├── MovieCard.tsx       # 영화 카드
│   │   ├── MovieDetailModal.tsx # 영화 상세 모달
│   │   └── index.ts            # 영화 컴포넌트 내보내기
│   ├── ThemedView.tsx          # 테마가 적용된 뷰
│   └── ui/                     # UI 컴포넌트
│       ├── ActionSheet.tsx     # 액션 시트
│       ├── Modal.tsx           # 모달
│       └── index.ts            # UI 컴포넌트 내보내기
├── constants/                   # 상수 정의
│   ├── Colors.ts               # 색상 상수
│   ├── endpoint.ts             # API 엔드포인트
│   ├── fonts.ts                # 폰트 상수
│   └── index.ts                # 상수 내보내기
├── hooks/                       # 커스텀 훅
│   ├── api/                    # API 관련 훅
│   │   ├── example.ts          # 예제 API 훅
│   │   └── movieApi.ts         # 영화 API 훅
│   ├── useColorScheme.ts       # 색상 스키마 훅
│   ├── useColorScheme.web.ts   # 웹용 색상 스키마 훅
│   ├── useDebounce.ts          # 디바운스 훅
│   ├── useFavorites.ts         # 즐겨찾기 훅
│   └── useLocalStorage.ts      # 로컬 스토리지 훅
├── stores/                      # 상태 관리
│   ├── react-query/            # React Query 설정
│   │   └── queryClient.ts      # 쿼리 클라이언트
│   └── redux/                  # Redux 설정
│       ├── exampleSlice.ts     # 예제 슬라이스
│       └── index.ts            # Redux 스토어
├── types/                       # TypeScript 타입 정의
│   ├── form.ts                 # 폼 관련 타입
│   ├── movie.ts                # 영화 관련 타입
│   └── navigation.ts           # 네비게이션 타입
├── api/                         # API 설정
│   └── config.ts               # API 설정
├── assets/                      # 정적 자산
│   ├── fonts/                  # 폰트 파일들
│   │   ├── BMJUA.ttf           # BMJUA 폰트
│   │   ├── Pretendard-Black.ttf # Pretendard Black
│   │   ├── Pretendard-Bold.ttf # Pretendard Bold
│   │   ├── Pretendard-ExtraBold.ttf # Pretendard ExtraBold
│   │   ├── Pretendard-ExtraLight.ttf # Pretendard ExtraLight
│   │   ├── Pretendard-Light.ttf # Pretendard Light
│   │   ├── Pretendard-Medium.ttf # Pretendard Medium
│   │   ├── Pretendard-Regular.ttf # Pretendard Regular
│   │   ├── Pretendard-SemiBold.ttf # Pretendard SemiBold
│   │   └── Pretendard-Thin.ttf # Pretendard Thin
│   └── images/                  # 이미지 파일들
│       ├── adaptive-icon.png    # 적응형 아이콘
│       ├── favicon.png          # 파비콘
│       ├── icon.png             # 앱 아이콘
│       ├── splash.png           # 스플래시 화면
│       └── splash-dark.png      # 다크 모드 스플래시
├── __tests__/                   # 테스트 파일들
│   ├── components/              # 컴포넌트 테스트
│   │   └── movie/              # 영화 컴포넌트 테스트
│   ├── hooks/                   # 훅 테스트
│   │   ├── api/                 # API 훅 테스트
│   │   ├── useDebounce.simple.test.ts # 디바운스 훅 테스트
│   │   └── useFavorites.test.ts # 즐겨찾기 훅 테스트
│   ├── imageUrl.test.ts         # 이미지 URL 테스트
│   ├── simple.test.ts           # 간단한 테스트
│   └── testData.helper.ts       # 테스트 데이터 헬퍼
├── package.json                 # 프로젝트 의존성
├── app.json                     # Expo 앱 설정
├── babel.config.js              # Babel 설정
├── tsconfig.json                # TypeScript 설정
├── jest.config.js               # Jest 테스트 설정
├── jest.setup.js                # Jest 설정
└── eslint.config.js             # ESLint 설정
```

## ⚙️ 프로젝트 설정

### 📦 주요 의존성
- **React Native**: 0.73.0
- **Expo**: 50.0.0
- **React**: 18.2.0
- **TypeScript**: 5.1.3
- **Expo Router**: 3.4.0 (파일 기반 라우팅)
- **React Query**: 5.0.0 (서버 상태 관리)
- **Redux Toolkit**: 2.0.0 (클라이언트 상태 관리)

### 🚀 개발 환경 설정
```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm start

# iOS 시뮬레이터 실행
npm run ios

# Android 에뮬레이터 실행
npm run android

# 웹 브라우저 실행
npm run web
```

## 🎨 UI 개발 환경

### 🎯 컴포넌트 구조

#### 1. **Atom 컴포넌트** (기본 원자 컴포넌트)
- `TextBox`: 기본 텍스트 표시 컴포넌트
- 재사용 가능한 최소 단위 컴포넌트

#### 2. **Form 컴포넌트** (폼 요소들)
- `Button`: 다양한 스타일의 버튼
- `Input`: 텍스트 입력 필드
- `Checkbox`: 체크박스
- `RadioButton`: 라디오 버튼
- `Select`: 드롭다운 선택
- `Switch`: 토글 스위치
- `DatePicker`: 날짜 선택기
- `TimePicker`: 시간 선택기
- `TextArea`: 다중 줄 텍스트 입력

#### 3. **Movie 컴포넌트** (영화 관련)
- `CategorySelector`: 영화 카테고리 선택
- `MovieCard`: 영화 정보 카드
- `MovieDetailModal`: 영화 상세 정보 모달

#### 4. **UI 컴포넌트** (고급 UI 요소)
- `ActionSheet`: 액션 시트
- `Modal`: 모달 다이얼로그
- `ThemedView`: 테마가 적용된 뷰

### 🌈 색상 시스템

#### 색상 상수 (`constants/Colors.ts`)
```typescript
export const Colors = {
  // 기본 색상
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  
  // 그레이 스케일
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // 배경 색상
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  
  // 텍스트 색상
  text: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  
  // 테두리 색상
  border: '#E5E7EB',
  borderSecondary: '#F3F4F6',
}
```

#### 다크 모드 지원
- `useColorScheme` 훅을 사용한 자동 테마 전환
- 시스템 설정에 따른 자동 색상 변경

### 🔤 폰트 시스템

#### 폰트 상수 (`constants/fonts.ts`)
```typescript
export const Fonts = {
  // 한글 폰트
  korean: {
    regular: 'BMJUA',
    bold: 'BMJUA',
  },
  
  // 영문 폰트
  english: {
    thin: 'Pretendard-Thin',
    extraLight: 'Pretendard-ExtraLight',
    light: 'Pretendard-Light',
    regular: 'Pretendard-Regular',
    medium: 'Pretendard-Medium',
    semiBold: 'Pretendard-SemiBold',
    bold: 'Pretendard-Bold',
    extraBold: 'Pretendard-ExtraBold',
    black: 'Pretendard-Black',
  },
  
  // 폰트 크기
  size: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  
  // 폰트 두께
  weight: {
    thin: '100',
    extraLight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
    black: '900',
  },
}
```

### 🎭 테마 시스템

#### ThemedView 컴포넌트
- 자동 다크/라이트 모드 전환
- 일관된 색상과 스타일 적용
- 접근성 고려한 대비 설정

#### 테마 적용 예시
```typescript
import { ThemedView } from '../components/ThemedView';

export default function MyScreen() {
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>제목</Text>
    </ThemedView>
  );
}
```

## 🧪 테스트 환경

### Jest 설정
- 컴포넌트 단위 테스트
- 훅 테스트
- API 모킹 테스트
- 스냅샷 테스트

### 테스트 실행
```bash
npm test
npm run test:watch
npm run test:coverage
```

## 📱 네비게이션 구조

### Expo Router 기반
- 파일 기반 라우팅
- 중첩 네비게이션 지원
- Drawer + Tab 네비게이션 조합

### 네비게이션 구조
1. **Drawer 네비게이션**: 메인 메뉴
2. **Tab 네비게이션**: 하단 탭
3. **Stack 네비게이션**: 화면 간 이동

## 🔧 개발 도구

### 코드 품질
- **ESLint**: 코드 스타일 및 품질 검사
- **Prettier**: 코드 포맷팅
- **TypeScript**: 정적 타입 검사

### 빌드 도구
- **Expo**: 크로스 플랫폼 개발 환경
- **Babel**: JavaScript 컴파일러
- **Metro**: React Native 번들러

## 🚀 배포

### Expo EAS Build
```bash
# 프로덕션 빌드
eas build --platform all

# 개발 빌드
eas build --profile development --platform all
```

### 앱 스토어 배포
- iOS: App Store Connect
- Android: Google Play Console

## 📚 추가 리소스

- [Expo 공식 문서](https://docs.expo.dev/)
- [React Native 공식 문서](https://reactnative.dev/)
- [Expo Router 문서](https://expo.github.io/router/)
- [React Query 문서](https://tanstack.com/query/latest)

## 🤝 기여 방법

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
