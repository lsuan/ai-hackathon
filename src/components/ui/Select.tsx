import { type SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  labelName: string;
}

function Select({ children, labelName, ...rest }: SelectProps) {
  return (
    <fieldset>
      <label className="mr-2 text-sm font-semibold">{labelName}</label>
      <select
        className="w-fit cursor-pointer rounded-xl border border-violet-300 bg-stone-700 p-3 font-medium "
        {...rest}
      >
        {children}
      </select>
    </fieldset>
  );
}

export default Select;
