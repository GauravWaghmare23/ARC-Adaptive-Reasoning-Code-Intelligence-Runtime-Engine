import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "../../lib/utils";

export function InstallationSection() {
  return (
    <section className={cn('border-t', 'px-6', 'py-24', 'md:py-32')}>
      <div className={cn('mx-auto', 'max-w-4xl', 'text-center')}>
        <p className={cn('text-sm', 'font-medium', 'text-primary')}>
          GET STARTED
        </p>

        <h2 className={cn('mt-3', 'text-3xl', 'font-bold', 'tracking-tight', 'sm:text-4xl')}>
          Install ARC and start building.
        </h2>

        <p className={cn('mx-auto', 'mt-4', 'max-w-2xl', 'text-base', 'leading-7', 'text-muted-foreground')}>
          Get ARC running in your development environment
          and bring AI assistance directly into your terminal.
        </p>

        <div className={cn('mx-auto', 'mt-10', 'max-w-xl', 'overflow-x-auto', 'rounded-xl', 'border', 'bg-muted/50', 'p-5', 'text-left')}>
          <div className={cn('font-mono', 'text-sm')}>
            <span className={cn('mr-2', 'text-muted-foreground')}>
              $
            </span>

            npm install -g arc-cli
          </div>
        </div>

        <div className={cn('mx-auto', 'mt-4', 'max-w-xl', 'overflow-x-auto', 'rounded-xl', 'border', 'bg-black', 'p-5', 'text-left', 'font-mono', 'text-sm', 'text-white')}>
          <p>
            <span className="text-green-400">$</span>{" "}
            arc --version
          </p>

          <p className={cn('mt-2', 'text-white/50')}>
            arc v0.1.0
          </p>
        </div>

        <div className={cn('mt-8', 'flex', 'flex-col', 'items-center', 'justify-center', 'gap-3', 'sm:flex-row')}>
          <Button size="lg">
            <Link href="/register">
              Get started
            </Link>
          </Button>

          <Button size="lg" variant="outline">
            <Link href="/docs">
              View documentation
            </Link>
          </Button>
        </div>

        <p className={cn('mt-6', 'text-xs', 'text-muted-foreground')}>
          Node.js 18+ recommended
        </p>
      </div>
    </section>
  );
}