// src/utils/keyboardShortcuts.ts
import { useEffect } from "react";
import { useTimerStore } from "../store/timerStore";
import { useMemoStore } from "../store/memoStore";

interface KeyboardShortcutsProps {
  toggleClockMode: () => void;
  toggleTheme: () => void;
}

export const useKeyboardShortcuts = ({
  toggleClockMode,
  toggleTheme,
}: KeyboardShortcutsProps) => {
  const { openModal: openTimerModal } = useTimerStore();
  const { openModal: openMemoModal } = useMemoStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd/Ctrl + 키 조합 확인
      const isModifier = event.metaKey || event.ctrlKey;

      if (isModifier) {
        switch (event.key) {
          case "d": // 다크/라이트 모드 전환
            event.preventDefault();
            toggleTheme();
            break;
          case "b": // 시계 모드 전환 (아날로그/디지털)
            event.preventDefault();
            toggleClockMode();
            break;
          case "i": // 타이머 열기
            event.preventDefault();
            openTimerModal();
            break;
          case "k": // 새 메모 열기
            event.preventDefault();
            openMemoModal();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleClockMode, toggleTheme, openTimerModal, openMemoModal]);
};
