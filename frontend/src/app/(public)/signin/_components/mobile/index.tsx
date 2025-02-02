"use client";
import Footer from "@/app/_components/layout/mobile/footer";
import useAuth from "@/hooks/useAuth";
import { tokenAtom } from "@/store";
import { getItem, removeItem, setItem } from "@/utils/localstorageUtils";
import { useAtom } from "jotai";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Video } from "@/app/_components/ui/video";

const SigninMobile = () => {
  const [, setToken] = useAtom<string>(tokenAtom);
  const { signin } = useAuth();
  const router = useRouter();

  //cutstomized sign in
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      const isSignin = getItem("isSignin");
      if (session && isSignin) {
        removeItem("isSignin");
        const res = await signin(session.idToken);
        if (res.status === 201 && res?.data?.token) {
          // setItem("token", res?.data?.token);
          Cookies.set("token", res?.data?.token, { expires: 1 });
          setToken(res?.data?.token);
          toast.success("Logged in successfully.", {
            autoClose: 2000,
            onClose: () => router.push("/videos"),
          });
        }
      }
      removeItem("isSignin");
    };
    fetchSession();
  }, []);

  //google sign
  const handleSignin = async () => {
    try {
      setItem("isSignin", true);
      await signIn("google", { redirect: false });
    } catch (error) {
      console.error("Failed google signup", error);
    }
  };
  return (
    <>
      <main className="h-screen w-screen relative">
        <div className="h-full w-full">
          <Video src="/video/home/home2.mp4" />
        </div>
        <div className=" absolute top-[331px] left-0 right-0 flex flex-col gap-[40px] items-center">
          <img className="h-[55.4px]" src="/icon/home/title.png" alt="" />
          <div className="flex flex-col items-center gap-[20px]">
            <button
              type="submit"
              onClick={handleSignin}
              className="flex items-center justify-center gap-[12.81px] bg-blue rounded-[12.81px] w-[309px] h-[48px]"
            >
              <h1 className="text-[16px]  font-semibold">
                SIGN IN WITH GOOGLE
              </h1>
              <img src="/icon/register/google.svg" alt="" />
            </button>
            <div className="flex gap-[10px] text-[13px] tracking-wide">
              <h1 className="text-gray-400">New to VIDLINK?</h1>
              <Link href={"/signup"} className="text-blue">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer isFixed={true} />
    </>
  );
};
export default SigninMobile;
