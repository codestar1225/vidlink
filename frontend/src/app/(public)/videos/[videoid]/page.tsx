"use client";
import Loading from "@/app/_components/ui/loading";
import useVideo from "@/hooks/useVideo";
import { CardType } from "@/store";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
const VideoDesktop = dynamic(() => import("./_components/desktop"));
const VideoMobile = dynamic(() => import("./_components/mobile"));

export interface UserInfo {
  userName: string;
  totalVideos: number;
  like: boolean;
  owner: boolean;
}
export interface VideoInfo {
  title: string;
  videoLink: string;
  duration: number;
  userId: string;
  cards: CardType[];
}
export interface VideoType {
  videoLink: string;
  _id: string;
}

const Page = () => {
  const params = useParams();
  const videoId: string | undefined = Array.isArray(params.videoid)
    ? params.videoid[0]
    : params.videoid;
  const { getVideo, loading } = useVideo();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userName: "",
    totalVideos: 0,
    like: false,
    owner: false,
  });
  const [videoInfo, setVideoInfo] = useState<VideoInfo>({
    title: "",
    videoLink: "",
    duration: 0,
    userId: "",
    cards: [],
  });
  const [userVideos, setUserVideos] = useState<VideoType[]>([]);
  const [relatedVideos, setRelatedVideos] = useState<VideoType[]>([]);
  useEffect(() => {
    if (!videoId) return;
    const fetchFunc = async () => {
      const res = await getVideo(videoId);
      if (
        res.status === 200 &&
        "userInfo" in res &&
        "videoInfo" in res &&
        "userVideos" in res &&
        "relatedVideos" in res
      ) {
        setUserInfo(res.userInfo);
        setVideoInfo(res.videoInfo);
        setUserVideos(res.userVideos);
        setRelatedVideos(res.relatedVideos);
      }
    };
    fetchFunc();
  }, []);
  if (loading) return <Loading />;
  if (!videoInfo.videoLink) return <></>;
  return (
    <>
      {isMobile ? (
        <Suspense fallback={<Loading />}>
          <VideoMobile
            userInfo={userInfo}
            videoInfo={videoInfo}
            userVideos={userVideos}
            relatedVideos={relatedVideos}
            videoId={videoId}
          />
        </Suspense>
      ) : (
        <VideoDesktop />
      )}
    </>
  );
};
export default Page;
