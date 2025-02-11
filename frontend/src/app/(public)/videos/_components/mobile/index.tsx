"use client";
import { Suspense, useEffect, useState } from "react";
import SubHeaderIn from "./subHeaderIn";
import videos1 from "./videos1.json";
import videos2 from "./videos2.json";
import { useRouter } from "next/navigation";
import Footer from "@/app/_components/layout/mobile/footer";
import Link from "next/link";
import SubHeaderOut from "./subHeaderOut";
import useVerifyAuth from "@/hooks/useVerifyAuth";
import Loading from "@/app/_components/ui/loading";
import dynamic from "next/dynamic";
const Videos = dynamic(() => import("./videos"));
export interface Videos {
  editor: string;
  review: number;
  src: string;
}
const VideosMobile = () => {
  const [nav, setNav] = useState<string>("you");
  const [videos, setVideos] = useState<Videos[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (nav === "you") {
      setVideos(videos1);
    } else {
      setVideos(videos2);
    }
    router.refresh();
  }, [nav]);

  const { loading, isAuth } = useVerifyAuth();

  return (
    <>
      <main className="h-svh grid grid-col">
        {loading ? (
          <div className="h-[89.58px] mt-[103px]"></div>
        ) : isAuth ? (
          <SubHeaderIn nav={nav} setNav={setNav} />
        ) : (
          <SubHeaderOut />
        )}
        <div className="w-svw overflow-scroll">
          <Suspense fallback={<Loading />}>
            <Videos videos={videos} />{" "}
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
