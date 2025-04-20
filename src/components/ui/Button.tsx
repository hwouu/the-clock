// src/components/ui/Button.tsx
import React from "react";
import { useTheme } from "../../hooks/useTheme";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "icon";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const Button = ({
  variant = "primary",
  size = "md",
  icon,
  children,
  className = "",
  ...props
}: ButtonProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: isDarkMode
      ? "bg-gray-700 text-white hover:bg-gray-600"
      : "bg-gray-200 text-gray-900 hover:bg-gray-300",
    outline: isDarkMode
      ? "border border-gray-600 text-white hover:bg-gray-700"
      : "border border-gray-300 text-gray-900 hover:bg-gray-100",
    ghost: isDarkMode
      ? "text-white hover:bg-gray-800"
      : "text-gray-900 hover:bg-gray-100",
    icon: isDarkMode
      ? "text-white hover:bg-gray-700 rounded-full p-2"
      : "text-gray-900 hover:bg-gray-200 rounded-full p-2",
  };

  const sizeStyles = {
    sm: "text-xs px-2.5 py-1.5 rounded",
    md: "text-sm px-4 py-2 rounded-md",
    lg: "text-base px-6 py-3 rounded-md",
  };

  const iconOnlyStyles = !children ? "p-2 rounded-full" : "";

  const buttonClasses = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${variant !== "icon" ? sizeStyles[size] : ""}
    ${iconOnlyStyles}
    ${className}
  `;

  return (
    <button className={buttonClasses} {...props}>
      {icon && <span className={children ? "mr-2" : ""}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
