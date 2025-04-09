import * as LucideIcons from "lucide-react";

interface Type {
  setIsSelected(value: number): void;
  setSignal(value: boolean): void;
  name: string;
  start: number;
  icon: string;
  no: number;
  isSaved: boolean;
  link: string;
  signal: boolean;
  currentCard: number;
}
const CardItem: React.FC<Type> = ({
  setIsSelected,
  setSignal,
  name,
  start,
  icon,
  no,
  isSaved,
  link,
  signal,
  currentCard,
}) => {
  const IconComponent = LucideIcons[
    icon as keyof typeof LucideIcons
  ] as React.ComponentType<React.SVGProps<SVGSVGElement>>;

  const handlePreview = () => {
    setIsSelected(start);
    setSignal(!signal);
  };

  return (
    <>
      <li
        className={`${
          currentCard + 1 === no ? "bg-blue text-white" : "bg-white text-black"
        } rounded-[6px] w-[122.41px] h-[94.5px] p-[5.9px] flex flex-col overflow-hidden`}
      >
        <button onClick={handlePreview}>
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
        </button>
        <div className="flex justify-between">
          <div className="size-[22.51px]">
            {isSaved ? (
              <img src="/icon/detail/card/left2Blue.png" alt="" />
            ) : currentCard >= 0 && currentCard + 1 === no ? (
              <img src="/icon/detail/card/left2_white.png" alt="" />
            ) : (
              <img src="/icon/detail/card/left2.svg" alt="" />
            )}
          </div>
          <a href={link} target="_blank" className="z-20">
            {currentCard >= 0 && currentCard + 1 === no ? (
              // <img src="/icon/detail/card/right2_white.png" alt="" />
              <LucideIcons.Link className="text-white size-[19px]" />
            ) : (
              // <img src="/icon/detail/card/right2.svg" alt="" />
              <LucideIcons.Link className="size-[19px]" />
            )}
          </a>
        </div>
      </li>
    </>
  );
};
export default CardItem;
