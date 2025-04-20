// src/store/timerStore.ts
import { create } from "zustand";
import { Timer } from "../types/timer";

interface TimerState {
  timers: Timer[];
  activeTimer: Timer | null;
  isModalOpen: boolean;

  // 액션
  addTimer: (timer: Omit<Timer, "id" | "createdAt">) => void;
  removeTimer: (id: string) => void;
  startTimer: (id: string) => void;
  pauseTimer: (id: string) => void;
  resetTimer: (id: string) => void;
  updateTimer: (id: string, time: number) => void;
  clearTimers: () => void;
  setActiveTimer: (timer: Timer | null) => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  timers: [],
  activeTimer: null,
  isModalOpen: false,

  addTimer: (timer) => {
    const newTimer: Timer = {
      ...timer,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    set((state) => ({
      timers: [...state.timers, newTimer],
      activeTimer: state.activeTimer || newTimer, // 첫 타이머인 경우 활성 타이머로 설정
    }));
  },

  removeTimer: (id) => {
    set((state) => {
      const isActiveTimerRemoved = state.activeTimer?.id === id;
      const filteredTimers = state.timers.filter((t) => t.id !== id);

      return {
        timers: filteredTimers,
        activeTimer: isActiveTimerRemoved
          ? filteredTimers.length > 0
            ? filteredTimers[0]
            : null
          : state.activeTimer,
      };
    });
  },

  startTimer: (id) => {
    set((state) => ({
      timers: state.timers.map((timer) =>
        timer.id === id ? { ...timer, isRunning: true } : timer
      ),
    }));
  },

  pauseTimer: (id) => {
    set((state) => ({
      timers: state.timers.map((timer) =>
        timer.id === id ? { ...timer, isRunning: false } : timer
      ),
    }));
  },

  resetTimer: (id) => {
    set((state) => ({
      timers: state.timers.map((timer) =>
        timer.id === id
          ? { ...timer, remainingTime: timer.duration, isRunning: false }
          : timer
      ),
    }));
  },

  updateTimer: (id, time) => {
    set((state) => ({
      timers: state.timers.map((timer) =>
        timer.id === id ? { ...timer, remainingTime: time } : timer
      ),
    }));
  },

  clearTimers: () => {
    set({ timers: [], activeTimer: null });
  },

  setActiveTimer: (timer) => {
    set({ activeTimer: timer });
  },

  openModal: () => {
    set({ isModalOpen: true });
  },

  closeModal: () => {
    set({ isModalOpen: false });
  },
}));
