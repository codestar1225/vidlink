"use client";
import Footer from "@/app/_components/layout/mobile/footer";
import Card from "@/app/(public)/videos/[videoid]/_components/mobile/card/card";
import CardNext from "@/app/(public)/videos/[videoid]/_components/mobile/card/cardNext";
import UserVideo from "./userVideo";
import RelatedVideo from "./relatedVideo";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { tokenAtom } from "@/store";
import useAuth from "@/hooks/useAuth";
import SettingBar from "./settingBar";
import VideoFrame from "./videoFrame";
import HeaderTitle from "./headerTitle";

const VideoMobile = ({ id }: { id: string }) => {
  const [token] = useAtom<string>(tokenAtom);
  const { verifyToken } = useAuth();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const result = await verifyToken();
      setIsAuth(result);
    };
    checkAuth();
  }, [token, router]);

  const handleLike = () => {
    if (!isAuth) {
      router.push("/signin");
    }
  };

  return (
    <>
      <div className="min-h-screen  pt-[110px] pb-[50px] w-svw flex flex-col items-center">
        <HeaderTitle handleLike={handleLike} />
        <VideoFrame />
        <SettingBar isAuth={isAuth} handleLike={handleLike} />
        <div className="flex justify-center w-full px-[10px]">
          <ul className="flex gap-[6px] justify-start w-full">
            <CardNext />
            <Card name="song" time="0:01" />
          </ul>
        </div>
      </div>
      <UserVideo />
      <RelatedVideo />
      <div className="w-svw flex justify-center">
        <Link
          href={"/videos"}
          className="border-[1.5px] border-white rounded-[3.2px] text-[14.91px] pt-[3.2px] pb-[1.3px] px-[2.13px] mt-[94.5px] mb-[132.6px]"
        >
          ALL VIDEOS
        </Link>
      </div>
      <Footer isFixed={true} />
    </>
  );
};
export default VideoMobile;
