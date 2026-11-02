export const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
export const fadeIn = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } };
export const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
export const viewOnce = { once: true, margin: "-60px" };
export const pageTransition = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } };
