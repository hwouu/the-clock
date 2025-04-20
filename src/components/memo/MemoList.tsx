// src/components/memo/MemoList.tsx
import { useState } from "react";
import { Edit, Trash2, X } from "lucide-react";
import { useMemoStore } from "../../store/memoStore";
import { useTheme } from "../../context/ThemeContext";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const MemoList = () => {
  const { isDarkMode } = useTheme();
  const { memos, removeMemo, openModal } = useMemoStore();
  const [isOpen, setIsOpen] = useState(false);

  if (memos.length === 0) {
    return null;
  }

  const toggleMemoList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 ${
        isOpen ? "w-80" : "w-auto"
      } transition-all duration-300`}
    >
      {isOpen ? (
        <div
          className={`rounded-lg shadow-xl overflow-hidden ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <div className="flex items-center justify-between p-3 border-b">
            <h3 className="font-bold">메모 목록</h3>
            <button
              onClick={toggleMemoList}
              className={`p-1 rounded-full ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {memos.map((memo) => (
              <div
                key={memo.id}
                className="p-3 border-b last:border-b-0 hover:bg-opacity-10 hover:bg-black"
                style={{
                  borderLeft: `4px solid ${memo.color}`,
                }}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold">{memo.title}</h4>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => openModal(memo)}
                      className={`p-1 rounded-full ${
                        isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                      }`}
                      title="수정"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeMemo(memo.id)}
                      className={`p-1 rounded-full ${
                        isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                      }`}
                      title="삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm line-clamp-2">{memo.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {format(new Date(memo.updatedAt), "MM월 dd일 HH:mm", {
                    locale: ko,
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <button
          onClick={toggleMemoList}
          className={`flex items-center px-3 py-2 rounded-full shadow-lg ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <span className="mr-2">{memos.length}</span>
          <span>메모</span>
        </button>
      )}
    </div>
  );
};

export default MemoList;
