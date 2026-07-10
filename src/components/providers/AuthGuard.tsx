"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated && !pathname.startsWith('/login')) {
      router.push('/login');
    }
  }, [isAuthenticated, mounted, pathname, router]);

  if (!mounted) return null; // Avoid hydration mismatch

  if (!isAuthenticated && !pathname.startsWith('/login')) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}
