"use client";
import Footer from "@/components/layout/mobile/footer";
import { register } from "@/hooks/api";
import { signIn, signOut, useSession } from "next-auth/react";

const RegisterMobile = () => {
  const { data: session } = useSession();
  const handleSign = () => {
    if (session?.user) {
      signOut();
    } else {
      signIn("google").then((res) => {
        if (res?.ok) {
          register(session?.user);
        }
      });
    }
  };
  return (
    <>
      <main className="pt-[331px] w-fll flex flex-col items-center h-svw gap-[40px]">
        <img src="/icon/home/title.svg" alt="" />
        <button
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
