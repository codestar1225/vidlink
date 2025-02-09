import * as LucideIcons from "lucide-react";

interface Type {
  handlePreview(value: number): void;
  name: string;
  start: number;
  icon: string;
  link: string;
  no: number;
  length: number;
  isPreview: boolean;
}
const Card: React.FC<Type> = ({
  handlePreview,
  name,
  start,
  icon,
  link,
  no,
  length,
  isPreview,
}) => {
  const IconComponent = LucideIcons[
    icon as keyof typeof LucideIcons
  ] as React.ComponentType<React.SVGProps<SVGSVGElement>>;
  return (
    <>
      <li
        className={`${
          no === length ? "border-blue text-blue" : "border-none text-black"
        } border-[2px] text-black bg-white rounded-[6px] w-[122.41px] h-[94.5px] p-[5.9px] flex flex-col justify-between overflow-hidden`}
      >
        <div className="text-[13.86px] font-semibold flex justify-between w-full items-center">
          <span className="text-black">{no < 10 ? `0${no}` : no}</span>{" "}
          <i className="font-normal">
            ({Math.floor(start / 60)}:
            {start % 60 < 10 ? `0${start % 60}` : start % 60})
          </i>
        </div>
        <div
          className={`flex flex-col items-center h-[38.4px] w-full pt-[8px] justify-between`}
        >
          <h1 className={`text-[13.86px] font-semibold`}>
            {name.toUpperCase()}
          </h1>
          <IconComponent className="size-[22.51px]" />
        </div>
        <div className="flex justify-between">
          <button onClick={() => handlePreview(no)} className="size-[22.51px]">
            {isPreview ? (
              <img src="/icon/detail/card/left2Blue.png" alt="" />
            ) : (
              <img src="/icon/detail/card/left2.svg" alt="" />
            )}
          </button>
          <a href={link} target="blank">
            <img src="/icon/detail/card/right2.svg" alt="" />
          </a>
        </div>
      </li>
    </>
  );
};
export default Card;
