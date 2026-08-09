import Link from "next/link";
import { cn } from "../../lib/utils";

export function Footer() {
  return (
    <footer className="border-t">
      <div className={cn('mx-auto', 'max-w-7xl', 'px-6', 'py-12')}>
        <div className={cn('grid', 'gap-10', 'md:grid-cols-4')}>
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className={cn('text-xl', 'font-bold', 'tracking-tight')}
            >
              ARC
            </Link>

            <p className={cn('mt-3', 'max-w-sm', 'text-sm', 'leading-6', 'text-muted-foreground')}>
              An AI-powered command-line assistant built to
              help developers understand code, solve problems,
              and build faster.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className={cn('text-sm', 'font-semibold')}>
              Product
            </h3>

            <ul className={cn('mt-4', 'space-y-3', 'text-sm', 'text-muted-foreground')}>
              <li>
                <Link
                  href="/docs"
                  className={cn('transition-colors', 'hover:text-foreground')}
                >
                  Documentation
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className={cn('transition-colors', 'hover:text-foreground')}
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className={cn('transition-colors', 'hover:text-foreground')}
                >
                  Get started
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className={cn('text-sm', 'font-semibold')}>
              Resources
            </h3>

            <ul className={cn('mt-4', 'space-y-3', 'text-sm', 'text-muted-foreground')}>
              <li>
                <a
                  href="https://github.com/GauravWaghmare23/Arc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn('transition-colors', 'hover:text-foreground')}
                >
                  GitHub
                </a>
              </li>

              <li>
                <Link
                  href="/docs"
                  className={cn('transition-colors', 'hover:text-foreground')}
                >
                  Docs
                </Link>
              </li>

              <li>
                <a
                  href="https://github.com/GauravWaghmare23/Arc/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn('transition-colors', 'hover:text-foreground')}
                >
                  Report an issue
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className={cn('mt-10', 'flex', 'flex-col', 'gap-4', 'border-t', 'pt-8', 'sm:flex-row', 'sm:items-center', 'sm:justify-between')}>
          <p className={cn('text-sm', 'text-muted-foreground')}>
            © 2026 ARC. All rights reserved.
          </p>

          <div className={cn('flex', 'gap-6', 'text-sm', 'text-muted-foreground')}>
            <Link
              href="/docs"
              className={cn('transition-colors', 'hover:text-foreground')}
            >
              Documentation
            </Link>

            <a
              href="https://github.com/GauravWaghmare23/Arc"
              target="_blank"
              rel="noopener noreferrer"
              className={cn('transition-colors', 'hover:text-foreground')}
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}