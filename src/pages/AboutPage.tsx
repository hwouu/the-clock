// src/pages/AboutPage.tsx
import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import {
  Clock,
  Sun,
  Calendar,
  Map,
  LayoutGrid,
  Code,
  Timer,
  StickyNote,
  Github,
  Mail,
  FileQuestion,
} from "lucide-react";

const AboutPage = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="min-h-screen py-4 md:py-8 px-3 md:px-6 animate-fadeIn">
      <div
        className={`max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Hero Section */}
        <Link to="/">
          <div
            className={`w-full p-4 md:p-8 ${
              isDarkMode ? "bg-gray-700" : "bg-blue-50"
            } flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition-opacity`}
          >
            <Clock
              className={`w-12 h-12 md:w-16 md:h-16 mb-3 md:mb-4 ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
            />
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">
              The Clock
            </h1>
          </div>
        </Link>

        {/* Content Section */}
        <div className="p-4 md:p-8">
          <section className="mb-6 md:mb-10 animate-slideUp">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center">
              <span
                className={`mr-2 md:mr-3 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                <Code className="w-5 h-5 md:w-6 md:h-6" />
              </span>
              앱 소개
            </h2>
            <div
              className={`p-4 md:p-6 rounded-lg ${
                isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
              }`}
            >
              <p className="leading-relaxed text-sm md:text-base text-left">
                이 앱은 React, TypeScript, 그리고 Tailwind CSS를 사용하여 만든
                모던한 웹 시계 애플리케이션입니다.
              </p>
            </div>
          </section>

          <section
            className="mb-6 md:mb-10 animate-slideUp"
            style={{ animationDelay: "100ms" }}
          >
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center">
              <span
                className={`mr-2 md:mr-3 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                <LayoutGrid className="w-5 h-5 md:w-6 md:h-6" />
              </span>
              주요 기능
            </h2>
            <div
              className={`p-4 md:p-6 rounded-lg ${
                isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
              }`}
            >
              <ul className="space-y-3 md:space-y-4">
                <FeatureItem icon={<Clock />} title="아날로그/디지털 시계 전환">
                  두 가지 시계 모드를 쉽게 전환할 수 있습니다.
                </FeatureItem>
                <FeatureItem icon={<Sun />} title="다크 모드/라이트 모드">
                  사용자 환경에 맞게 테마를 변경할 수 있습니다.
                </FeatureItem>
                <FeatureItem icon={<Calendar />} title="실시간 시간 표시">
                  현재 시간을 정확하게 보여줍니다.
                </FeatureItem>
                <FeatureItem icon={<Map />} title="실시간 위치 및 날씨 정보">
                  OpenWeatherMap API를 사용하여 현재 위치와 날씨 상태를
                  표시합니다.
                </FeatureItem>
                <FeatureItem icon={<Timer />} title="타이머 기능">
                  편리한 타이머 기능으로 시간을 관리할 수 있습니다.
                </FeatureItem>
                <FeatureItem icon={<StickyNote />} title="메모 기능">
                  간단한 메모를 작성하고 관리할 수 있습니다.
                </FeatureItem>
                <FeatureItem icon={<LayoutGrid />} title="반응형 디자인">
                  모든 디바이스 화면 크기에 맞게 최적화되어 있습니다.
                </FeatureItem>
              </ul>
            </div>
          </section>

          <section
            className="mb-6 md:mb-10 animate-slideUp"
            style={{ animationDelay: "200ms" }}
          >
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center">
              <span
                className={`mr-2 md:mr-3 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                <Code className="w-5 h-5 md:w-6 md:h-6" />
              </span>
              기술 스택
            </h2>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 p-4 md:p-6 rounded-lg ${
                isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
              }`}
            >
              <TechItem title="React 19">
                최신 React 기능을 활용한 UI 구축
              </TechItem>
              <TechItem title="TypeScript">
                타입 안정성을 갖춘 코드 작성
              </TechItem>
              <TechItem title="Tailwind CSS">
                모던하고 반응형인 UI 스타일링
              </TechItem>
              <TechItem title="Vite">빠른 개발 서버 및 빌드 도구</TechItem>
              <TechItem title="date-fns">
                날짜 및 시간 형식화 라이브러리
              </TechItem>
              <TechItem title="Lucide React">
                아이콘 컴포넌트 라이브러리
              </TechItem>
              <TechItem title="Zustand">
                간결하고 강력한 상태 관리 라이브러리
              </TechItem>
              <TechItem title="OpenWeatherMap API">
                실시간 날씨 데이터 제공
              </TechItem>
            </div>
          </section>

          <section
            className="mb-10 animate-slideUp"
            style={{ animationDelay: "300ms" }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span
                className={`mr-3 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                <Calendar className="w-6 h-6" />
              </span>
              업데이트 내역
            </h2>
            <div
              className={`p-6 rounded-lg ${
                isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
              }`}
            >
              <div className="space-y-6">
                <UpdateItem date="2025년 4월 20일">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>멀티 페이지 구조로 변경 및 라우팅 추가</li>
                    <li>소개 페이지 개선</li>
                    <li>헤더 컴포넌트 추가</li>
                    <li>UI 디자인 현대화</li>
                    <li>타이머 및 메모 기능 개선</li>
                  </ul>
                </UpdateItem>
              </div>
            </div>
          </section>

          <section
            className="animate-slideUp"
            style={{ animationDelay: "400ms" }}
          >
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center">
              <span
                className={`mr-2 md:mr-3 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                <Clock className="w-5 h-5 md:w-6 md:h-6" />
              </span>
              개발자 정보
            </h2>
            <div
              className={`p-4 md:p-6 rounded-lg ${
                isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
              } text-center`}
            >
              <p className="mb-3 text-sm md:text-base">
                문의사항이나 피드백이 있으면 아래 연락처로 연락주세요.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mt-3 md:mt-4">
                <a
                  href="mailto:nhw3990@gmail.com"
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  } font-medium transition-colors text-sm md:text-base`}
                >
                  <Mail className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  메일 보내기
                </a>
                <a
                  href="https://hwouu.notion.site/1db7a2533c0f80d79ff6cccfbd32f9b0?pvs=105"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  } font-medium transition-colors text-sm md:text-base`}
                >
                  <FileQuestion className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  기능 제안
                </a>
                <a
                  href="https://github.com/hwouu/the-clock"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  } font-medium transition-colors text-sm md:text-base`}
                >
                  <Github className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  GitHub
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div
          className={`p-3 md:p-4 text-center text-xs md:text-sm ${
            isDarkMode
              ? "bg-gray-800 text-gray-400"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          © 2025 The Clock. All rights reserved.
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => {
  const { isDarkMode } = useTheme();

  return (
    <li className="flex items-start">
      <span
        className={`flex-shrink-0 mr-3 md:mr-4 mt-1 p-1 md:p-1.5 rounded-full ${
          isDarkMode
            ? "bg-blue-500/20 text-blue-400"
            : "bg-blue-100 text-blue-600"
        }`}
      >
        <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
          {icon}
        </div>
      </span>
      <div className="flex-1">
        <h3 className="font-semibold text-left text-sm md:text-base">
          {title}
        </h3>
        <p
          className={`${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          } text-left mt-1 text-xs md:text-sm`}
        >
          {children}
        </p>
      </div>
    </li>
  );
};

const TechItem = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`p-3 md:p-4 rounded-md ${
        isDarkMode ? "bg-gray-700/70" : "bg-gray-100/80"
      }`}
    >
      <h3 className="font-medium mb-1 text-sm md:text-base">{title}</h3>
      <p
        className={`${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        } text-xs md:text-sm`}
      >
        {children}
      </p>
    </div>
  );
};

const UpdateItem = ({
  date,
  children,
}: {
  date: string;
  children: React.ReactNode;
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="text-left">
      <h3
        className={`text-xl font-semibold ${
          isDarkMode ? "text-blue-400" : "text-blue-600"
        } mb-2`}
      >
        {date}
      </h3>
      {children}
    </div>
  );
};

export default AboutPage;
