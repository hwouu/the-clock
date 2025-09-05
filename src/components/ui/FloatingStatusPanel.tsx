// src/components/ui/FloatingStatusPanel.tsx
import React from "react";
import { useTheme } from "../../hooks/useTheme";

interface FloatingStatusPanelProps {
  children: React.ReactNode;
}

const FloatingStatusPanel: React.FC<FloatingStatusPanelProps> = ({
  children,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`fixed bottom-6 left-6 z-30 w-full max-w-xs rounded-lg shadow-xl overflow-hidden ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {children}
      </div>
    </div>
  );
};

export default FloatingStatusPanel;
