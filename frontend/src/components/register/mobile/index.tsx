"use client";
import { sessionAtom } from "@/app/store/sessionAtom";
import Footer from "@/components/layout/mobile/footer";
import { register } from "@/hooks/api";
import { useAtom } from "jotai";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const RegisterMobile = () => {
  const { data: session, status } = useSession();
  const [ses, setSes] = useAtom(sessionAtom);
  const handleSign = async (event: React.FormEvent) => {
    event.preventDefault();
    if (session) {
      signOut({ callbackUrl: "/" });
    } else {
      const res = await signIn("google", { callbackUrl: "/" });
      if (res?.ok) {
        // Fetch the updated session after signing in
        const updatedSession = await fetch("/api/auth/session").then((res) =>
          res.json()
        );

        if (updatedSession) {
          // Call the register function with the updated session
          await register(updatedSession);
        }
      } else {
        console.error("Sign-in failed:", res?.error);
      }
    }
  };
  if (status === "loading") {
    return null;
  }
  return (
    <>
      <main className="pt-[331px] w-fll h-[] flex flex-col items-center gap-[40px]">
        <img className="h-[55.4px]" src="/icon/home/title.png" alt="" />
        <button
          type="submit"
          onClick={handleSign}
          className="flex items-center justify-center gap-[12.81px] bg-[#0368fb] rounded-[12.81px] w-[309px] h-[48px]"
        >
          <h1 className="text-[16px] font-semibold text-white">
            {!session ? "SIGN UP WITH GOOGLE" : "LOG OUT"}
          </h1>
          <img src="/icon/register/google.svg" alt="" />
        </button>
      </main>
      <Footer isFixed={true} />
    </>
  );
};
export default RegisterMobile;
