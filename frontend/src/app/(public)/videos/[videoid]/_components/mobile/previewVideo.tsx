"use client";
import useVideo from "@/hooks/useVideo";
import { CardType } from "@/store";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useBeforeUnload } from "react-use";

interface Type {
  setCurrentTime(value: number): void;
  handleLike(): void;
  cards: CardType[];
  videoLink: string | null;
  isSelected: number;
  signal: boolean;
  title: string;
  userName: string;
  like: boolean;
  videoId: string;
}

const PreviewVideo: React.FC<Type> = ({
  setCurrentTime,
  handleLike,
  cards,
  videoLink,
  isSelected,
  signal,
  title,
  userName,
  like,
  videoId,
}) => {
  const { watchTime } = useVideo();
  const videoRef = useRef<ReactPlayer>(null);
  const maxTime = Number(process.env.NEXT_PUBLIC_MAX_TIME || 240);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [watchingTime, setWatchingTime] = useState<number>(0);
  const [lastTime, setLastTime] = useState<number>(0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);

  // got to the selected card start time
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seekTo(isSelected, "seconds");
      videoRef.current.getInternalPlayer()?.pause();
    }
  }, [isSelected, signal]);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seekTo(cards[0].start, "seconds");
    }
  }, [isReady]);

  const onProgress = () => {
    if (!videoRef.current || isSeeking) return;
    const currentTime = Math.floor(videoRef.current.getCurrentTime());
    if (currentTime <= maxTime) {
      //measuring the watching time.
      if (currentTime > lastTime) {
        setWatchingTime((prev) => prev + (currentTime - lastTime));
      }
      setLastTime(currentTime);
      setCurrentTime(currentTime);
    }
  };
  const onSeek = () => {
    if (!videoRef.current) return;
    const currentTime = Math.floor(videoRef.current.getCurrentTime());
    if (currentTime > maxTime) {
      // videoRef.current?.seekTo(0, "seconds");
      // alert("You can't select any further. The maximum time is 4 minutes.");
    } else {
      setIsSeeking(true);
      setLastTime(currentTime);
      setCurrentTime(currentTime);
    }
  };
  const onSeekEnd = () => {
    setIsSeeking(false);
  };

   const handleWatchTime = () => {
    if (!videoId || !watchingTime) return;
    watchTime(watchingTime, videoId); // ✅ Your required function
  };
  // Detects when the user tries to close, refresh, or navigate away
  useBeforeUnload(() => {
    handleWatchTime();
    setWatchingTime(0);
    return true;
  });
  useEffect(() => {
    return () => {
      // Ensures the function runs when the component unmounts
      handleWatchTime();
    };
  }, []);

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
            onPause={onSeekEnd} // ✅ Detects when seeking stops
            onPlay={onSeekEnd} // ✅ Also resets when the user starts playing again
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
