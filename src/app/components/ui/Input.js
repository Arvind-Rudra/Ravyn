'use client';

export default function Input({
  placeholder = "Enter text",
  type = "text",
  size = "md",           // sm | md | lg
  width,                 // e.g., "100%", "300px", or Tailwind class override
  height,                // e.g., "2.5rem", "3rem"
  className = "",
  style = {},
  ...props
}) {
  const sizeClasses = {
    sm: "text-sm px-3 py-1",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-3",
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`
        text-[#FAFAFA] placeholder-[#FAFAFA]/50
        bg-transparent border border-[#FF3B30]
        rounded-md outline-none
        transition-all duration-300 ease-in-out
        focus:border-[#FFD500] focus:ring-2 focus:ring-[#FFD500]/40
        ${sizeClasses[size] || sizeClasses.md}
        ${className}
      `}
      style={{
        width: width || "100%",
        height: height,
        ...style,
      }}
      {...props}
    />
  );
}
