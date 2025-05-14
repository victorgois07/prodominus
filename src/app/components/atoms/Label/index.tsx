import { LabelHTMLAttributes, forwardRef } from "react";

export const Label = forwardRef<
  HTMLLabelElement,
  LabelHTMLAttributes<HTMLLabelElement>
>((props, ref) => (
  <label ref={ref} className="block mb-1 font-medium" {...props} />
));
Label.displayName = "Label";
