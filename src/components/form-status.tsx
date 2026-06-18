import { AlertCircle, CheckCircle2 } from "lucide-react";

export function FormStatus({ status, message }: { status: "success" | "error"; message: string }) {
  const Icon = status === "success" ? CheckCircle2 : AlertCircle;

  return (
    <p
      aria-live="polite"
      className={`form-status ${status === "success" ? "form-status-success" : "form-status-error"}`}
    >
      <Icon aria-hidden="true" className="size-4 shrink-0" />
      {message}
    </p>
  );
}
