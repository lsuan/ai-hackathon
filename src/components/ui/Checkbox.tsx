import { type InputHTMLAttributes } from "react";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  labelName: string;
}

function Checkbox({ labelName, className, ...rest }: RadioProps) {
  return (
    <fieldset
      className={`flex items-center${className ? ` ${className}` : ""}`}
    >
      <label className="mr-2 text-sm font-semibold">{labelName}</label>
      <input className="cursor-pointer" type="checkbox" {...rest} />
    </fieldset>
  );
}

export default Checkbox;
