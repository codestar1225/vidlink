"use client";
import Link from "next/link";
import Item from "./Item";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/ui/loading";
import { useAtom } from "jotai";
import { sessionAtom } from "@/app/store/sessionAtom";

const HeaderMobile = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      setIsAuth(true);
    }
  }, [status, router]);

  const [isBlurred, setIsBlurred] = useState(false);
  const [ses, setSes] = useAtom(sessionAtom);
  console.log(ses,'aaaaaaaaaaaaaaa');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsBlurred(true);
      } else {
        setIsBlurred(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return !isOpenMenu ? (
    <header
      className={`${
        isBlurred ? "backdrop-blur-md bg-white/50" : "bg-transparent"
      } fixed z-10 top-0 left-0 w-screen visible`}
    >
      <div className="flex justify-between pt-[30px] bg-transparent mx-[32px]">
        <button onClick={() => setIsOpenMenu(true)}>
          <img src="/icon/layout/menu.svg" alt="" />
        </button>
        <div className="flex gap-[9px]">
          {isAuth ? (
            <>
              <Link href={"/message"}>
                <img src="/icon/layout/message.svg" alt="" />
              </Link>

              <Link href={"/profile"}>
                <img src="/icon/layout/avatar.svg" alt="" />
              </Link>
            </>
          ) : (
            <Link href={"/register"}>
              <img src="/icon/layout/logo.svg" alt="" />
            </Link>
          )}
        </div>
      </div>
    </header>
  ) : (
    <header className="fixed z-10 top-0 left-0 w-screen">
      <div className="pt-[30px] bg-transparent mx-[32px]">
        <button onClick={() => setIsOpenMenu(false)}>
          <img src="/icon/layout/close.svg" alt="" />
        </button>
        <div
          className={`mt-[15px] flex  ${
            isAuth ? "justify-between" : "justify-start gap-5"
          }`}
        >
          <Item url={"/"} name="HOME" setIsOpenMenu={setIsOpenMenu} />
          <Item url={"/videos"} name="VIDEOS" setIsOpenMenu={setIsOpenMenu} />
          {isAuth && (
            <>
              <Item
                url={"/upload"}
                name="UPLOAD"
                setIsOpenMenu={setIsOpenMenu}
              />
              <Item
                url={"/profile"}
                name="PROFILE"
                setIsOpenMenu={setIsOpenMenu}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default HeaderMobile;
