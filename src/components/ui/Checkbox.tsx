import { type InputHTMLAttributes } from "react";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  labelName: string;
}

function Checkbox({ children, labelName, ...rest }: RadioProps) {
  return (
    <fieldset>
      <label className="mr-2 font-semibold">{labelName}</label>
      <input type="checkbox" {...rest} />
    </fieldset>
  );
}

export default Checkbox;
