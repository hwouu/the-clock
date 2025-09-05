# The Clock - Modern Web Clock Application

이 프로젝트는 React, TypeScript, 그리고 Tailwind CSS를 사용하여 만든 모던한 웹 시계 애플리케이션입니다. 다양한 기능과 반응형 디자인을 갖추고 있으며, 지속적으로 업데이트되고 있습니다.

![The Clock Preview](https://github.com/user-attachments/assets/82bdfaae-2f04-456f-96b4-7ab55ca1b4ed)

🔗 [라이브 데모 보기](https://theclock.my/)

## 주요 기능

- **아날로그/디지털 시계 전환**: 두 가지 시계 모드를 쉽게 전환할 수 있습니다.
- **다크 모드/라이트 모드**: 사용자 환경에 맞게 테마를 변경할 수 있습니다.
- **실시간 시간 표시**: 현재 시간을 정확하게 보여줍니다.
- **실시간 위치 및 날씨 정보**: OpenWeatherMap API를 사용하여 현재 위치와 날씨 상태를 표시합니다.
- **알람 기능**: 정시에 브라우저 알림과 사운드를 제공하는 알람 기능입니다.
- **타이머 기능**: 편리한 타이머 기능으로 시간을 관리할 수 있습니다.
- **메모 기능**: 간단한 메모를 작성하고 관리할 수 있으며, 마크다운 문법을 지원합니다.
- **반응형 디자인**: 모든 디바이스 화면 크기에 맞게 최적화되어 있습니다.
- **설정 유지**: 사용자의 시계 모드, 테마, 메모, 알람 등의 설정을 로컬 스토리지에 저장합니다.
- **고급 알림 시스템**: 단순 `alert`가 아닌 브라우저 푸시 알림, 사운드, 탭 깜빡임 효과를 제공합니다.

## 최근 업데이트 내역

### 2025년 9월 5일

- **알람 기능 추가**: 특정 시간에 알림을 받을 수 있는 알람 기능 추가.
- **알림 시스템 고도화**: 브라우저 푸시 알림, 사운드 재생, 탭 제목 변경 기능으로 알림 방식 개선.
- **UI/UX 개선**:
  - 헤더 레이아웃을 좌우로 분리하여 가독성 및 편의성 향상.
  - 알람/타이머/메모 등 플로팅 UI 위치를 재배치하여 겹침 문제 해결.
  - 아날로그 시계의 다크 모드 가독성 개선.
- **기능 개선**:
  - 알람이 정확한 정시에 울리도록 로직 수정 및 알람이 울린 후 자동 비활성화.
  - 페이지별 스크롤 제어 로직 수정.

### 2025년 4월 21일

- 메모 리스트 마크다운 문법 지원
- 기능 제안 폼링크 추가
- 모달 디자인 개선
- SEO 최적화 개선

## 기술 스택

- **React 19**: 최신 React 기능을 활용한 UI 구축
- **TypeScript**: 타입 안정성을 갖춘 코드 작성
- **Tailwind CSS**: 모던하고 반응형인 UI 스타일링
- **Vite**: 빠른 개발 서버 및 빌드 도구
- **Zustand**: 간결하고 강력한 상태 관리 라이브러리
- **OpenWeatherMap API**: 실시간 날씨 데이터 제공

## 설치 방법

```bash
# 저장소 클론
git clone [https://github.com/hwouu/the-clock.git](https://github.com/hwouu/the-clock.git)
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

## 프로젝트 구조

```
the-clock/
├── public/
├── src/
│   ├── components/
│   │   ├── alarm/      # 알람 관련 컴포넌트
│   │   ├── clock/
│   │   ├── header/
│   │   ├── memo/
│   │   ├── timer/
│   │   ├── ui/
│   │   └── weather/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── types/
│   └── utils/          # 유틸리티 함수 (알림, 키보드 단축키 등)
...
```

## 기여하기

기능 제안은 [이 링크](https://hwouu.notion.site/1db7a2533c0f80d79ff6cccfbd32f9b0?pvs=105)를 통해 제출해주세요.

## 연락처

문의사항이나 피드백이 있으면 [nhw3990@gmail.com](mailto:nhw3990@gmail.com)로 연락주세요.
