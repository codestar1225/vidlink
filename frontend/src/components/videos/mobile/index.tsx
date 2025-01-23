"use client";
import { useEffect, useState } from "react";
import SubHeader from "./header";
import Item from "./item";
import videos1 from "./videos1.json";
import videos2 from "./videos2.json";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/mobile/header";
import Footer from "@/components/layout/mobile/footer";

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
  console.log(replace);
  return (
    <>
      <main className="h-svh">
        <Header />
        <SubHeader replace={replace} setReplace={setReplace} />
        <div className="w-svw overflow-scroll gap-x-[11px] gap-y-[15px] flex flex-wrap justify-center items-start">
          {videos.map((item, index) => (
            <Item
              name={item.editor}
              review={item.review}
              src={item.src}
              no={index + 1}
              key={index}
            />
          ))}
        </div>
        <Footer isFixed={true} />
      </main>
    </>
  );
};
export default VideosMobile;
