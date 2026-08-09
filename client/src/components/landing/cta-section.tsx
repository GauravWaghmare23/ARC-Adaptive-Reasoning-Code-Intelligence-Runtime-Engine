import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "../../lib/utils";

export function CTASection() {
  return (
    <section className={cn('border-t', 'px-6', 'py-24', 'md:py-32')}>
      <div className={cn('mx-auto', 'max-w-3xl', 'text-center')}>
        <p className={cn('text-sm', 'font-medium', 'text-primary')}>
          GET STARTED WITH ARC
        </p>

        <h2 className={cn('mt-3', 'text-3xl', 'font-bold', 'tracking-tight', 'sm:text-4xl')}>
          Build faster from your terminal.
        </h2>

        <p className={cn('mx-auto', 'mt-4', 'max-w-2xl', 'text-base', 'leading-7', 'text-muted-foreground')}>
          Create your ARC account, connect your development
          workflow, and start using AI where you already build.
        </p>

        <div className={cn('mt-8', 'flex', 'flex-col', 'items-center', 'justify-center', 'gap-3', 'sm:flex-row')}>
          <Button size="lg">
            <Link href="/register">
              Get started
            </Link>
          </Button>

          <Button size="lg" variant="outline">
            <Link href="/docs">
              Read the documentation
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}