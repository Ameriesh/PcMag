"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const NavbarAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/session", { cache: "no-store" });
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  if (loading) return <span>Loading...</span>;

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <>
          <span className="text-primary-500 font-semibold">{user.name}</span>
          <Button
            onClick={async () => {
              await fetch("/api/signout");
              setUser(null);
            }}
            className="btn-logout"
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link href="/auth/signin">
            <Button className="btn-secondary">Sign In</Button>
          </Link>
          
        </>
      )}
    </div>
  );
};
