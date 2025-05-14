import { ReactNode } from "react";
import { Label } from "../../atoms";
interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
