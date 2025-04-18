import * as LucideIcons from "lucide-react";

interface Type {
  handleIsSaved(value: number): void;
  setName(value: string): void;
  setIcon(value: string): void;
  setLink(value: string): void;
  setStart(value: number): void;
  name: string;
  start: number;
  icon: string;
  link: string;
  no: number;
  isSaved: boolean;
}
const Card: React.FC<Type> = ({
  handleIsSaved,
  setName,
  setIcon,
  setLink,
  setStart,
  name,
  start,
  icon,
  link,
  no,
  isSaved,
}) => {
  const IconComponent = LucideIcons[
    icon as keyof typeof LucideIcons
  ] as React.ComponentType<React.SVGProps<SVGSVGElement>>;

  const handleInit = () => {
    setName(name);
    setIcon(icon);
    setLink(link);
    setStart(start);
  };
  return (
    <>
      <li
        className={`border-[2px] text-black bg-white rounded-[6px] w-[32%] h-[94.5px] p-[5.9px] flex flex-col justify-between overflow-hidden`}
      >
        <button onClick={handleInit}>
          <div className="text-[13.86px] font-semibold flex justify-between w-full items-center">
            <span className="text-black">{no < 10 ? `0${no}` : no}</span>{" "}
            <i className="font-normal">
              ({Math.floor(start / 60)}:
              {start % 60 < 10 ? `0${start % 60}` : start % 60})
            </i>
          </div>
        </button>
        <div className="h-[60.91px]">
          <button className="w-full" onClick={handleInit}>
            <div
              className={`flex flex-col items-center h-[38.4px] w-full justify-between`}
            >
              <h1 className={`text-[13.84px] font-semibold`}>
                {name.toUpperCase()}
              </h1>
              <IconComponent className="size-[18.29px]" />
            </div>
          </button>
          <div className="flex justify-between">
            <button
              onClick={() => handleIsSaved(no)}
              className="size-[22.51px]"
            >
              {isSaved ? (
                <img src="/icon/detail/card/left2Blue.png" alt="" />
              ) : (
                <img src="/icon/detail/card/left2.svg" alt="" />
              )}
            </button>
            <a href={link} target="_blank">
              {/* <img src="/icon/detail/card/right2.svg" alt="" /> */}
              <LucideIcons.Link className="size-[19px]" />
            </a>
          </div>
        </div>
      </li>
    </>
  );
};
export default Card;
