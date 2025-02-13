"use client";
import Footer from "@/app/_components/layout/mobile/footer";
import useAuth from "@/hooks/useAuth";
import { tokenAtom } from "@/store";
import { getItem, removeItem, setItem } from "@/utils/localstorage";
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
  const { signin, loading } = useAuth();
  const router = useRouter();

  //cutstomized sign in
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      const isSignin = getItem("isSignin");

      if (session && isSignin) {
        removeItem("isSignin");
        const res = await signin(session.idToken);
        if ("token" in res) {
          // Successfully authenticated and save token
          Cookies.set("token", res.token, { expires: 1 });
          setToken(res.token);
          //check the there was request routing url
          const reqUrl = Cookies.get("reqUrl");
          Cookies.remove("reqUrl");
          toast.success("Logged in successfully.", {
            autoClose: 2000,
            onClose: () => router.replace(`${reqUrl ? `${reqUrl}` : "/"}`),
          });
        } else {
          // Authentication failed, handle error
          toast.error(res.message || "Something went wrong", {
            autoClose: 2000,
            onClose: () => router.push("/signup"),
          });
        }
      }
    };

    fetchSession();
  }, []);

  //google sign
  const handleSignin = async () => {
    const isSignin = getItem("isSignin");
    if (isSignin || loading) return;
    try {
      await signIn("google", { redirect: false });
      setItem("isSignin", true);
    } catch (error) {
      console.error("Failed google signup", error);
    }
  };
  return (
    <>
      <main className="h-screen w-screen relative">
        <div className="h-full w-full">
          {process.env.NEXT_PUBLIC_PRODUCTION === "production" ? (
            <Video src="https://s3-figma-videos-production-sig.figma.com/video/1393144935889806437/TEAM/9fe5/9459/-c108-493f-88a8-fcd10d3d4970?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hHgGoRtCZGaKElyVbPFg0ik8pDoucX1nTEg1DK2kHG2zgLsDgMbqYJ8YQqFGiR5mtCCGnLCUK6BdgBtM6j6JV8jwdDN87vEYJMMAmC4T~OjfoRgCc7XhVUR4eCXdlfm6SNAd7vmoGoh~4CZRgM8zGUnbJ2oCXYCOWKGbmWUYFjJl0lL7UR7NqhFsWmZuNVLbtDeLYJOb2mCWSMzUGa2l5G8LoiGIoGJCOxtvrcZYVS8O9uDWHVG8TloBTxWDgt1EWhzV65EY46Wa8nAQzkob3Z6EjKIx8dccF~iyIF2Vf4tvAiCkBrn2tQkUGH3z-8JQiQwakRCg641y60S-bX5DuA__" />
          ) : (
            <Video src="/video/home/home2.mp4" />
          )}
        </div>
        <div className=" absolute top-[331px] left-0 right-0 flex flex-col gap-[40px] items-center">
          <img className="h-[55.4px]" src="/icon/home/title.png" alt="" />
          <div className="flex flex-col items-center gap-[20px]">
            <button
              onClick={handleSignin}
              type="submit"
              className="flex items-center justify-center gap-[12.81px] bg-blue rounded-[12.81px] w-[309px] h-[48px]"
            >
              <h1 className="text-[16px]  font-semibold">
                SIGN IN WITH GOOGLE
              </h1>
              <img
                className="size-[32px]"
                src="/icon/register/google.svg"
                alt=""
              />
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
