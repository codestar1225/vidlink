import Image from "next/image";

interface Type {
  isEditing: string;
}
const CardIndependent: React.FC<Type> = ({ isEditing }) => {
  return (
    <>
      <li className="border-blue border-[2px] text-black bg-white rounded-[6px] w-[122.41px] h-[94.5px] p-[5.9px] flex flex-col justify-between">
        <div className="text-[13.86px] font-semibold flex justify-between w-full items-center">
          <div>01</div> <i className="font-normal">(0:01)</i>
        </div>
        <div className="flex flex-col items-center h-[38.4px] w-full pt-[8px] justify-between">
          <h1 className="text-blue text-[13.86px] font-semibold">
            {isEditing}
          </h1>
          <img src={`/icon/detail/card/${isEditing.toLowerCase()}2.svg`} alt="" />
        </div>
        <div className="flex justify-between">
          <img src="/icon/detail/card/left2.svg" alt="" />
          <img src="/icon/detail/card/right2.svg" alt="" />
        </div>
      </li>
    </>
  );
};
export default CardIndependent;
