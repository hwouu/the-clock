# The Clock - 모던한 웹 시계 애플리케이션

이 프로젝트는 React, TypeScript, 그리고 Tailwind CSS를 사용하여 만든 모던한 웹 시계 애플리케이션입니다. 다양한 기능과 반응형 디자인을 갖추고 있으며, 지속적으로 업데이트되고 있습니다.

![The Clock Preview](https://github.com/user-attachments/assets/008bfc23-87f0-4b8b-bfc7-db40c355851d)


🔗 [라이브 데모 보기](https://theclock.my/)

## PC 버전

<p align="center">
  <img src="https://github.com/user-attachments/assets/1d414d99-2594-4156-9557-57dc4ef61da8" width="48%" alt="The Clock PC 버전 - 다크 모드" />
  <img src="https://github.com/user-attachments/assets/ae400660-756c-48b5-a1ec-39cc500e376d" width="48%" alt="The Clock PC 버전 - 라이트 모드" />
</p>

## 모바일 버전

<p align="center">
  <img src="https://github.com/user-attachments/assets/f91ff685-ef13-4d92-803e-c7a96d575f2d" width="48%" alt="The Clock 모바일 버전 - 다크 모드" />
  <img src="https://github.com/user-attachments/assets/c3e8b5a9-d649-424c-a018-21b48e93da74" width="48%" alt="The Clock 모바일 버전 - 라이트 모드" />
</p>

## 주요 기능

- **아날로그/디지털 시계 전환**: 두 가지 시계 모드를 쉽게 전환할 수 있습니다.
- **다크 모드/라이트 모드**: 사용자 환경에 맞게 테마를 변경할 수 있습니다.
- **실시간 시간 표시**: 현재 시간을 정확하게 보여줍니다.
- **실시간 위치 및 날씨 정보**: OpenWeatherMap API를 사용하여 현재 위치와 날씨 상태를 표시합니다.
- **타이머 기능**: 편리한 타이머 기능으로 시간을 관리할 수 있습니다.
- **메모 기능**: 간단한 메모를 작성하고 관리할 수 있으며, 마크다운 문법을 지원합니다.
- **반응형 디자인**: 모든 디바이스 화면 크기에 맞게 최적화되어 있습니다.
- **설정 유지**: 사용자의 시계 모드 선호도를 로컬 스토리지에 저장합니다.
- **멀티 페이지 구조**: 라우팅을 통한 다양한 페이지 제공(홈, 소개 페이지 등).

## 최근 업데이트 내역

### 2025년 4월 21일

- 메모 리스트 마크다운 문법 지원
- 기능 제안 폼링크 추가
- 모달 디자인 개선
- SEO 최적화 개선

### 2025년 4월 20일

- 멀티 페이지 구조로 변경 및 라우팅 추가
- 소개 페이지 개선
- 헤더 컴포넌트 추가
- UI 디자인 현대화
- 타이머 및 메모 기능 개선

## 기술 스택

- **React 19**: 최신 React 기능을 활용한 UI 구축
- **TypeScript**: 타입 안정성을 갖춘 코드 작성
- **Tailwind CSS**: 모던하고 반응형인 UI 스타일링
- **Vite**: 빠른 개발 서버 및 빌드 도구
- **date-fns**: 날짜 및 시간 형식화 라이브러리
- **Lucide React**: 아이콘 컴포넌트 라이브러리
- **Zustand**: 간결하고 강력한 상태 관리 라이브러리
- **OpenWeatherMap API**: 실시간 날씨 데이터 제공
- **React Router Dom**: 페이지 라우팅 관리
- **React Markdown**: 마크다운 렌더링 지원

## 설치 방법

이 프로젝트를 로컬 환경에서 실행하기 위한 방법입니다:

```bash
# 저장소 클론
git clone https://github.com/hwouu/the-clock.git
cd the-clock

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일에 OpenWeatherMap API 키 추가
# VITE_OPENWEATHERMAP_API_KEY=your_api_key_here

# 개발 서버 실행
npm run dev
```

개발 서버는 기본적으로 `http://localhost:5173`에서 실행됩니다.

### OpenWeatherMap API 키 발급 방법

1. [OpenWeatherMap](https://openweathermap.org/) 웹사이트에 접속
2. 회원가입 및 로그인
3. 계정 메뉴에서 "My API Keys" 선택
4. 기본 생성된 키 사용 또는 새 키 생성
5. API 키를 복사하여 `.env` 파일에 붙여넣기

## 빌드 방법

프로덕션용 빌드를 생성하려면:

```bash
npm run build
```

빌드된 파일은 `dist` 디렉토리에 생성됩니다.

## 프로젝트 구조

```
the-clock/
├── public/               # 정적 파일
│   ├── clock-icon.svg    # 파비콘
│   ├── robots.txt        # 검색 엔진 크롤링 지침
│   └── sitemap.xml       # 사이트맵
├── src/                  # 소스 코드
│   ├── components/       # 리액트 컴포넌트
│   │   ├── clock/        # 시계 관련 컴포넌트
│   │   ├── header/       # 헤더 컴포넌트
│   │   ├── memo/         # 메모 관련 컴포넌트
│   │   ├── ui/           # UI 컴포넌트
│   │   └── weather/      # 날씨 관련 컴포넌트
│   ├── context/          # React Context
│   ├── hooks/            # 커스텀 React 훅
│   ├── pages/            # 페이지 컴포넌트
│   ├── services/         # API 서비스
│   │   └── weatherService.ts # 날씨 API 서비스
│   ├── store/            # 상태 관리 (Zustand)
│   ├── types/            # TypeScript 타입 정의
│   ├── utils/            # 유틸리티 함수
│   ├── App.tsx           # 메인 앱 컴포넌트
│   ├── main.tsx          # 앱 진입점
│   └── index.css         # 전역 스타일
├── .env.example          # 환경 변수 예제 파일
├── index.html            # HTML 템플릿
├── package.json          # 의존성 및 스크립트
├── tailwind.config.js    # Tailwind 설정
├── tsconfig.json         # TypeScript 설정
└── vite.config.ts        # Vite 설정
```

## 주요 기능 소개

### 1. 실시간 날씨 정보

OpenWeatherMap API를 사용하여 사용자의 현재 위치 기반 실시간 날씨 정보를 표시합니다. 사용자는 위치 정보 접근 권한을 허용해야 합니다.

### 2. 다크 모드 / 라이트 모드

시스템 설정에 맞춰 자동으로 테마가 적용되며, 사용자가 직접 전환할 수도 있습니다.

### 3. 타이머 기능

간편한 타이머 기능으로 시간을 설정하고 관리할 수 있습니다.

### 4. 메모 기능

간단한 메모를 작성하고 관리할 수 있으며, 마크다운 문법을 지원합니다.

### 5. 반응형 디자인

모바일, 태블릿, 데스크톱 등 다양한 화면 크기에 최적화된 UI를 제공합니다.

### 6. 사용자 설정 저장

사용자가 선택한 시계 모드(아날로그/디지털)를 로컬 스토리지에 저장하여 다음 방문 시에도 유지됩니다.

## 향후 계획

- 알람 기능 추가 (특정 시간 알림 기능)
- 세계 시간 표시 기능
- 사용자 커스터마이징 기능 확장
- 타이머 다중 관리 기능
- 달력 기능 통합

## 기여하기

이슈와 풀 리퀘스트를 통해 기여를 환영합니다. 큰 변경 사항의 경우 먼저 이슈를 생성하여 논의해주세요.

기능 제안은 [이 링크](https://hwouu.notion.site/1db7a2533c0f80d79ff6cccfbd32f9b0?pvs=105)를 통해 제출해주세요.

## 라이센스

MIT 라이센스에 따라 배포됩니다. 자세한 내용은 LICENSE 파일을 참조하세요.

## 연락처

문의사항이나 피드백이 있으면 [nhw3990@gmail.com](mailto:nhw3990@gmail.com)로 연락주세요.

---

이 프로젝트는 [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/)와 [OpenWeatherMap API](https://openweathermap.org/api)를 사용하여 구축되었습니다.
