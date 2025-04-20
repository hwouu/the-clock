// src/store/memoStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Memo, MemoFormData, MEMO_COLORS } from "../types/memo";

interface MemoState {
  memos: Memo[];
  activeMemoId: string | null;
  isModalOpen: boolean;
  editingMemo: Memo | null;

  // 액션
  addMemo: (data: MemoFormData) => void;
  updateMemo: (id: string, data: Partial<MemoFormData>) => void;
  removeMemo: (id: string) => void;
  setActiveMemo: (id: string | null) => void;
  openModal: (memo?: Memo) => void;
  closeModal: () => void;
}

export const useMemoStore = create<MemoState>()(
  persist(
    (set, get) => ({
      memos: [],
      activeMemoId: null,
      isModalOpen: false,
      editingMemo: null,

      addMemo: (data) => {
        const newMemo: Memo = {
          id: crypto.randomUUID(),
          title: data.title,
          content: data.content,
          color: data.color || Object.values(MEMO_COLORS)[0],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          memos: [...state.memos, newMemo],
          activeMemoId: newMemo.id,
        }));
      },

      updateMemo: (id, data) => {
        set((state) => ({
          memos: state.memos.map((memo) =>
            memo.id === id
              ? {
                  ...memo,
                  ...data,
                  updatedAt: new Date(),
                }
              : memo
          ),
        }));
      },

      removeMemo: (id) => {
        set((state) => {
          const isActive = state.activeMemoId === id;
          const filteredMemos = state.memos.filter((memo) => memo.id !== id);

          return {
            memos: filteredMemos,
            activeMemoId: isActive
              ? filteredMemos.length > 0
                ? filteredMemos[0].id
                : null
              : state.activeMemoId,
          };
        });
      },

      setActiveMemo: (id) => {
        set({ activeMemoId: id });
      },

      openModal: (memo = null) => {
        set({
          isModalOpen: true,
          editingMemo: memo,
        });
      },

      closeModal: () => {
        set({
          isModalOpen: false,
          editingMemo: null,
        });
      },
    }),
    {
      name: "memo-storage", // 로컬 스토리지 키 이름
      partialize: (state) => ({ memos: state.memos }), // 저장할 상태 일부만 선택
    }
  )
);
