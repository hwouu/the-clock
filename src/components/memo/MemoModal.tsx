// src/components/memo/MemoModal.tsx
import { useState, useEffect } from "react";
import { useMemoStore } from "../../store/memoStore";
import Modal from "../ui/Modal";
import { useTheme } from "../../context/ThemeContext";
import { MEMO_COLORS } from "../../types/memo";
import { Sparkles } from "lucide-react";

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
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <div>
          <label
            htmlFor="memo-title"
            className="block mb-2 text-sm font-medium text-left"
          >
            제목
          </label>
          <input
            id="memo-title"
            type="text"
            placeholder="메모 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="memo-content"
              className="block text-sm font-medium text-left"
            >
              내용
            </label>
            <button
              type="button"
              onClick={() => setShowMarkdownHelp(!showMarkdownHelp)}
              className={`text-xs flex items-center gap-1 ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              } hover:underline transition-colors`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {showMarkdownHelp ? "도움말 닫기" : "마크다운 도움말"}
            </button>
          </div>

          {showMarkdownHelp && (
            <div
              className={`p-4 mb-3 text-xs rounded-lg border ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <p className="mb-2 font-medium text-left">
                마크다운 문법을 사용하여 텍스트를 꾸밀 수 있습니다:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {markdownHelpExamples.map((example, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-left"
                  >
                    <code
                      className={`px-1.5 py-1 rounded ${
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
            rows={5}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-left">
            배경색
          </label>
          <div className="flex flex-wrap items-center gap-3 py-2">
            {Object.entries(MEMO_COLORS).map(([name, colorValue]) => (
              <button
                key={name}
                type="button"
                onClick={() => setColor(colorValue)}
                className={`w-10 h-10 rounded-full transition-all shadow-sm ${
                  color === colorValue
                    ? "ring-2 ring-offset-2 ring-blue-500 scale-110"
                    : "hover:scale-105"
                }`}
                style={{ backgroundColor: colorValue }}
                title={name}
                aria-label={`${name} 색상 선택`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={() => {
              resetForm();
              closeModal();
            }}
            className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            취소
          </button>
          <button
            type="submit"
            className={`px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors ${
              isDarkMode ? "shadow-none" : "shadow"
            }`}
          >
            {editingMemo ? "수정" : "저장"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default MemoModal;
