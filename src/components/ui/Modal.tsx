// src/components/ui/Modal.tsx
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useTheme } from "../../hooks/useTheme"; // 경로 수정

// ... (컴포넌트의 나머지 코드는 동일합니다)
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const { isDarkMode } = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
      <div
        ref={modalRef}
        className={`w-full max-w-md p-6 rounded-lg shadow-2xl transition-all animate-scaleIn ${
          isDarkMode
            ? "bg-gray-800 text-white border border-gray-700"
            : "bg-white text-gray-900 border border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between mb-5 pb-2 border-b border-opacity-20 border-current">
          <h2 className="text-xl font-bold text-left">{title}</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode
                ? "hover:bg-gray-700 text-gray-300 hover:text-white"
                : "hover:bg-gray-200 text-gray-500 hover:text-gray-900"
            }`}
            title="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
