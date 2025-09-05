// src/utils/keyboardShortcuts.ts
import { useEffect } from "react";
import { useTimerStore } from "../store/timerStore";
import { useMemoStore } from "../store/memoStore";
import { useAlarmStore } from "../store/alarmStore";

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
  const { openModal: openAlarmModal } = useAlarmStore();

  useEffect(() => {
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
          case "i":
            event.preventDefault();
            openTimerModal();
            break;
          case "k":
            event.preventDefault();
            openMemoModal();
            break;
          case "a":
            event.preventDefault();
            openAlarmModal();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    toggleClockMode,
    toggleTheme,
    openTimerModal,
    openMemoModal,
    openAlarmModal,
  ]);
};
