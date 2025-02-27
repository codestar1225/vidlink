"use client";
import Card from "./card";
import { VideoType } from "../../../page";
import { useState } from "react";
import InfiniteScrolling from "@/app/_components/ui/infinitScrolling";
interface Type {
  myVideos: VideoType[];
  userName?: string | null;
}
const Cards: React.FC<Type> = ({ myVideos, userName }) => {
  const [displayedVideos, setDisplayedVideos] = useState<VideoType[]>(
    myVideos?.slice(0, 10)
  );
  const [hasMore, setHasMore] = useState<boolean>(myVideos.length > 10); // Check if more videos exist

  const loadMoreVideos = () => {
    const nextVideos = myVideos.slice(
      displayedVideos.length,
      displayedVideos.length + 10
    );
    setDisplayedVideos((prev) => [...prev, ...nextVideos]);
    setHasMore(displayedVideos.length + nextVideos.length < myVideos.length);
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="text-[14px] font-normal flex flex-col gap-[15px] w-[379.1px] max-[401px]:w-[251px] mt-[48px]">
          <InfiniteScrolling
            next={loadMoreVideos}
            dataLength={displayedVideos.length}
            hasMore={hasMore}
          >
            {displayedVideos?.map((item, index) => (
              <div key={index}>
                <h1>
                  <span className=" text-blue font-semibold ">
                    {item.title && item.title?.toUpperCase()}
                  </span>{" "}
                  - {userName?.toUpperCase() || ""}
                </h1>

                <ul className="flex flex-wrap justify-start gap-x-[5.9px] gap-y-[7.24px] mt-[13px]">
                  {item.cards?.map((item, index) => (
                    <Card
                      name={item.name}
                      link={item.link}
                      icon={item.icon}
                      isSaved={item.isSaved}
                      start={item.start}
                      no={index + 1}
                      _id={item._id}
                      key={index}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </InfiniteScrolling>
        </div>
      </div>
    </>
  );
};
export default Cards;
