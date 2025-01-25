"use client";
import { useEffect, useState } from "react";
import SubHeader from "./header";
import Item from "./item";
import videos1 from "./videos1.json";
import videos2 from "./videos2.json";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/mobile/header";
import Footer from "@/components/layout/mobile/footer";
import Link from "next/link";

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
        <Header />
        <SubHeader replace={replace} setReplace={setReplace} />
        <ul className="w-svw overflow-scroll gap-x-[11px] gap-y-[15px] flex flex-wrap justify-center items-start">
          {videos.map((item, index) => (
            <Item
              name={item.editor}
              review={item.review}
              src={item.src}
              no={index + 1}
              key={index}
            />
          ))}
          <div className="w-svw flex justify-center">
            <Link
              href={"/videos"}
              className="border-[1.5px] dark:border-white border-black rounded-[3.2px] text-[14.91px] pt-[3.2px] pb-[1.5px] px-[2.13px] mt-[59.62px] mb-[109.23px]"
            >
              ALL VIDEOS
            </Link>
          </div>
        </ul>
        <Footer isFixed={true} />
      </main>
    </>
  );
};
export default VideosMobile;
