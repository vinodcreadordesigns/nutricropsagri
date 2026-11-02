import { Link } from "react-router-dom";

const variants = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  yellow: "bg-accent text-ink hover:bg-yellow-300",
  outline: "border border-white text-white hover:bg-white hover:text-deep",
  outlineDark: "border border-primary text-primary hover:bg-primary hover:text-white",
};
export default function Button({ to, href, variant = "primary", className = "", children, ...rest }) {
  const cls = `inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-wide transition duration-300 ${variants[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button type="button" className={cls} {...rest}>{children}</button>;
}
