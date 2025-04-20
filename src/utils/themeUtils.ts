// src/utils/themeUtils.ts
// 새 유틸리티 파일 생성
export const applyThemeToDocument = (isDark: boolean) => {
  // HTML 요소에 적용
  document.documentElement.classList.toggle("dark", isDark);

  // body 요소에 적용
  document.body.classList.toggle("dark", isDark);

  // 필요한 경우 추가 컨테이너 요소에 적용
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.classList.toggle("dark-mode-background", isDark);
  }

  // 강제 리드로우
  document.body.style.display = "none";
  document.body.offsetHeight; // 리플로우 트리거
  document.body.style.display = "";
};
