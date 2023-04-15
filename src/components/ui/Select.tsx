import { type SelectHTMLAttributes } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  labelName: string;
}

function Select({ children, labelName, ...rest }: SelectProps) {
  return (
    <fieldset className=" flex w-fit flex-col items-center gap-1">
      <label className="mr-2 w-fit text-sm font-semibold">{labelName}</label>
      <div className="flex items-center rounded-xl border border-violet-300">
        <select
          className="w-full cursor-pointer appearance-none bg-transparent p-3 font-medium"
          {...rest}
        >
          {children}
        </select>
        <span>
          <RiArrowDropDownLine size="1.5rem" />
        </span>
      </div>
    </fieldset>
  );
}

export default Select;
