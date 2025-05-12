"use client";
import Loading from "@/app/_components/ui/loading";
import useVideo from "@/hooks/useVideo";
import { videoIdAtom } from "@/store";
import { useAtom } from "jotai";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
const VideoDesktop = dynamic(() => import("./_components/desktop"));
const VideoMobile = dynamic(() => import("./_components/mobile"));

export interface UserInfo {
  userName: string;
  picture: string;
  totalVideos: number;
  like: boolean;
  owner: boolean;
}
export interface CardT {
  _id: string;
  link: string;
  name: string;
  // icon: string;
  start: number;
  no: number;
  isSaved: boolean;
}
export interface VideoInfo {
  title: string;
  videoLink: string;
  duration: number;
  userId: string;
  cards: CardT[];
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
    picture: "",
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
  const [followStatus, setFollowStatus] = useState<boolean>(false);
  const [, setVideoId] = useAtom<string>(videoIdAtom);
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
        setFollowStatus(res.followStatus);
        setVideoId(videoId);
      } else {
        alert(res.message);
      }
    };
    fetchFunc();
  }, []);
  if (loading || videoInfo.cards.length < 1) return <Loading />;
  if (!videoInfo.videoLink) return <></>;
  return (
    <>
      {isMobile ? (
        <Suspense fallback={<Loading />}>
          <VideoMobile
            setFollowStatus={setFollowStatus}
            userInfo={userInfo}
            videoInfo={videoInfo}
            userVideos={userVideos}
            relatedVideos={relatedVideos}
            videoId={videoId}
            followStatus={followStatus}
          />
        </Suspense>
      ) : (
        <VideoDesktop />
      )}
    </>
  );
};
export default Page;
