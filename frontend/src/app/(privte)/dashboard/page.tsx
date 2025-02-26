"use client";
import { isMobile } from "react-device-detect";
import dynamic from "next/dynamic";
import useVideo from "@/hooks/useVideo";
import { useLayoutEffect, useState } from "react";
import Loading from "@/app/_components/ui/loading";
const DashboardMobile = dynamic(() => import("./_components/mobile"));
const DashboardDesktop = dynamic(() => import("./_components/desktop"));

export interface UserInfoType {
  picture: string;
  gainedFollowers: number;
  lostFollowers: number;
  cardsClicks: number;
  savedCards: number;
}
export interface VideoType {
  title: string;
  views: number;
  likes: number;
  card: number;
  watchTime: number;
}
export interface CardType {
  title: string;
  name: string;
  clicks: number;
  saved: number;
  link: string;
  no: number;
}
const Page = () => {
  const { getDataCreator, loading } = useVideo();
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [cards, setCards] = useState<CardType[]>([]);
  useLayoutEffect(() => {
    (async () => {
      const res = await getDataCreator("year");
      if (
        res.status === 200 &&
        "userInfo" in res &&
        "videos" in res &&
        "cards" in res
      ) {
        setUserInfo(res.userInfo);
        setVideos(res.videos);
        setCards(res.cards);
      }
    })();
  }, []);
  if (loading) return <Loading />;
  return (
    <>
      {isMobile ? (
        <DashboardMobile
          setUserInfo={setUserInfo}
          setVideos={setVideos}
          setCards={setCards}
          userInfo={userInfo}
          videos={videos}
          cards={cards}
        />
      ) : (
        <DashboardDesktop />
      )}
    </>
  );
};
export default Page;
