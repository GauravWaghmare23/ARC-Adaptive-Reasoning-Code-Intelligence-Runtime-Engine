"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

/**
 * Replaces the system cursor with a small dot + a lagging outline ring.
 * The ring scales up over anything tagged `data-cursor="link"` (see the
 * `Magnetic` wrapper in `fx.tsx`). Disabled automatically on touch
 * devices and when the user prefers reduced motion.
 *
 * Mount once near the top of the tree (the Navbar is a safe, always-on
 * spot) — it's `position: fixed`, so it works regardless of where it
 * lives in the DOM.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduceMotion) return;

    setEnabled(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let hovering = false;
    let raf = 0;

    function onMove(e: PointerEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      hovering = !!(e.target as HTMLElement | null)?.closest('[data-cursor="link"]');
    }

    function loop() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${hovering ? 1.9 : 1})`;
        ringRef.current.style.opacity = hovering ? "1" : "0.55";
        ringRef.current.style.borderColor = hovering
          ? "rgba(16, 185, 129, 0.9)"
          : "rgba(16, 185, 129, 0.4)";
      }

      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body, a, button, [role="button"] { cursor: none !important; }
        }
      `}</style>

      <div
        ref={dotRef}
        aria-hidden
        className={cn('pointer-events-none', 'fixed', 'left-0', 'top-0', 'z-[100]', 'h-1.5', 'w-1.5', 'rounded-full', 'bg-emerald-500')}
      />
      <div
        ref={ringRef}
        aria-hidden
        className={cn('pointer-events-none', 'fixed', 'left-0', 'top-0', 'z-[100]', 'h-8', 'w-8', 'rounded-full', 'border', 'transition-[opacity,border-color]', 'duration-200')}
      />
    </>
  );
}