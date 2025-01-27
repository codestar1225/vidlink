"use client";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { getTokenFromLocalStorage } from "@/constant/token";
import Loading from "@/components/ui/loading";
import { getServerSession } from "next-auth";
import { useRouter } from "next/navigation";

const AuthProvider =  ({ children }: { children: React.ReactNode }) => {

    const router = useRouter();
    const { data: session, status } = useSession();
    console.log(session)
    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/register");
      }
    }, [status, router]);

    // if (status === "loading") {
    //   return <Loading />;
    // }

    if (status === "authenticated") {
      return <>{children}</>;
    }
  // const session = await getServerSession();
  // return session ? <>{children}</> : <div>login</div>;
};

export default AuthProvider;
