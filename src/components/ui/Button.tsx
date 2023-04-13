interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className="w-32 rounded-xl bg-stone-700 p-3 font-medium hover:bg-violet-300 hover:text-black"
    >
      {children}
    </button>
  );
}

export default Button;
