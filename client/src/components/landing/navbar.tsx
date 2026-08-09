"use client";

import Link from "next/link";
import { authClient } from "@/lib/authClient";
import { Button } from "@/components/ui/button";
import { cn } from "../../lib/utils";

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className={cn('border-b', 'bg-background/80', 'backdrop-blur')}>
      <div className={cn('mx-auto', 'flex', 'h-16', 'max-w-7xl', 'items-center', 'justify-between', 'px-6')}>
        {/* Logo */}
        <Link
          href="/"
          className={cn('flex', 'items-center', 'gap-2', 'font-semibold')}
        >
          <div className={cn('flex', 'h-8', 'w-8', 'items-center', 'justify-center', 'rounded-md', 'bg-primary', 'text-sm', 'font-bold', 'text-primary-foreground')}>
            A
          </div>

          <span>ARC</span>
        </Link>

        {/* Navigation */}
        <nav className={cn('hidden', 'items-center', 'gap-6', 'text-sm', 'md:flex')}>
          <Link
            href="/docs"
            className={cn('text-muted-foreground', 'transition-colors', 'hover:text-foreground')}
          >
            Docs
          </Link>

          <a
            href="https://github.com/GauravWaghmare23/Arc"
            target="_blank"
            rel="noopener noreferrer"
            className={cn('flex', 'items-center', 'gap-2', 'text-muted-foreground', 'transition-colors', 'hover:text-foreground')}
          >
            GitHub
          </a>
        </nav>

        {/* Auth Actions */}
        <div className={cn('flex', 'items-center', 'gap-3')}>
          {isPending ? (
            <div className={cn('h-9', 'w-20', 'animate-pulse', 'rounded-md', 'bg-muted')} />
          ) : session ? (
            <>
              <Button variant="ghost">
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </Button>

              <Button>
                <Link href="/dashboard">
                  Open ARC
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost">
                <Link href="/sign-in">
                  Sign in
                </Link>
              </Button>

              <Button>
                <Link href="/register">
                  Get started
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}