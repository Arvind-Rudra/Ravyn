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
        bg-transparent text-[#FF3B30]
        border-2 border-[#FF3B30]
        rounded-[0.625em] font-bold
        cursor-pointer overflow-hidden group z-[1]
        transition-colors duration-500
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
      <span className="relative z-10 group-hover:text-[#FAFAFA] transition-colors duration-500">
        {children}
      </span>
      <span
        className="
          absolute top-0 bottom-0 left-[-20%] right-[-20%]
          bg-[#FF3B30]
          transform skew-x-[-45deg] scale-x-0
          group-hover:scale-x-100
          transition-transform duration-500 ease-in-out
          z-0
        "
      ></span>
    </button>
  );
}
