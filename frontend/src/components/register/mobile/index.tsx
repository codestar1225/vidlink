"use client";
import Footer from "@/components/layout/mobile/footer";
import { register } from "@/hooks/api";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const RegisterMobile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleSign = (event: React.FormEvent) => {
    event.preventDefault();
    if (session?.user) {
      signOut({ callbackUrl: "/" });
    } else {
      signIn("google").then((res) => {
        if (res?.ok) {
          register(session?.user);
        }
      });
    }
  };
  if (status === "loading") {
    return null;
  }
  return (
    <>
      <main className="pt-[331px] w-fll flex flex-col items-center h-svw gap-[40px]">
        <img src="/icon/home/title.png" alt="" />
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
