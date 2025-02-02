interface Type {
  name: string;
  time: string;
}
const Card: React.FC<Type> = ({ name, time }) => {
  return (
    <>
      <div className="border-[0.7px] border-blue bg-blue rounded-[6px] w-[122.41px] h-[94.5px] p-[5.9px] flex flex-col justify-between">
        <div className="text-[13.86px] font-semibold flex justify-between w-full items-center">
          <div>01</div> <i className="font-normal">({time})</i>
        </div>
        <div className="flex flex-col items-center h-[38.4px] w-full pt-[8px] justify-between">
          <h1 className="text-[13.86px] font-semibold">{name.toUpperCase()}</h1>
          <img src={`/icon/detail/card/${name}2.svg`} alt="" />
        </div>
        <div className="flex justify-between">
          <img src="/icon/detail/card/left.svg" alt="" />
          <img src="/icon/detail/card/right.svg" alt="" />
        </div>
      </div>
    </>
  );
};
export default Card;
