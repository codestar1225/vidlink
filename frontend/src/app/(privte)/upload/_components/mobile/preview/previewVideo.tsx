"use client";
import { CardType } from "@/store";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

interface Type {
  cards: CardType[];
  videoLink: string | null;
  isSelected: number;
  signal: boolean;
}

const PreviewVideo: React.FC<Type> = ({
  cards,
  videoLink,
  isSelected,
  signal,
}) => {
  const videoRef = useRef<ReactPlayer>(null);
  const [start, setStart] = useState<number>(0);
  const maxTime = Number(process.env.NEXT_PUBLIC_MAX_TIME || 240);

  useEffect(() => {
    const displayCard = cards.find((card) => card.no === isSelected);
    if (displayCard) {
      videoRef.current?.seekTo(displayCard.start, "seconds");
      videoRef.current?.getInternalPlayer().pause();
    }
  }, [isSelected, signal]);

  const onProgress = () => {
    if (!videoRef.current) return;
    let current_time = Math.floor(videoRef.current.getCurrentTime());
    if (current_time > maxTime) {
      videoRef.current?.seekTo(0, "seconds");
      setStart(0);
      alert("You can't select any further. The maximum time is 4 minutes.");
    } else {
      setStart(current_time);
    }
  };

  return (
    <>
      {/* title */}
      <div className="flex justify-between items-center px-[15px] w-full pb-[10px]">
        <h1 className="text-[14px] font-normal ">
          <span className="text-blue">WHERE SHE GOES</span>
          &nbsp;- BAD BUNNY
        </h1>
        <div className="flex gap-[13px] items-center">
          <button>
            <img src="/icon/detail/heart.svg" alt="" />
          </button>
          <button>
            <img src="/icon/detail/forward.svg" alt="" />
          </button>
        </div>
      </div>
      {videoLink ? (
        <div className="h-[225.42px] rounded-[7.36px] overflow-hidden">
          <ReactPlayer
            ref={videoRef}
            url={videoLink}
            preload="auto"
            controls
            onProgress={onProgress}
            progressInterval={100}
            width="100%"
            height="100%"
          />
        </div>
      ) : (
        <>No video file.</>
      )}

      {/* detail */}
      <div className="h-[72.58px] w-full relative flex items-center justify-center">
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
          <img src="/icon/detail/heart.svg" alt="" />
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
      </div>
    </>
  );
};
export default PreviewVideo;
