import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={cn('flex', 'min-h-screen', 'w-full', 'items-center', 'justify-center')}>
      {children}
    </div>
  );
};

export default AuthLayout;