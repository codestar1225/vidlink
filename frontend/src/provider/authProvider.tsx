"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getTokenFromLocalStorage } from "@/constant/token";
import Loading from "@/components/ui/loading";
import { useRouter } from "next/navigation";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(session,'aaaaaaaaaaaa', session?.user);
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "authenticated") {
    return <>{children}</>;
  }
};

export default AuthProvider;
