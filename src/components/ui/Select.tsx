import { type SelectHTMLAttributes } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  labelName: string;
}

function Select({ children, labelName, ...rest }: SelectProps) {
  return (
    <fieldset className="relative w-fit">
      <label className="mr-2 text-sm font-semibold">{labelName}</label>
      <select
        className="w-16 cursor-pointer appearance-none rounded-xl border border-violet-300 bg-stone-700 p-3 font-medium "
        {...rest}
      >
        {children}
      </select>
      <RiArrowDropDownLine
        className="absolute right-2 top-1/2 -translate-y-1/2"
        size="1.5rem"
      />
    </fieldset>
  );
}

export default Select;
