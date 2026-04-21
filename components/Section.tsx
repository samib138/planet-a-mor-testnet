"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  fullBleed?: boolean;
}

/**
 * Section wrapper with scroll-triggered fade-up reveal.
 */
export default function Section({ id, children, className = "", fullBleed = false }: SectionProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`py-24 transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      <div className={fullBleed ? "px-6" : "max-w-[1100px] mx-auto px-6"}>{children}</div>
    </section>
  );
}
