"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "../../lib/utils";
import type { JSX } from "react";

type YourProps = {
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

/**
 * Shared visual language for the ARC landing page.
 *
 * The theme stays a light "paper" background, but every section now sits
 * on a faint terminal grid, with a single recurring signal-green accent
 * that echoes the `$` prompt from the terminal demo. These primitives are
 * intentionally CSS-first (no extra dependencies) so they drop into an
 * existing Tailwind + shadcn setup as-is.
 */

/* ---------------------------------------------------------------- */
/*  Global keyframes (declared once, reused everywhere)              */
/* ---------------------------------------------------------------- */

export function GlobalFX() {
  return (
    <style>{`
      @keyframes arc-float {
        0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
        50% { transform: translate3d(0, -22px, 0) scale(1.05); }
      }
      @keyframes arc-float-slow {
        0%, 100% { transform: translate3d(0, 0, 0); }
        50% { transform: translate3d(18px, 16px, 0); }
      }
      @keyframes arc-fade-up {
        from { opacity: 0; transform: translateY(14px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes arc-pulse-ring {
        0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.35); }
        70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
        100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
      }
      @keyframes arc-shimmer {
        from { transform: translateX(-150%); }
        to { transform: translateX(150%); }
      }
      @keyframes arc-blink {
        0%, 49% { opacity: 1; }
        50%, 100% { opacity: 0; }
      }
      .arc-reveal {
        opacity: 0;
      }
      .arc-reveal.arc-in {
        animation: arc-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      @media (prefers-reduced-motion: reduce) {
        .arc-reveal { opacity: 1 !important; animation: none !important; }
        .arc-anim { animation: none !important; }
      }
    `}</style>
  );
}

/* ---------------------------------------------------------------- */
/*  Backdrop: faint terminal grid + radial fade                      */
/* ---------------------------------------------------------------- */

export function GridBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage:
          "radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)",
      }}
    />
  );
}

/* ---------------------------------------------------------------- */
/*  Backdrop: soft floating gradient orbs (signal green + primary)   */
/* ---------------------------------------------------------------- */

export function GlowOrbs({ variant = "hero" }: { variant?: "hero" | "section" }) {
  if (variant === "section") {
    return (
      <div aria-hidden className={cn('pointer-events-none', 'absolute', 'inset-0', 'z-0', 'overflow-hidden')}>
        <div
          className={cn('arc-anim', 'absolute', '-left-24', 'top-0', 'h-72', 'w-72', 'rounded-full', 'bg-emerald-400/10', 'blur-3xl')}
          style={{ animation: "arc-float-slow 14s ease-in-out infinite" }}
        />
        <div
          className={cn('arc-anim', 'absolute', '-right-24', 'bottom-0', 'h-72', 'w-72', 'rounded-full', 'bg-primary/10', 'blur-3xl')}
          style={{ animation: "arc-float-slow 16s ease-in-out infinite reverse" }}
        />
      </div>
    );
  }

  return (
    <div aria-hidden className={cn('pointer-events-none', 'absolute', 'inset-0', '-z-20', 'overflow-hidden')}>
      <div
        className={cn('arc-anim', 'absolute', 'left-1/2', 'top-[-8rem]', 'h-[34rem]', 'w-[50rem]', '-translate-x-1/2', 'rounded-full', 'bg-primary/10', 'blur-3xl')}
        style={{ animation: "arc-float 18s ease-in-out infinite" }}
      />
      <div
        className={cn('arc-anim', 'absolute', 'left-[18%]', 'top-24', 'h-64', 'w-64', 'rounded-full', 'bg-emerald-400/15', 'blur-3xl')}
        style={{ animation: "arc-float-slow 12s ease-in-out infinite" }}
      />
      <div
        className={cn('arc-anim', 'absolute', 'right-[15%]', 'top-40', 'h-56', 'w-56', 'rounded-full', 'bg-emerald-300/10', 'blur-3xl')}
        style={{ animation: "arc-float-slow 15s ease-in-out infinite reverse" }}
      />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Cursor-reactive spotlight (hero only)                             */
/* ---------------------------------------------------------------- */

export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handle = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--y", `${e.clientY - rect.top}px`);
    };

    window.addEventListener("pointermove", handle);
    return () => window.removeEventListener("pointermove", handle);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn('pointer-events-none', 'absolute', 'inset-0', 'z-0', 'opacity-0', 'transition-opacity', 'duration-500', 'md:opacity-100')}
      style={{
        background:
          "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(16, 185, 129, 0.06), transparent 70%)",
      }}
    />
  );
}

/* ---------------------------------------------------------------- */
/*  Scroll reveal wrapper                                             */
/* ---------------------------------------------------------------- */

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Comp = Tag as any;

  return (
    <Comp
      ref={ref}
      className={cn("arc-reveal", visible && "arc-in", className)}
      style={{ animationDelay: visible ? `${delay}ms` : undefined }}
    >
      {children}
    </Comp>
  );
}

/* ---------------------------------------------------------------- */
/*  Copy-to-clipboard button for command blocks                       */
/* ---------------------------------------------------------------- */

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable — fail silently.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy command"
      className={cn(
        "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-white/40 transition-colors hover:bg-white/10 hover:text-white",
        className
      )}
    >
      {copied ? <Check className={cn('h-3.5', 'w-3.5', 'text-emerald-400')} /> : <Copy className={cn('h-3.5', 'w-3.5')} />}
    </button>
  );
}

/* ---------------------------------------------------------------- */
/*  Magnetic wrapper — nudges its child toward the cursor on hover    */
/* ---------------------------------------------------------------- */

export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduceMotion) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
    };

    const onLeave = () => {
      el.style.transform = "translate(0, 0)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      data-cursor="link"
      className={cn("inline-block transition-transform duration-200 ease-out will-change-transform", className)}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Small "live" status pill — reused as an eyebrow decoration        */
/* ---------------------------------------------------------------- */

export function PulseDot() {
  return (
    <span className={cn('relative', 'flex', 'h-1.5', 'w-1.5')}>
      <span
        className={cn('absolute', 'inline-flex', 'h-full', 'w-full', 'rounded-full', 'bg-emerald-500')}
        style={{ animation: "arc-pulse-ring 2.2s cubic-bezier(0.4,0,0.6,1) infinite" }}
      />
      <span className={cn('relative', 'inline-flex', 'h-1.5', 'w-1.5', 'rounded-full', 'bg-emerald-500')} />
    </span>
  );
}