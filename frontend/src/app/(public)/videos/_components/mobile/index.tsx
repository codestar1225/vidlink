"use client";
import { Suspense, useEffect, useState } from "react";
import SubHeaderIn from "./subHeaders/subHeaderIn";
import Footer from "@/app/_components/layout/mobile/footer";
import Link from "next/link";
import SubHeaderOut from "./subHeaders/subHeaderOut";
import useVerifyAuth from "@/hooks/useVerifyAuth";
import Loading from "@/app/_components/ui/loading";
import dynamic from "next/dynamic";
import { Video } from "../../page";
const Videos = dynamic(() => import("./videos"));

interface Type {
  followingVideos: Video[];
  allVideos: Video[];
}

const VideosMobile: React.FC<Type> = ({ followingVideos, allVideos }) => {
  const [nav, setNav] = useState<string>("you");
  const [videos, setVideos] = useState<Video[]>([]);
  const [isSearch, setIsSearch] = useState<string>("");

  useEffect(() => {
    if (nav === "you") {
      setVideos(allVideos);
    } else {
      setVideos(followingVideos);
    }
  }, [nav]);

  useEffect(() => {
    const key = isSearch.trim().toLowerCase();
    const videosToFilter = nav === "you" ? allVideos : followingVideos;
    const filteredVideos = videosToFilter.filter(
      (video) =>
        video.totalView.toString().toLowerCase().includes(key) ||
        video.videoLink.toLowerCase().includes(key) ||
        video.user.username.toLowerCase().includes(key)
    );
    setVideos(filteredVideos);
  }, [isSearch, nav]);

  const { loading, isAuth } = useVerifyAuth();

  if (loading) return <Loading />;
  return (
    <>
      <main className="">
        {isAuth ? (
          <SubHeaderIn
            setNav={setNav}
            setIsSearch={setIsSearch}
            nav={nav}
            isSearch={isSearch}
          />
        ) : (
          <SubHeaderOut />
        )}
        <div className=" overflow-y-scroll fixed top-[202px] bottom-0">
          <Suspense fallback={<Loading />}>
            {nav == "you" ? (
              <Videos videos={videos} />
            ) : (
              <Videos videos={videos} />
            )}
          </Suspense>
          <div className="w-svw flex justify-center">
            <Link
              href={"/videos"}
              className={`${
                isAuth ? "bg-blue" : "bg-none"
              } rounded-xl font-semibold text-[18px] py-[7px] px-[10px] mt-[59.62px] mb-[109.23px] tracking-widest`}
            >
              VIEW MORE
            </Link>
          </div>
        </div>
        <Footer isFixed={true} />
      </main>
    </>
  );
};
export default VideosMobile;
