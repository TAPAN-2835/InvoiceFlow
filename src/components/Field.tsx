import * as React from "react";
import { cn } from "@/lib/utils";

interface FieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label?: string;
  hint?: string;
  error?: string;
  prefix?: React.ReactNode;
}

export const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ label, hint, error, prefix, className, id, ...props }, ref) => {
    const inputId = id || React.useId();
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-muted-foreground">
            {label}
          </label>
        )}
        <div className={cn(
          "group flex items-center gap-2 rounded-xl border border-border/70 bg-surface-1/60 px-3 h-10 transition-all",
          "focus-within:border-primary/60 focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.12)]",
          error && "border-destructive/60 focus-within:border-destructive/60 focus-within:shadow-[0_0_0_4px_rgba(220,38,38,0.12)]"
        )}>
          {prefix && <div className="text-muted-foreground/80 text-sm">{prefix}</div>}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none",
              className
            )}
            {...props}
          />
        </div>
        {error ? (
          <span className="text-[11px] text-destructive">{error}</span>
        ) : hint ? (
          <span className="text-[11px] text-muted-foreground/70">{hint}</span>
        ) : null}
      </div>
    );
  }
);
Field.displayName = "Field";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}
export const Area = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || React.useId();
    return (
      <div className="flex flex-col gap-1.5">
        {label && <label htmlFor={inputId} className="text-xs font-medium text-muted-foreground">{label}</label>}
        <textarea
          id={inputId}
          ref={ref}
          className={cn(
            "min-h-[80px] rounded-xl border border-border/70 bg-surface-1/60 px-3 py-2 text-sm outline-none transition-all",
            "focus:border-primary/60 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.12)]",
            error && "border-destructive/60",
            className
          )}
          {...props}
        />
        {error && <span className="text-[11px] text-destructive">{error}</span>}
      </div>
    );
  }
);
Area.displayName = "Area";
