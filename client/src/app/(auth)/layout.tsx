"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/authClient";
import { cn } from "../../lib/utils";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  const router = useRouter();

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session) {
      router.replace("/dashboard");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <main className={cn('flex', 'min-h-screen', 'items-center', 'justify-center')}>
        <div className={cn('flex', 'items-center', 'gap-3')}>
          <div className={cn('h-5', 'w-5', 'animate-spin', 'rounded-full', 'border-2', 'border-primary', 'border-t-transparent')} />

          <p className={cn('text-sm', 'text-muted-foreground')}>
            Checking authentication...
          </p>
        </div>
      </main>
    );
  }

  if (session) {
    return null;
  }

  return (
    <main className={cn('flex', 'min-h-screen', 'items-center', 'justify-center', 'px-6')}>
      {children}
    </main>
  );
}