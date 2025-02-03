"use client";
import Footer from "@/app/_components/layout/mobile/footer";
import useAuth from "@/hooks/useAuth";
import { useAtom } from "jotai";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getItem, removeItem, setItem } from "@/utils/localstorage";
import { tokenAtom } from "@/store/token";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Video } from "@/app/_components/ui/video";

const SignupMobile = () => {
  const [, setToken] = useAtom<string>(tokenAtom);
  const { signup } = useAuth();
  const router = useRouter();
  //cutstomized sign up
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      const isSignup = getItem("isSignup");

      if (session && isSignup) {
        removeItem("isSignup");

        const res = await signup(session.idToken);

        if ("token" in res) {
          // Successful signup
          Cookies.set("token", res.token, { expires: 1 });
          setToken(res.token);
          toast.success("Signed up successfully.", {
            autoClose: 2000,
            onClose: () => router.push("/videos"),
          });
        } else {
          // User already signed up, handle error
          removeItem("token");
          toast.error(
            res.message || "You have already signed up. Please sign in.",
            {
              autoClose: 2000,
              onClose: () => router.push("/signin"),
            }
          );
        }
      }
    };

    fetchSession();
  }, [signup, router, setToken]);

  //google sign
  const handleSignup = async () => {
    try {
      setItem("isSignup", true);
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
              onClick={handleSignup}
              type="submit"
              className="flex items-center justify-center gap-[12.81px] bg-blue rounded-[12.81px] w-[309px] h-[48px]"
            >
              <h1 className="text-[16px] font-semibold">SIGN UP WITH GOOGLE</h1>
              <img src="/icon/register/google.svg" alt="" />
            </button>
            <div className="flex gap-[10px] text-[13px] tracking-wide">
              <h1 className="text-gray-400">Already on VIDLINK?</h1>
              <Link href={"/signin"} className="text-blue">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer isFixed={true} />
    </>
  );
};
export default SignupMobile;
