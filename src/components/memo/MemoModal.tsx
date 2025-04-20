// src/components/memo/MemoModal.tsx
import { useState, useEffect } from "react";
import { useMemoStore } from "../../store/memoStore";
import Modal from "../ui/Modal";
import { useTheme } from "../../context/ThemeContext";
import { MEMO_COLORS } from "../../types/memo";

const MemoModal = () => {
  const { isDarkMode } = useTheme();
  const { isModalOpen, closeModal, addMemo, updateMemo, editingMemo } =
    useMemoStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState(Object.values(MEMO_COLORS)[0]);
  const [showMarkdownHelp, setShowMarkdownHelp] = useState(false);

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
    setShowMarkdownHelp(false);
  };

  const markdownHelpExamples = [
    { syntax: "# 제목", description: "큰 제목" },
    { syntax: "## 제목", description: "중간 제목" },
    { syntax: "**굵게**", description: "굵은 글씨" },
    { syntax: "*기울임*", description: "기울임체" },
    { syntax: "~~취소선~~", description: "취소선" },
    { syntax: "- 항목", description: "목록" },
    { syntax: "1. 항목", description: "번호 목록" },
    { syntax: "`코드`", description: "인라인 코드" },
    { syntax: "[링크](URL)", description: "링크" },
  ];

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

        <div className="mb-1">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="memo-content" className="block text-sm font-medium">
              내용
            </label>
            <button
              type="button"
              onClick={() => setShowMarkdownHelp(!showMarkdownHelp)}
              className="text-xs text-blue-500 hover:underline"
            >
              {showMarkdownHelp ? "마크다운 도움말 닫기" : "마크다운 도움말"}
            </button>
          </div>

          {showMarkdownHelp && (
            <div
              className={`p-3 mb-3 text-xs rounded-md ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <p className="mb-2">
                마크다운 문법을 사용하여 텍스트를 꾸밀 수 있습니다:
              </p>
              <div className="grid grid-cols-2 gap-1">
                {markdownHelpExamples.map((example, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <code
                      className={`px-1 py-0.5 rounded ${
                        isDarkMode ? "bg-gray-800" : "bg-gray-200"
                      }`}
                    >
                      {example.syntax}
                    </code>
                    <span>{example.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <textarea
            id="memo-content"
            placeholder="메모 내용을 입력하세요 (마크다운 지원)"
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
