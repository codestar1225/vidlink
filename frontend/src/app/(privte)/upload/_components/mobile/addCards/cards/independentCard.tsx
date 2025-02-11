import * as LucideIcons from "lucide-react";
interface Type {
  name: string;
  start: number;
  icon: string;
  no: number;
  isSaved: boolean;
  setIsSaveed(value: boolean): void;
}
const IndependentCard: React.FC<Type> = ({
  name,
  start,
  icon,
  no,
  isSaved,
  setIsSaveed,
}) => {
  const IconComponent = LucideIcons[
    icon as keyof typeof LucideIcons
  ] as React.ComponentType<React.SVGProps<SVGSVGElement>>;
  return (
    <>
      <li className="border-blue border-[2px] text-black bg-white rounded-[6px] w-[122.41px] h-[94.5px] p-[5.9px] flex flex-col justify-between overflow-hidden">
        <div className="text-[13.86px] font-semibold flex justify-between w-full items-center">
          <span>{no < 10 ? `0${no}` : no}</span>
          <i className="font-normal">
            ({Math.floor(start / 60)}:
            {start % 60 < 10 ? `0${start % 60}` : start % 60})
          </i>
        </div>
        <div className="h-[60.91px]">
          <div className="flex flex-col items-center h-[38.4px] w-full justify-between">
            <h1 className="text-blue text-[13.86px] font-semibold">
              {name.toUpperCase()}
            </h1>
            {icon ? <IconComponent className="size-[18.29px]" /> : <></>}
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setIsSaveed(!isSaved)}
              className="size-[22.51px]"
            >
              {isSaved ? (
                <img src="/icon/detail/card/left2Blue.png" alt="" />
              ) : (
                <img src="/icon/detail/card/left2.svg" alt="" />
              )}
            </button>
            <img src="/icon/detail/card/right2.svg" alt="" />
          </div>
        </div>
      </li>
    </>
  );
};
export default IndependentCard;
