"use client";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import Loading from "@/app/_components/ui/loading";
import { getServerSession } from "next-auth";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { tokenAtom } from "@/store";
import { getItem } from "@/utils/localstorageUtils";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const router = useRouter();
  // const [token] = useAtom<string>(tokenAtom);
  // const [isAuth, setIsAuth] = useState<boolean>(false);

  // useEffect(() => {
  //   const localTolen = getItem("token");
  //   console.log("Auth navigation");
  //   if (!localTolen) {
  //     router.push("/signin");
  //     return;
  //   }
  //   setIsAuth(true);
  // }, [token, router]);

  // return isAuth ? <>{children}</> : <></>;
  return <>{children}</>;
};

export default AuthProvider;
