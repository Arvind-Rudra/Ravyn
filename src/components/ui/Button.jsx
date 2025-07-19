'use client';

export default function SkewButton({
  children = 'Ravyn',
  width = '130px',      // Use absolute px values
  height = '46px',
  fontSize = '20px',
  className = '',
  style = {},
  ...props
}) {
  return (
    <button
      className={`
        relative m-2
        bg-[#FF3B30] text-[#FAFAFA]
        rounded-[10px] font-bold
        cursor-pointer overflow-hidden group z-[1]
        transition-all duration-500
        ${className}
      `}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    >
      {/* Text */}
      <span
        className="
        flex gap-1 items-center justify-center
          relative z-10
          transition-all duration-500 ease-in-out
          opacity-90 group-hover:opacity-100
          group-hover:text-[#121212]
        "
        style={{ fontSize }} // Apply font size only here
      >
        {children}
      </span>

      {/* Background Animation */}
      <span
        className="
          absolute top-0 bottom-0 left-[-20%] right-[-20%]
          bg-[#FFD500]
          transform skew-x-[-45deg] scale-x-0
          group-hover:scale-x-100
          transition-transform duration-500 ease-in-out
          z-0
        "
      ></span>
    </button>
  );
}
