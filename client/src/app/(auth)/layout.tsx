"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/authClient";
import { cn } from "../../lib/utils";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { data: session, isPending } =
    authClient.useSession();

  useEffect(() => {
    if (!isPending && session) {
      router.replace("/dashboard");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <main className={cn('flex', 'min-h-screen', 'items-center', 'justify-center')}>
        <p className={cn('text-sm', 'text-muted-foreground')}>
          Loading...
        </p>
      </main>
    );
  }

  if (session) {
    return null;
  }

  return <>{children}</>;
}