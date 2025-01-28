"use client";
import { sessionAtom } from "@/store/sessionAtom";
import Footer from "@/app/_components/layout/mobile/footer";
import useAuth from "@/hooks/useAuth";

import axios from "axios";
import { useAtom } from "jotai";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const RegisterMobile = () => {
  const { data: session, status } = useSession();
  const [ses, setSes] = useAtom(sessionAtom);
  const handleSign = async (event: React.FormEvent) => {
    // event.preventDefault();
    // const { register } = useAuth();
    // const data = await register(session?.idToken);
    // alert(data?.message);
    // console.log(data?.token);
    // if (session) {
    //   signOut({ callbackUrl: "/" });
    // } else {
    const res = await signIn("google");
    // console.log(res)
    // if (res?.ok) {
    // Fetch the updated session after signing in
    // const updatedSession = await fetch("/api/auth/[aaa]").then((res) =>
    //   res.json()
    // );

    // if (updatedSession) {
    //   // Call the register function with the updated session
    //   await register(updatedSession);
    // }
    // } else {
    // console.error("Sign-in failed:", res?.error);
    // }
    // }
  };

  if (status === "loading") {
    return null;
  }
  return (
    <>
      <main className="pt-[331px] w-fll flex flex-col items-center gap-[40px]">
        <img className="h-[55.4px]" src="/icon/home/title.png" alt="" />
        <button
          type="submit"
          onClick={handleSign}
          className="flex items-center justify-center gap-[12.81px] bg-blue rounded-[12.81px] w-[309px] h-[48px]"
        >
          <h1 className="text-[16px] font-semibold text-white">
            SIGN UP WITH GOOGLE
          </h1>
          <img src="/icon/register/google.svg" alt="" />
        </button>
        <div className="flex gap-[20px] text-[13px] tracking-wide">
          <h1>Already on VIDLINK?</h1>
          <button className="text-blue">Sign in</button>
        </div>
      </main>
      <Footer isFixed={true} />
    </>
  );
};
export default RegisterMobile;
