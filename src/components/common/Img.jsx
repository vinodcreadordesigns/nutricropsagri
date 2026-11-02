import { useEffect, useRef, useState } from "react";

// Responsive, lazy image with explicit size (no layout shift) and a soft fade-in.
// Use `priority` ONLY for the hero/LCP image.
export default function Img({ src, alt, width, height, className = "", priority = false, ...rest }) {
  const [ok, setOk] = useState(priority);
  const ref = useRef(null);
  useEffect(() => { if (ref.current?.complete) setOk(true); }, []);
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      {...(priority ? { fetchpriority: "high" } : {})}
      onLoad={() => setOk(true)}
      onError={() => setOk(true)}
      className={`${className} transition-opacity duration-500 ${ok ? "opacity-100" : "opacity-0"}`}
      {...rest}
    />
  );
}
