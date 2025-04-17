"use client";
import useVideo from "@/hooks/useVideo";
import { CardType, watchTimeAtom } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
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
  const [watchingTime, setWatchingTime] = useAtom<number>(watchTimeAtom);
  const [lastTime, setLastTime] = useState<number>(0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const router = useRouter();
  // got to the selected card start time
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seekTo(isSelected, "seconds");
      videoRef.current.getInternalPlayer()?.pause();
    }
  }, [isSelected, signal]);
  // go to the first card start time.
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seekTo(cards[0].start, "seconds");
      setWatchingTime(0);
      setLastTime(cards[0].start);
    }
    router.refresh();
  }, [isReady]);

  const onProgress = () => {
    if (!videoRef.current) return;
    const currentTime = Math.floor(videoRef.current.getCurrentTime());
    if (currentTime < maxTime) {
      //measuring the watching time.
      if (currentTime > lastTime && !isSeeking) {
        setWatchingTime((prev) => prev + (currentTime - lastTime));
      }
      setLastTime(currentTime);
      setCurrentTime(currentTime);
    } else {
      videoRef.current?.seekTo(0, "seconds");
      videoRef.current.getInternalPlayer()?.pause();
      alert("You can't see any further. The maximum time is 4 minutes.");
    }
  };
  const onSeek = () => {
    if (!videoRef.current) return;
    const currentTime = Math.floor(videoRef.current.getCurrentTime());
    if (currentTime > maxTime) {
      // videoRef.current?.seekTo(0, "seconds");
      videoRef.current.getInternalPlayer().pause();
      alert("You can't select any further. The maximum time is 4 minutes.");
    } else {
      setLastTime(currentTime);
      setCurrentTime(currentTime);
      if (watchingTime) {
        setIsSeeking(true);
      }
    }
  };
  const onSeekEnd = () => {
    setIsSeeking(false);
  };

  const handleWatchTime = async () => {
    if (!videoId || !watchingTime) return;
    watchTime(watchingTime, videoId); // ✅ Your required function
  };
  // Detects when the user tries to close, refresh, or navigate away
  useBeforeUnload(() => {
    handleWatchTime();
    setWatchingTime(0);
    return true;
  });

  return (
    <>
      {/* title */}
      <div className="flex justify-between items-center px-[15px] w-full pb-[10px]">
        <h1 className="text-[14px] font-semibold w-[85%] ">
          <span className="text-blue">{title.toUpperCase()}</span>
          &nbsp;- {userName.toUpperCase()}
        </h1>
        <div className="flex gap-[13px] items-center">
          <button onClick={handleLike}>
            {like ? (
              <img
                className="size-[20px]"
                src="/icon/detail/blueHeart.png"
                alt=""
              />
            ) : (
              <img
                className="size-[20px]"
                src="/icon/detail/whiteHeart.png"
                alt=""
              />
            )}
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
            progressInterval={100}
            width="100%"
            height="100%"
            onPause={onSeekEnd} // ✅ Detects when seeking stops
            onPlay={onSeekEnd} // ✅ Also resets when the user starts playing again
            config={{
              file: {
                attributes: {
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
    </>
  );
};
export default PreviewVideo;
