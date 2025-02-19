"use client";
import { CardType } from "@/store";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

interface Type {
  setCurrentTime(value: number): void;
  cards: CardType[];
  videoLink: string | null;
  isSelected: number;
  signal: boolean;
  handleLike(): void;
  title: string;
  userName: string;
  like: boolean;
}

const PreviewVideo: React.FC<Type> = ({
  setCurrentTime,
  cards,
  videoLink,
  isSelected,
  signal,
  handleLike,
  title,
  userName,
  like,
}) => {
  const videoRef = useRef<ReactPlayer>(null);
  const maxTime = Number(process.env.NEXT_PUBLIC_MAX_TIME || 240);
  const [isReady, setIsReady] = useState<boolean>(false);
  // got to the selected card start time
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seekTo(isSelected, "seconds");
      videoRef.current.getInternalPlayer()?.pause();
    }
  }, [isSelected, signal]);

  const onProgress = () => {
    if (!videoRef.current) return;
    let currentTime = Math.floor(videoRef.current.getCurrentTime());
    if (currentTime > maxTime) {
      // videoRef.current?.seekTo(0, "seconds");
      // alert("You can't see any further. The maximum time is 4 minutes.");
    } else {
      setCurrentTime(currentTime);
    }
  };
  const onSeek = () => {
    if (!videoRef.current) return;
    let currentTime = Math.floor(videoRef.current.getCurrentTime());
    if (currentTime > maxTime) {
      // videoRef.current?.seekTo(0, "seconds");
      // alert("You can't select any further. The maximum time is 4 minutes.");
    } else {
      setCurrentTime(currentTime);
    }
  };
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seekTo(cards[0].start, "seconds");
    }
  }, [isReady]);

  return (
    <>
      {/* title */}
      <div className="flex justify-between items-center px-[15px] w-full pb-[10px]">
        <h1 className="text-[14px] font-semibold ">
          <span className="text-blue">{title.toUpperCase()}</span>
          &nbsp;- {userName.toUpperCase()}
        </h1>
        <div className="flex gap-[13px] items-center">
          <button onClick={handleLike}>
            {like ? (
              <img src="/icon/detail/blueHeart.png" alt="" />
            ) : (
              <img src="/icon/detail/whiteHeart.png" alt="" />
            )}
          </button>
          <button>
            <img src="/icon/detail/forward.svg" alt="" />
          </button>
        </div>
      </div>
      {videoLink ? (
        <div className=" h-[225.42px] rounded-[7.36px] overflow-hidden">
          <ReactPlayer
            ref={videoRef}
            url={videoLink}
            preload="auto"
            controls
            onProgress={onProgress}
            onSeek={onSeek}
            onReady={() => setIsReady(true)}
            progressInterval={100}
            width="100%"
            height="100%"
          />
        </div>
      ) : (
        <div className="h-[225.42px] flex items-center justify-center">
          No video file.
        </div>
      )}
    </>
  );
};
export default PreviewVideo;
