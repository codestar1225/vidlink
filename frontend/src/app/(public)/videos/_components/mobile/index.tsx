"use client";
import { useEffect, useState } from "react";
import SubHeader from "./header";
import videos1 from "./videos1.json";
import videos2 from "./videos2.json";
import { useRouter } from "next/navigation";
import Footer from "@/app/_components/layout/mobile/footer";
import Link from "next/link";
import VideoItem from "./videoItem";

interface Videos {
  editor: string;
  review: number;
  src: string;
}
const VideosMobile = () => {
  const [replace, setReplace] = useState<string>("you");
  const [videos, setVideos] = useState<Videos[]>([]);
  const router = useRouter();
  useEffect(() => {
    if (replace === "you") {
      setVideos(videos1);
    } else {
      setVideos(videos2);
    }
    router.refresh();
  }, [replace]);
  return (
    <>
      <main className="h-svh grid grid-col">
        <SubHeader replace={replace} setReplace={setReplace} />
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
              className="rounded-xl font-semibold text-[18px] py-[7px] px-[10px] bg-blue mt-[59.62px] mb-[109.23px] tracking-widest"
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
