"use state";
import { CardT } from "@/app/(public)/videos/[videoid]/page";
import useVideo from "@/hooks/useVideo";
import * as LucideIcons from "lucide-react";
import { useState } from "react";

interface Type extends CardT {
  no: number;
}
const Card: React.FC<Type> = ({
  name,
  link,
  icon,
  isSaved,
  start,
  no,
  _id,
}) => {
  const { saveCard, loading } = useVideo();
  const [saved, setSaved] = useState<boolean>(isSaved);

  const IconComponent = LucideIcons[
    icon as keyof typeof LucideIcons
  ] as React.ComponentType<React.SVGProps<SVGSVGElement>>;

  const handleSavingCard = async () => {
    if (loading) return;
    const res = await saveCard(_id);
    if (res.status === 200 && "saved" in res) {
      setSaved(res.saved);
    } else {
      alert(res.message);
    }
  };
  return (
    <>
      <li
        className={`border-black border-[0.7px] text-black bg-white rounded-[6px] w-[122.41px] h-[94.5px] p-[5.9px] flex flex-col overflow-hidden`}
      >
        <a href={link} target="blank">
          <div className="text-[13.86px] font-semibold flex justify-between w-full items-center">
            <span className="">{no < 10 ? `0${no}` : no}</span>{" "}
            <i className="font-normal">
              ({Math.floor(start / 60)}:
              {start % 60 < 10 ? `0${start % 60}` : start % 60})
            </i>
          </div>
          <div
            className={`flex flex-col items-center h-[38.4px] w-full justify-between mt-[10px]`}
          >
            <h1 className={`text-[13.86px] font-semibold`}>
              {name.toUpperCase()}
            </h1>
            <IconComponent className="size-[18.29px]" />
          </div>
        </a>
        <div className="flex justify-between">
          <button onClick={handleSavingCard} className="size-[22.51px]">
            {saved ? (
              <img src="/icon/detail/card/left2Blue.png" alt="" />
            ) : (
              <img src="/icon/detail/card/left2.svg" alt="" />
            )}
          </button>
          <a href={link} target="blank" className="z-20">
            <img src="/icon/detail/card/right2.svg" alt="" />
          </a>
        </div>
      </li>
    </>
  );
};
export default Card;
