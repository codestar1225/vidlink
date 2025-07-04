"use client";
import Loading from "@/app/_components/ui/loading";
import useVideo from "@/hooks/useVideo";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
const VideosDesktop = dynamic(() => import("./_components/desktop"));
const VideosMobile = dynamic(() => import("./_components/mobile"));

export type Video = {
  videoLink: string;
  views: number;
  card: number;
  title: string;
  user: { _id: string; userName: string; picture: string };
  _id: string;
};
const Page = () => {
  const [allVideos, setAllVideos] = useState<Video[]>([]);
  const [followingVideos, setFollowingVideos] = useState<Video[]>([]);
  const { getVideos, loading } = useVideo();
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await getVideos();
      if (
        res.status === 200 &&
        "allVideos" in res &&
        "followingVideos" in res
      ) {
        setAllVideos(res.allVideos || []);
        setFollowingVideos(res.followingVideos || []);
        return;
      } else if ("allVideos" in res) {
        setAllVideos(res.allVideos || []);
      } else {
        alert(res.message);
      }
    };
    fetchVideos();
  }, []);
  if (loading) return <Loading />;
  return (
    <>
      {isMobile ? (
        <VideosMobile followingVideos={followingVideos} allVideos={allVideos} />
      ) : (
        <VideosDesktop />
      )}
    </>
  );
};

export default Page;
