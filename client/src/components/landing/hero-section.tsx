import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "../../lib/utils";

export function HeroSection() {
  return (
    <section className={cn('relative', 'overflow-hidden', 'px-6', 'py-24', 'md:py-32', 'lg:py-40')}>
      {/* Background */}
      <div className={cn('pointer-events-none', 'absolute', 'inset-0', '-z-10')}>
        <div className={cn('absolute', 'left-1/2', 'top-0', 'h-125', 'w-200', '-translate-x-1/2', 'rounded-full', 'bg-primary/10', 'blur-3xl')} />
      </div>

      <div className={cn('mx-auto', 'max-w-5xl', 'text-center')}>
        {/* Badge */}
        <div className={cn('mb-8', 'inline-flex', 'items-center', 'gap-2', 'rounded-full', 'border', 'bg-muted/50', 'px-4', 'py-2', 'text-sm', 'text-muted-foreground')}>
          <Terminal className={cn('h-4', 'w-4')} />

          <span>AI-powered developer CLI</span>
        </div>

        {/* Heading */}
        <h1 className={cn('text-5xl', 'font-bold', 'tracking-tight', 'sm:text-6xl', 'md:text-7xl', 'lg:text-8xl')}>
          Your terminal.
          <br />

          <span className="text-muted-foreground">
            Supercharged with AI.
          </span>
        </h1>

        {/* Description */}
        <p className={cn('mx-auto', 'mt-8', 'max-w-2xl', 'text-base', 'leading-7', 'text-muted-foreground', 'sm:text-lg', 'sm:leading-8')}>
          ARC brings AI directly into your terminal.
          Understand your code, debug problems, automate
          repetitive tasks, and build faster without leaving
          your development environment.
        </p>

        {/* Actions */}
        <div className={cn('mt-10', 'flex', 'flex-col', 'items-center', 'justify-center', 'gap-3', 'sm:flex-row')}>
          <Button
            size="lg"
            className={cn('w-full', 'sm:w-auto')}
          >
            <Link href="/register">
              Get started
              <ArrowRight className={cn('ml-2', 'h-4', 'w-4')} />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className={cn('w-full', 'sm:w-auto')}
          >
            <Link href="/docs">
              Read the docs
            </Link>
          </Button>
        </div>

        {/* Install command */}
        <div className={cn('mx-auto', 'mt-10', 'flex', 'w-fit', 'items-center', 'rounded-lg', 'border', 'bg-muted/50', 'px-4', 'py-3', 'font-mono', 'text-sm')}>
          <span className={cn('mr-2', 'text-muted-foreground')}>
            $
          </span>

          <span>npm install -g arc-cli</span>
        </div>

        {/* Supporting text */}
        <p className={cn('mt-4', 'text-xs', 'text-muted-foreground')}>
          Built for developers who live in the terminal.
        </p>
      </div>
    </section>
  );
}