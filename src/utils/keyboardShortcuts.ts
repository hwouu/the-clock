// src/utils/keyboardShortcuts.ts
import { useEffect } from "react";
import { useTimerStore } from "../store/timerStore";
import { useMemoStore } from "../store/memoStore";
import { useAlarmStore } from "../store/alarmStore";

interface KeyboardShortcutsProps {
  toggleClockMode: () => void;
  toggleTheme: () => void;
  enabled: boolean; // 단축키 활성화 여부를 결정하는 prop 추가
}

export const useKeyboardShortcuts = ({
  toggleClockMode,
  toggleTheme,
  enabled, // prop 받기
}: KeyboardShortcutsProps) => {
  const { openModal: openTimerModal } = useTimerStore();
  const { openModal: openMemoModal } = useMemoStore();
  const { openModal: openAlarmModal } = useAlarmStore();

  useEffect(() => {
    // enabled prop이 false이면 아무 작업도 하지 않고,
    // 이전에 등록된 리스너가 있다면 cleanup 함수가 제거합니다.
    if (!enabled) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const isModifier = event.metaKey || event.ctrlKey;

      if (isModifier) {
        switch (event.key) {
          case "d":
            event.preventDefault();
            toggleTheme();
            break;
          case "b":
            event.preventDefault();
            toggleClockMode();
            break;
          case "a":
            event.preventDefault();
            openAlarmModal();
            break;
          case "i":
            event.preventDefault();
            openTimerModal();
            break;
          case "k":
            event.preventDefault();
            openMemoModal();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // cleanup 함수는 enabled 값이 false로 바뀌거나 컴포넌트가 언마운트될 때 실행됩니다.
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    enabled,
    toggleClockMode,
    toggleTheme,
    openTimerModal,
    openMemoModal,
    openAlarmModal,
  ]);
};
