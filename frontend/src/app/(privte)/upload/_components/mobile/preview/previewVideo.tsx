"use client";
import { CardType } from "@/store";
import { setItem } from "@/utils/localstorage";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

interface Type {
  setCurrentTime(value: number): void;
  setEdit(value: string): void;
  cards: CardType[];
  videoLink: string | null;
  isSelected: number;
  signal: boolean;
  userName: string;
  title: string;
}

const PreviewVideo: React.FC<Type> = ({
  setCurrentTime,
  setEdit,
  cards,
  videoLink,
  isSelected,
  signal,
  userName,
  title,
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
    const currentTime = Math.floor(videoRef.current.getCurrentTime());
    if (currentTime > maxTime) {
      videoRef.current?.seekTo(0, "seconds");
      videoRef.current.getInternalPlayer()?.pause();
      alert("You can't see any further. The maximum time is 4 minutes.");
    } else {
      setCurrentTime(currentTime);
    }
  };
  const onSeek = () => {
    if (!videoRef.current) return;
    const currentTime = Math.floor(videoRef.current.getCurrentTime());
    if (currentTime > maxTime) {
      videoRef.current?.seekTo(0, "seconds");
      videoRef.current.getInternalPlayer()?.pause();
      alert("You can't select any further. The maximum time is 4 minutes.");
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
      <h1 className="text-[9px] mb-[25px]">PREVIEW</h1>
      <div className="flex justify-between items-center px-[15px] w-full pb-[10px]">
        <h1 className="text-[14px] font-normal ">
          <span className="text-blue">{title.toUpperCase()}</span>
          &nbsp;- {userName.toUpperCase()}
        </h1>
        <div className="flex gap-[13px] items-center">
          <button>
            <img src="/icon/detail/whiteHeart.png" alt="" />
          </button>
          <button>
            <img src="/icon/detail/forward.svg" alt="" />
          </button>
        </div>
      </div>
      {videoLink ? (
        <div className="h-[225.42px] w-full rounded-[7.36px] overflow-hidden">
          <ReactPlayer
            ref={videoRef}
            url={videoLink}
            preload="auto"
            controls
            onProgress={onProgress}
            onSeek={onSeek}
            onReady={() => setIsReady(true)}
            progressInterval={1000}
            width="100%"
            height="100%"
            config={{
              file: {
                attributes: {
                  playsInline: true,
                  style: {
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  },
                },
              },
            }}
          />
        </div>
      ) : (
        <div className="h-[225.42px] flex items-center justify-center">
          No video file.
        </div>
      )}

      {/* detail */}
      <div className="h-[72.58px] w-full relative flex items-center justify-center">
        {/* <div className="absolute left-[11px] top-[10.6px] flex gap-[12px]"> */}
        <div className=" absolute left-1/2 -translate-x-1/2 top-[10.6px] flex gap-[12px]">
          <div className="flex flex-col items-center gap-[5px]">
            <h1 className="text-[8px] font-semibold">CARDS</h1>
            <button className="border-[1.43px] w-[43px] h-[34px] rounded-[4.76px] text-center">
              {cards.length < 10 ? `0${cards.length}` : cards.length}
            </button>
          </div>
          <div className="flex flex-col items-center gap-[5px]">
            <h1 className="text-[8px] font-semibold">ADD MORE</h1>
            <button
              onClick={() => {
                setEdit("add");
                setItem("editStatus", "add");
              }}
              className="border-[1.43px] w-[43px] h-[34px] rounded-[4.76px] flex justify-center items-center"
            >
              <img src="/icon/detail/card/plus.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default PreviewVideo;
