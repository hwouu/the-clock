// src/pages/AboutPage.tsx
import { useTheme } from "../hooks/useTheme";

const AboutPage = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div
        className={`max-w-4xl mx-auto p-6 rounded-xl shadow-lg ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h1 className="text-3xl font-bold mb-6">The Clock 소개</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">프로젝트 소개</h2>
          <p className="mb-4">
            이 프로젝트는 React, TypeScript, 그리고 Tailwind CSS를 사용하여 만든
            모던한 웹 시계 애플리케이션입니다. OpenWeatherMap API를 활용해
            실시간 날씨 정보를 제공합니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">주요 기능</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              아날로그/디지털 시계 전환: 두 가지 시계 모드를 쉽게 전환할 수
              있습니다.
            </li>
            <li>
              다크 모드/라이트 모드: 사용자 환경에 맞게 테마를 변경할 수
              있습니다.
            </li>
            <li>실시간 시간 표시: 현재 시간을 정확하게 보여줍니다.</li>
            <li>
              실시간 위치 및 날씨 정보: OpenWeatherMap API를 사용하여 현재
              위치와 날씨 상태를 표시합니다.
            </li>
            <li>
              반응형 디자인: 모든 디바이스 화면 크기에 맞게 최적화되어 있습니다.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">기술 스택</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-semibold">React 19:</span> 최신 React 기능을
              활용한 UI 구축
            </li>
            <li>
              <span className="font-semibold">TypeScript:</span> 타입 안정성을
              갖춘 코드 작성
            </li>
            <li>
              <span className="font-semibold">Tailwind CSS:</span> 모던하고
              반응형인 UI 스타일링
            </li>
            <li>
              <span className="font-semibold">Vite:</span> 빠른 개발 서버 및
              빌드 도구
            </li>
            <li>
              <span className="font-semibold">date-fns:</span> 날짜 및 시간
              형식화 라이브러리
            </li>
            <li>
              <span className="font-semibold">Lucide React:</span> 아이콘
              컴포넌트 라이브러리
            </li>
            <li>
              <span className="font-semibold">OpenWeatherMap API:</span> 실시간
              날씨 데이터 제공
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">업데이트 내역</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">2025년 4월 20일</h3>
              <ul className="list-disc pl-6 mt-2">
                <li>멀티 페이지 구조로 변경 및 라우팅 추가</li>
                <li>소개 페이지 추가</li>
                <li>헤더 컴포넌트 추가</li>
                <li>UI 디자인 현대화</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">개발자 정보</h2>
          <p>
            문의사항이나 피드백이 있으면{" "}
            <a
              href="mailto:nhw3990@gmail.com"
              className={`${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              } hover:underline`}
            >
              nhw3990@gmail.com
            </a>
            으로 연락주세요.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
