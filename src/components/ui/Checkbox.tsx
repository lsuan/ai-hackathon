import { type InputHTMLAttributes } from "react";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  labelName: string;
}

function Checkbox({ labelName, className, ...rest }: RadioProps) {
  return (
    <fieldset
      className={`flex items-center${className ? ` ${className}` : ""}`}
    >
      <label className="mr-2 text-sm font-medium">{labelName}</label>
      <input
        className="cursor-pointer appearance-none rounded-full border border-violet-300 p-2 checked:border-transparent checked:bg-violet-300"
        type="checkbox"
        {...rest}
      />
    </fieldset>
  );
}

export default Checkbox;
