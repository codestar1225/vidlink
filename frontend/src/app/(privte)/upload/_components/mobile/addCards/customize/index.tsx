"use client";
import { useRef, useState } from "react";
import lucideIcons from "@/../public/lucideIcon.json";
import SetIcon from "./setIcon";
import * as LucideIcons from "lucide-react";
import useClickOutside from "@/hooks/useClickOutside";
import ReactPlayer from "react-player";

interface Type {
  setLink(value: string): void;
  setName(value: string): void;
  setIcon(value: string): void;
  setStart(value: number): void;
  link: string;
  name: string;
  start: number;
  icon: string;
  isSaved: boolean;
  duration: number;
  videoLink: string | null;
}

const Index: React.FC<Type> = ({
  setLink,
  setName,
  setIcon,
  setStart,
  icon,
  link,
  name,
  start,
  duration,
  videoLink,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<ReactPlayer>(null);
  const [iconSearch, setIconSearch] = useState<string>("");
  const maxTime = Number(process.env.NEXT_PUBLIC_MAX_TIME || 240);

  // Filter icons from the JSON based on the input (case insensitive)
  const matchingIcons = lucideIcons
    .filter(
      (key) =>
        iconSearch && key.toLowerCase().includes(iconSearch.toLowerCase())
    )
    .map((key) =>
      key
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("")
    );

  const IconComponent = LucideIcons[
    icon as keyof typeof LucideIcons
  ] as React.ComponentType<React.SVGProps<SVGSVGElement>>;

  // Close the menu if the click is outside
  useClickOutside(listRef as React.RefObject<HTMLElement>, () =>
    setIconSearch("")
  );

  //video time capture
  const onProgress = () => {
    if (!videoRef.current) return;
    let currentTime = Math.floor(videoRef.current.getCurrentTime());
    if (currentTime > maxTime) {
      videoRef.current?.seekTo(maxTime, "seconds");
      videoRef.current?.getInternalPlayer().pause();
      setStart(maxTime);
      alert("You can't see any further. The maximum time is 4 minutes.");
    } else {
      setStart(currentTime);
    }
  };

  const onSeek = () => {
    if (!videoRef.current) return;
    let currentTime = Math.floor(videoRef.current.getCurrentTime());
    if (currentTime > maxTime) {
      videoRef.current?.seekTo(maxTime, "seconds");
      videoRef.current?.getInternalPlayer().pause();
      setStart(maxTime);
      alert("You can't select any further. The maximum time is 4 minutes.");
    } else {
      setStart(currentTime);
    }
  };

  return (
    <>
      <div className="mt-[56.5px] text-[12px] font-semibold mx-[19.5px]">
        <div className="flex flex-col items-center justify-between h-[38px]">
          <h1>ADD CARDS</h1>
          <i className=" font-normal text-[10px]">
            VIDEO {Math.floor(duration / 60)}:
            {duration % 60 < 10
              ? `0${Math.floor(duration % 60)}`
              : Math.floor(duration % 60)}{" "}
            = MAX {duration > 240 ? 24 : Math.floor(duration / 10) + 1} CARDS
          </i>
          <i className="font-normal text-[8.5px]">
            {duration > 240
              ? "Because the total time is limited to 4 minutes. "
              : " "}
            MAX 1 CARD EVERY 10s
          </i>
        </div>
        <div className=" h-[59px] flex flex-col justify-between mt-[12px]">
          <div className="flex items-center gap-[7px]">
            <div>LINK</div>
            <button>
              <img src="/icon/upload/paste.svg" alt="" />
            </button>
          </div>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            type="url"
            placeholder="Text"
            className="h-[40px] text-[12px] font-normal w-full bg-[#1E1E1E] border-[2.72px] border-[#505050] rounded-[9px] placeholder:text-[10.5px] placeholder:text-[#505050] placeholder:font-semibold px-[9px]"
          />
        </div>
        <div className=" h-[59px] flex flex-col justify-between mt-[15px]">
          <div>NAME</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Text"
            className="h-[40px] text-[12px] font-normal w-full bg-[#1E1E1E] border-[2.72px] border-[#505050] rounded-[9px] placeholder:text-[10.5px] placeholder:text-[#505050] placeholder:font-semibold px-[9px]"
          />
        </div>
        <div
          ref={listRef}
          className=" relative h-[59px] flex flex-col justify-between mt-[15px]"
        >
          <div>ICON</div>
          <input
            value={iconSearch}
            onChange={(e) => setIconSearch(e.target.value)}
            type="text"
            placeholder='"Location"'
            className="h-[40px] text-[12px] font-normal w-full bg-[#1E1E1E] border-[2.72px] border-[#505050] rounded-[9px] placeholder:text-[10.5px] placeholder:text-[#505050] placeholder:font-semibold px-[9px] placeholder:italic"
          />
          <div className="bottom-[8.74px] right-[12.92px] size-[22.51px] flex absolute">
            {icon ? (
              <IconComponent />
            ) : (
              <img src="/icon/upload/image2.svg" alt="" />
            )}
          </div>
          {iconSearch ? (
            <SetIcon
              matchingIcons={matchingIcons}
              setIcon={setIcon}
              setIconSearch={setIconSearch}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="flex gap-[20px] items-center h-[60px] mt-[15px]">
          <div className="w-1/2 h-full flex flex-col justify-between">
            <div className="flex  items-center gap-[7px]">
              <div>START</div>
              <button>
                <img src="/icon/upload/clock1.svg" alt="" />
              </button>
            </div>
            <div className="h-[40px] pt-1 text-[12px] font-normal w-full bg-[#1E1E1E] border-[2.72px] border-[#505050] rounded-[9px] flex items-center px-[9px]">
              {Math.floor(start / 60)}:
              {start % 60 < 10 ? `0${start % 60}` : start % 60}
            </div>
          </div>
          <div className="w-1/2 h-full flex flex-col justify-between">
            <div className="flex items-center gap-[7px]">
              <div>DURATION</div>
              <button>
                <img src="/icon/upload/clock2.svg" alt="" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Text"
              className="h-[40px] text-[18px] font-normal w-full bg-[#1E1E1E] border-[2.72px] border-[#505050] rounded-[9px] placeholder:text-[10.5px] placeholder:text-[#505050] placeholder:font-semibold px-[9px]"
            />
          </div>
        </div>
        <div className=" ">
          {videoLink ? (
            <div className="mt-[20px] rounded-[6.1px] min-h-[280px] w-full overflow-hidden">
              <ReactPlayer
                ref={videoRef}
                url={videoLink}
                preload="auto"
                controls
                onProgress={onProgress}
                onSeek={onSeek}
                progressInterval={100}
                width="100%"
                height="100%"
              />
            </div>
          ) : (
            <div className="h-[280px] flex items-center justify-center">
              No video file.
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Index;
