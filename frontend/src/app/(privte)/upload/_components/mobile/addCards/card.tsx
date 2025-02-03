
interface Type {
  isEditing: string;
  setIsEditing(value: string): void;
  name: string;
  src: string;
}
const Card: React.FC<Type> = ({ isEditing, name, src, setIsEditing }) => {
  return (
    <>
      <li
        className={`${
          isEditing === name ? "border-blue" : "border-none"
        } border-[2px] text-black bg-white rounded-[6px] w-[122.41px] h-[94.5px] p-[5.9px] flex flex-col justify-between`}
      >
        <button onClick={() => setIsEditing(name)}>
          <div className="text-[13.86px] font-semibold flex justify-between w-full items-center">
            <div>01</div> <i className="font-normal">(0:01)</i>
          </div>
          <div className="flex flex-col items-center h-[38.4px] w-full pt-[8px] justify-between">
            <h1
              className={`${
                isEditing === name ? "text-blue" : "text-black"
              } text-[13.86px] font-semibold`}
            >
              {name.toUpperCase()}
            </h1>
            <img src={`/icon/detail/card/${src}.svg`} alt="" />
          </div>
          <div className="flex justify-between">
            <img src="/icon/detail/card/left2.svg" alt="" />
            <img src="/icon/detail/card/right2.svg" alt="" />
          </div>
        </button>
      </li>
    </>
  );
};
export default Card;
