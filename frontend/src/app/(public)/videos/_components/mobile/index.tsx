"use client";
import { useEffect, useState } from "react";
import SubHeaderIn from "./subHeaderIn";
import videos1 from "./videos1.json";
import videos2 from "./videos2.json";
import { useRouter } from "next/navigation";
import Footer from "@/app/_components/layout/mobile/footer";
import Link from "next/link";
import VideoItem from "./videoItem";
import { useAtom } from "jotai";
import { tokenAtom } from "@/store";
import SubHeaderOut from "./subHeaderOut";
import useAuth from "@/hooks/useAuth";

interface Videos {
  editor: string;
  review: number;
  src: string;
}
const VideosMobile = () => {
  const [replace, setReplace] = useState<string>("you");
  const [videos, setVideos] = useState<Videos[]>([]);
  const router = useRouter();
  const [token, setToken] = useAtom<string>(tokenAtom);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { verifyToken } = useAuth();

  useEffect(() => {
    if (replace === "you") {
      setVideos(videos1);
    } else {
      setVideos(videos2);
    }
    router.refresh();
  }, [replace]);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const result = await verifyToken();
      setIsAuth(result);
      setLoading(false);
    };
    checkAuth();
  }, [token, router]);

  return (
    <>
      <main className="h-svh grid grid-col">
        {loading ? (
          <div className="h-[70px] mt-[103px]"></div>
        ) : isAuth ? (
          <SubHeaderIn replace={replace} setReplace={setReplace} />
        ) : (
          <SubHeaderOut />
        )}
        <div className="w-svw overflow-scroll">
          <ul className=" gap-x-[11px] gap-y-[15px] flex flex-wrap justify-center items-start">
            {videos.map((item, index) => (
              <VideoItem
                name={item.editor}
                review={item.review}
                src={item.src}
                no={index + 1}
                key={index}
              />
            ))}
          </ul>
          <div className="w-svw flex justify-center">
            <Link
              href={"/videos"}
              className={`${isAuth?'bg-blue':'bg-none'} rounded-xl font-semibold text-[18px] py-[7px] px-[10px] mt-[59.62px] mb-[109.23px] tracking-widest`}
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
