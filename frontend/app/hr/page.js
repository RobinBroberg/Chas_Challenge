"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/api";

export default function HrDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const user = await getCurrentUser();
      if (!user || user.role !== "hr") {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  if (loading) return <p className="p-10">Laddar...</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">HR Dashboard</h1>
      <p>Välkommen, HR!</p>
    </div>
  );
}
