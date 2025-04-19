# The Clock

이 프로젝트는 React, TypeScript, 그리고 Tailwind CSS를 사용하여 만든 모던한 웹 시계 애플리케이션입니다.

## 주요 기능

- **아날로그/디지털 시계 전환**: 두 가지 시계 모드를 쉽게 전환할 수 있습니다.
- **다크 모드/라이트 모드**: 사용자 환경에 맞게 테마를 변경할 수 있습니다.
- **실시간 시간 표시**: 현재 시간을 정확하게 보여줍니다.
- **위치 및 날씨 정보**: 현재 위치와 날씨 상태를 표시합니다.
- **반응형 디자인**: 모든 디바이스 화면 크기에 맞게 조정됩니다.

## 기술 스택

- **React 19**: 최신 React 기능을 활용한 UI 구축
- **TypeScript**: 타입 안정성을 갖춘 코드 작성
- **Tailwind CSS**: 모던하고 반응형인 UI 스타일링
- **Vite**: 빠른 개발 서버 및 빌드 도구
- **date-fns**: 날짜 및 시간 형식화 라이브러리
- **Lucide React**: 아이콘 컴포넌트 라이브러리

## 설치 방법

이 프로젝트를 로컬 환경에서 실행하기 위한 방법입니다:

```bash
# 저장소 클론
git clone https://github.com/yourusername/the-clock.git
cd the-clock

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버는 기본적으로 `http://localhost:5173`에서 실행됩니다.

## 빌드 방법

프로덕션용 빌드를 생성하려면:

```bash
npm run build
```

빌드된 파일은 `dist` 디렉토리에 생성됩니다.

## 프로젝트 구조

```
the-clock/
├── public/              # 정적 파일
│   └── clock-icon.svg   # 파비콘
├── src/                 # 소스 코드
│   ├── components/      # 리액트 컴포넌트
│   │   ├── clock/       # 시계 관련 컴포넌트  
│   │   └── weather/     # 날씨 관련 컴포넌트
│   ├── hooks/           # 커스텀 React 훅
│   ├── types/           # TypeScript 타입 정의
│   ├── App.tsx          # 메인 앱 컴포넌트
│   ├── main.tsx         # 앱 진입점
│   └── index.css        # 전역 스타일
├── index.html           # HTML 템플릿
├── package.json         # 의존성 및 스크립트
├── tailwind.config.js   # Tailwind 설정
├── tsconfig.json        # TypeScript 설정
└── vite.config.ts       # Vite 설정
```

## 앞으로의 개선 사항

- 여러 타임존 지원
- 알람 기능 추가
- 사용자 정의 테마
- 오프라인 모드 지원

## 기여하기

이슈와 풀 리퀘스트를 통해 기여를 환영합니다. 큰 변경 사항의 경우 먼저 이슈를 생성하여 논의해주세요.

## 라이센스

MIT 라이센스에 따라 배포됩니다. 자세한 내용은 LICENSE 파일을 참조하세요.

## 연락처

문의사항이나 피드백이 있으면 [nhw3990@gmail.com](mailto:nhw3990@gmail.com)로 연락주세요.

---

이 프로젝트는 [Vite](https://vitejs.dev/)와 [Tailwind CSS](https://tailwindcss.com/)를 사용하여 구축되었습니다.
