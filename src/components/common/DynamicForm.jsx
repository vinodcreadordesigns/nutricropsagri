import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { submitForm } from "../../utils/api";

// Reusable validated form. fields: [{name,label,type,required,options,full}]
export default function DynamicForm({ fields, initial = {}, submitLabel = "Submit", formName, successMessage = "Thank you! Your message has been sent. Our team will contact you soon.", onSubmit = submitForm }) {
  const blank = () => ({ ...Object.fromEntries(fields.map((f) => [f.name, ""])), ...initial });
  const [values, setValues] = useState(blank);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = () => {
    const e = {};
    fields.forEach((f) => {
      const v = (values[f.name] || "").trim();
      if (f.required && !v) e[f.name] = `${f.label} is required`;
      else if (v && f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) e[f.name] = "Enter a valid email address";
      else if (v && f.type === "tel" && !/^[+\d][\d\s-]{6,17}$/.test(v)) e[f.name] = "Enter a valid phone number";
    });
    return e;
  };
  const handle = async (ev) => {
    ev.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;
    setStatus("loading");
    try {
      await onSubmit({ form: formName, ...values });
      setStatus("success");
      setValues(blank());
    } catch {
      setStatus("error");
    }
  };
  const set = (n) => (e) => { setValues((v) => ({ ...v, [n]: e.target.value })); setStatus((s) => (s === "loading" ? s : "idle")); };

  return (
    <form onSubmit={handle} noValidate className="grid gap-4 sm:grid-cols-2">
      {fields.map((f) => {
        const id = `${formName}-${f.name}`;
        const err = errors[f.name];
        const common = { id, name: f.name, value: values[f.name], onChange: set(f.name), "aria-invalid": !!err, "aria-describedby": err ? `${id}-err` : undefined, className: "input", required: f.required };
        return (
          <div key={f.name} className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}>
            <label htmlFor={id} className="mb-1 block text-sm font-semibold text-ink">{f.label}{f.required && <span className="text-red-600"> *</span>}</label>
            {f.type === "textarea" ? <textarea rows={4} {...common} /> : f.type === "select" ? (
              <select {...common}>{f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
            ) : <input type={f.type || "text"} autoComplete={f.type === "email" ? "email" : f.type === "tel" ? "tel" : undefined} {...common} />}
            {err && <p id={`${id}-err`} className="mt-1 text-xs text-red-600">{err}</p>}
          </div>
        );
      })}
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "loading"} className="inline-flex items-center gap-2 bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-primary-dark disabled:opacity-60">
          {status === "loading" && <Loader2 size={16} className="animate-spin" />}
          {status === "loading" ? "Sending..." : submitLabel}
        </button>
        <div aria-live="polite" role="status">
          {status === "success" && <p className="mt-4 flex items-start gap-2 text-sm text-primary-dark"><CheckCircle2 size={18} className="mt-0.5 shrink-0" />{successMessage}</p>}
          {status === "error" && <p className="mt-4 flex items-start gap-2 text-sm text-red-600"><AlertCircle size={18} className="mt-0.5 shrink-0" />Something went wrong. Please try again.</p>}
        </div>
      </div>
    </form>
  );
}
