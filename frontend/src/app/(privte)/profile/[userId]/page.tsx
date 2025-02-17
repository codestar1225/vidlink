"use client";
import { isMobile } from "react-device-detect";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { Suspense, useLayoutEffect, useState } from "react";
import useVideo from "@/hooks/useVideo";
import { UserInfoType } from "../page";
import Loading from "@/app/_components/ui/loading";
const ProfilesMobile = dynamic(() => import("./_components/mobile"));
const ProfilesDesktop = dynamic(() => import("./_components/desktop"));

export interface VideoType {
  videoLink: string;
  _id: string;
}
const Page = () => {
  const { getUserVideos, loading } = useVideo();
  const params = useParams();
  const userId: string | undefined = Array.isArray(params.userId)
    ? params.userId[0]
    : params.userId;
  const [userVideos, setUserVideos] = useState<VideoType[]>([]);
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
    email: "",
  });
  const [followStatus, setFollowStatus] = useState<boolean>(false);
  useLayoutEffect(() => {
    if (!userId) return;
    const fetchVideos = async () => {
      const res = await getUserVideos(userId);
      if (res.status === 200 && "userVideos" in res && "userInfo" in res) {
        setUserVideos(res.userVideos);
        setUserInfo(res.userInfo);
        setFollowStatus(res.followStatus);
      }
    };
    fetchVideos();
  }, []);
  if (loading) return <Loading />;
  return (
    <>
      {isMobile ? (
        <Suspense fallback={<Loading />}>
          <ProfilesMobile
            setFollowStatus={setFollowStatus}
            userVideos={userVideos}
            userInfo={userInfo}
            followStatus={followStatus}
          />
        </Suspense>
      ) : (
        <ProfilesDesktop />
      )}
    </>
  );
};
export default Page;
