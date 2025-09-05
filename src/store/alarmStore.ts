// src/store/alarmStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Alarm } from "../types/alarm";

interface AlarmState {
  alarms: Alarm[];
  isModalOpen: boolean;
  editingAlarm: Alarm | null;
  addAlarm: (alarm: Omit<Alarm, "id" | "createdAt">) => void;
  updateAlarm: (
    id: string,
    alarm: Partial<Omit<Alarm, "id" | "createdAt">>
  ) => void;
  removeAlarm: (id: string) => void;
  toggleAlarm: (id: string) => void;
  openModal: (alarm?: Alarm | null) => void;
  closeModal: () => void;
}

export const useAlarmStore = create<AlarmState>()(
  persist(
    (set) => ({
      alarms: [],
      isModalOpen: false,
      editingAlarm: null,
      addAlarm: (alarm) =>
        set((state) => ({
          alarms: [
            ...state.alarms,
            { ...alarm, id: crypto.randomUUID(), createdAt: new Date() },
          ],
        })),
      updateAlarm: (id, data) =>
        set((state) => ({
          alarms: state.alarms.map((alarm) =>
            alarm.id === id ? { ...alarm, ...data } : alarm
          ),
        })),
      removeAlarm: (id) =>
        set((state) => ({
          alarms: state.alarms.filter((alarm) => alarm.id !== id),
        })),
      toggleAlarm: (id) =>
        set((state) => ({
          alarms: state.alarms.map((alarm) =>
            alarm.id === id ? { ...alarm, isEnabled: !alarm.isEnabled } : alarm
          ),
        })),
      openModal: (alarm = null) =>
        set({ isModalOpen: true, editingAlarm: alarm }),
      closeModal: () => set({ isModalOpen: false, editingAlarm: null }),
    }),
    {
      name: "alarm-storage",
      partialize: (state) => ({ alarms: state.alarms }),
    }
  )
);
