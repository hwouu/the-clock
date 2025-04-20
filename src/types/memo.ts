// src/types/memo.ts
export interface Memo {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  color: string; // 메모 색상
}

export type MemoFormData = Pick<Memo, "title" | "content" | "color">;

// 미리 정의된 메모 색상
export const MEMO_COLORS = {
  yellow: "#f7df1e",
  green: "#4caf50",
  blue: "#2196f3",
  pink: "#e91e63",
  purple: "#9c27b0",
  gray: "#9e9e9e",
};
