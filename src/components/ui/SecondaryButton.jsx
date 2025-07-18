'use client';

export default function SecondaryButton({
  children = 'Ravyn',
  width = '6.5em',
  height = '2.3em',
  fontSize = '20px',
  className = '',
  style = {},
  ...props
}) {
  return (
    <button
      className={`
        relative m-2
        bg-transparent text-[#3D5AFE]
        border-2 border-[#3D5AFE]
        rounded-[0.625em] font-bold
        cursor-pointer overflow-hidden group z-[1]
        transition-all duration-500
        group-hover:border-[#3D5AFE]
        ${className}
      `}
      style={{
        width,
        height,
        fontSize,
        ...style,
      }}
      {...props}
    >
      {/* Text Layer */}
      <span
        className="
          relative z-10
          transition-all duration-500 ease-in-out
          group-hover:text-[#FAFAFA]
          group-hover:opacity-100
          opacity-90
        "
      >
        {children}
      </span>

      {/* Background Slide */}
      <span
        className="
          absolute top-0 bottom-0 left-[-20%] right-[-20%]
          bg-[#3D5AFE]
          transform skew-x-[-45deg] scale-x-0
          group-hover:scale-x-100
          transition-transform duration-500 ease-in-out
          z-0
        "
      ></span>
    </button>
  );
}
