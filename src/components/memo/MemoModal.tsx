// src/components/memo/MemoModal.tsx
import { useState, useEffect } from "react";
import { useMemoStore } from "../../store/memoStore";
import Modal from "../ui/Modal";
import { useTheme } from "../../hooks/useTheme";
import { MEMO_COLORS } from "../../types/memo";

const MemoModal = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const { isModalOpen, closeModal, addMemo, updateMemo, editingMemo } =
    useMemoStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState(Object.values(MEMO_COLORS)[0]);

  // 편집 모드일 경우 초기값 설정
  useEffect(() => {
    if (editingMemo) {
      setTitle(editingMemo.title);
      setContent(editingMemo.content);
      setColor(editingMemo.color);
    } else {
      resetForm();
    }
  }, [editingMemo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingMemo) {
      // 기존 메모 업데이트
      updateMemo(editingMemo.id, {
        title: title.trim() || "제목 없음",
        content,
        color,
      });
    } else {
      // 새 메모 추가
      addMemo({
        title: title.trim() || "제목 없음",
        content,
        color,
      });
    }

    resetForm();
    closeModal();
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setColor(Object.values(MEMO_COLORS)[0]);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title={editingMemo ? "메모 수정" : "새 메모"}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="memo-title"
            className="block mb-2 text-sm font-medium"
          >
            제목
          </label>
          <input
            id="memo-title"
            type="text"
            placeholder="메모 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-2 border rounded-md ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="memo-content"
            className="block mb-2 text-sm font-medium"
          >
            내용
          </label>
          <textarea
            id="memo-content"
            placeholder="메모 내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className={`w-full p-2 border rounded-md ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">배경색</label>
          <div className="flex items-center space-x-2">
            {Object.entries(MEMO_COLORS).map(([name, colorValue]) => (
              <button
                key={name}
                type="button"
                onClick={() => setColor(colorValue)}
                className={`w-8 h-8 rounded-full transition-all ${
                  color === colorValue
                    ? "ring-2 ring-offset-2 ring-blue-500"
                    : ""
                }`}
                style={{ backgroundColor: colorValue }}
                title={name}
                aria-label={`${name} 색상 선택`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => {
              resetForm();
              closeModal();
            }}
            className={`px-4 py-2 rounded-md ${
              isDarkMode
                ? "bg-gray-600 hover:bg-gray-700"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {editingMemo ? "수정" : "저장"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default MemoModal;
