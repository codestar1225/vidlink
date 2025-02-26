"use client";
import { VideoType } from "@/app/(privte)/dashboard/page";
import AmountItem from "../../amountItem";
import Table from "./table";
import { useEffect, useState } from "react";
import WatchTimeItem from "./watchTimeItem";

interface Type {
  videos: VideoType[];
}
const Videos: React.FC<Type> = ({ videos }) => {
  const [views, setViews] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);
  const [watchTime, setWatchTime] = useState<number>(0);
  useEffect(() => {
    let likes = 0;
    let views = 0;
    let watchTime = 0;
    for (let i = 0; i < videos.length; i++) {
      likes += videos[i].likes;
      views += videos[i].views;
      watchTime += videos[i].watchTime;
    }
    setLikes(likes);
    setViews(views);
    setWatchTime(watchTime);
  }, [videos]);
  return (
    <div className="mt-[15px] flex flex-col gap-[12px]">
      <div className="flex gap-[8.5px]">
        <AmountItem name="VIDEOS" src="videos" value={videos.length} />
        <AmountItem name="LIKES" src="likes" value={likes} />
      </div>
      <Table videos={videos} />
      {/* <div className="flex gap-[8.5px]"> */}
      <AmountItem name="TOTAL VIDEO VIEWS" src="views" value={views} />
      <WatchTimeItem name="TOTAL WATCH TIME" src="" watchTime={watchTime} />
      {/* </div> */}
    </div>
  );
};
export default Videos;
