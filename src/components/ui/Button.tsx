import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`flex w-32 items-center justify-center gap-2 rounded-xl bg-violet-300 p-3 font-medium text-black hover:bg-violet-400${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
