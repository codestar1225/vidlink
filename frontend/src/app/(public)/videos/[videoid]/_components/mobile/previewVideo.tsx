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
          &nbsp;- {userName}
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

      {/* detail */}
      {/* <div className="h-[72.58px] w-full relative flex items-center justify-center">
        <div className="absolute top-[18.6px] left-[11px] flex gap-[10.3px] items-start">
          <img src="/icon/detail/avatar.svg" alt="" />
          <div className="flex flex-col h-[38.3px] justify-between items-start">
            <div className="text-[12px] text-blue font-semibold ">USERNAME</div>
            <div className="text-[8px] font-semibold border-[0.41px] rounded-[1.24px] px-[0.82px]">
              FOLLOW
            </div>
          </div>
        </div>
        <button className=" pl-[12px] pt-[4px]">
          <img src="/icon/detail/whiteHeart.png" alt="" />
        </button>
        <div className=" absolute right-[9.23px] top-[10.6px] flex gap-[12px]">
          <div className="flex flex-col items-center gap-[5px]">
            <h1 className="text-[8px] font-semibold">CARDS</h1>
            <button className="border-[1.43px] w-[43px] h-[34px] rounded-[4.76px] text-center">
              {cards.length < 10 ? `0${cards.length}` : cards.length}
            </button>
          </div>
          <div className="flex flex-col items-center gap-[5px]">
            <h1 className="text-[8px] font-semibold">SUGGEST</h1>
            <button className="border-[1.43px] w-[43px] h-[34px] rounded-[4.76px] flex justify-center items-center">
              <img src="/icon/detail/card/plus.svg" alt="" />
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
};
export default PreviewVideo;
