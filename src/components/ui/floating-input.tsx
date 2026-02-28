import * as React from "react";
import { cn } from "../../lib/utils";

export interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  containerClassName?: string;
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  (
    {
      className,
      type = "text",
      label,
      id,
      placeholder,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const ph = placeholder ?? (typeof label === "string" ? label : "");

    return (
      <div className={cn("relative", containerClassName)}>
        <input
          id={inputId}
          type={type}
          ref={ref}
          placeholder={ph}
          className={cn(
            // Neutral, high-contrast black & white defaults — consumer can still override with `className`.
            "peer flex h-11 w-full rounded-xl border border-black bg-white px-3 py-2 text-sm text-black shadow-sm transition-colors",
            "placeholder:text-gray-400",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />

        {label ? (
          <label
            htmlFor={inputId}
            className={cn(
              // Default state: floated (top) — this is what you want when there's a value.
              "pointer-events-none absolute left-3 top-0 -translate-y-1/2 text-xs text-black/80 transition-all",
              "px-1 bg-white",
              // Empty state: move label into the field center.
              "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500",
              // Focus: float (top) and slightly stronger.
              "peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-black"
            )}
          >
            {label}
          </label>
        ) : null}
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

export default FloatingInput;