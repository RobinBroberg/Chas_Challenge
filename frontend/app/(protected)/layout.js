"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/utils/api";

export default function ProtectedLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    };
    check();
  }, []);

  if (loading) return null;

  return <>{children}</>;
}
