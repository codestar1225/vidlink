"use client";
import Loading from "@/app/_components/ui/loading";
import useVideo from "@/hooks/useVideo";
import { CardType } from "@/store";
import dynamic from "next/dynamic";
import { Suspense, useLayoutEffect, useState } from "react";
import { isMobile } from "react-device-detect";
const ProfileMobile = dynamic(() => import("./_components/mobile"));
const ProfileDesktop = dynamic(() => import("./_components/desktop"));

export type UserInfoType = {
  _id: string;
  userName: string;
  picture: string;
  followers: number;
  totalVideos: number;
  totalCards: number;
  instagram: string;
  tiktok: string;
  youtube: string;
  linkedin: string;
  email?: string;
};
export type VideoType = {
  videoLink: string;
  _id: string;
  title?: string;
  cards?: CardType[];
};

const Page = () => {
  const { loading, getMyVideos } = useVideo();
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    _id: "",
    userName: "",
    picture: "",
    followers: 0,
    totalVideos: 0,
    totalCards: 0,
    instagram: "",
    tiktok: "",
    youtube: "",
    linkedin: "",
  });
  const [myVideos, setMyVideos] = useState<VideoType[]>([]);
  const [myLikesVideos, setMyLikesVideos] = useState<VideoType[]>([]);
  useLayoutEffect(() => {
    async function fetchMyVideos() {
      const res = await getMyVideos();
      if (
        res.status === 200 &&
        "userInfo" in res &&
        "myVideos" in res &&
        "myLikesVideos" in res
      ) {
        setMyVideos(res.myVideos);
        setMyLikesVideos(res.myLikesVideos);
        setUserInfo(res.userInfo);
      }
    }
    fetchMyVideos();
  }, []);
  if (loading) return <Loading />;
  return (
    <>
      {isMobile ? (
        <Suspense fallback={<Loading />}>
          <ProfileMobile
            myVideos={myVideos}
            myLikesVideos={myLikesVideos}
            userInfo={userInfo}
          />
        </Suspense>
      ) : (
        <ProfileDesktop />
      )}
    </>
  );
};
export default Page;
