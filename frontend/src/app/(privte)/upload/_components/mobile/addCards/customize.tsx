"use client";
import { useEffect, useRef, useState } from "react";
import lucideIcons from "@/../public/lucideIcon.json";
import SetIcon from "./setIcon";
import * as LucideIcons from "lucide-react";
import useClickOutside from "@/hooks/useClickOutside";

interface Type {
  videoSrc: string | null;
}

const Customize: React.FC<Type> = ({ videoSrc }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [link, setLink] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [iconSearch, setIconSearch] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const [start, setSart] = useState<string>("");

  // Filter icons from the JSON based on the input (case insensitive)
  const matchingIcons = lucideIcons
    .filter(
      (key) =>
        iconSearch && key.toLowerCase().includes(iconSearch.toLowerCase())
    )
    .map((key) => key.charAt(0).toUpperCase() + key.slice(1));

  const IconComponent = LucideIcons[
    icon as keyof typeof LucideIcons
  ] as React.ComponentType<React.SVGProps<SVGSVGElement>>;

  // Close the menu if the click is outside

  useClickOutside(listRef as React.RefObject<HTMLElement>, () =>
    setIconSearch("")
  );

  //collection of data
  const formData = new FormData();
  useEffect(() => {
    formData.append("link", link);
    formData.append("name", name);
    formData.append("icon", icon);
  }, [link, icon, name, start]);
  return (
    <>
      <div className="h-[631px] mt-[56.5px] text-[10.5px] font-semibold mx-[19.5px]">
        <div className="flex flex-col items-center justify-between h-[38px]">
          <h1>ADD CARDS</h1>
          <i className=" font-normal text-[8.5px]">
            VIDEO 4:28 = MAX 26 CARDS{" "}
          </i>
          <i className="font-normal text-[8.5px]">MAX 1 CARD EVERY 10s</i>
        </div>
        <div className=" h-[59px] flex flex-col justify-between mt-[10.5px]">
          <div className="flex items-center gap-[7px]">
            <div>LINK</div>
            <button>
              <img src="/icon/upload/paste.svg" alt="" />
            </button>
          </div>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            type="text"
            placeholder="Text"
            className="h-[40px] text-[18px] font-normal w-full bg-[#1E1E1E] border-[2.72px] border-[#505050] rounded-[9px] placeholder:text-[10.5px] placeholder:text-[#505050] placeholder:font-semibold px-[9px]"
          />
        </div>
        <div className=" h-[59px] flex flex-col justify-between mt-[15px]">
          <div>NAME</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Text"
            className="h-[40px] text-[18px] font-normal w-full bg-[#1E1E1E] border-[2.72px] border-[#505050] rounded-[9px] placeholder:text-[10.5px] placeholder:text-[#505050] placeholder:font-semibold px-[9px]"
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
            className="h-[40px] text-[16px] font-normal w-full bg-[#1E1E1E] border-[2.72px] border-[#505050] rounded-[9px] placeholder:text-[10.5px] placeholder:text-[#505050] placeholder:font-semibold px-[9px] placeholder:italic"
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
            <input
              value={start}
              onChange={(e) => setSart(e.target.value)}
              type="text"
              placeholder="Text"
              className="h-[40px] text-[18px] font-normal w-full bg-[#1E1E1E] border-[2.72px] border-[#505050] rounded-[9px] placeholder:text-[10.5px] placeholder:text-[#505050] placeholder:font-semibold px-[9px]"
            />
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
        {videoSrc ? (
          <video
            className="h-[280px] w-full object-cover mt-[20px] rounded-[6.1px] overflow-hidden"
            playsInline
            muted
            preload="auto"
            controls
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <>No video file.</>
        )}
      </div>
    </>
  );
};
export default Customize;
