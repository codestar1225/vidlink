interface Type {
  name: string;
  src: string;
  value: number;
}
const AmountItem: React.FC<Type> = ({ name, src, value }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-[6px] tracking-wider font-semibold w-full text-foreground h-[64.26px] rounded-[8px] bg-[#191919] pt-[2px] overflow-hidden">
        <span className="text-[10px]">{name.toUpperCase()}</span>
        <div className="flex gap-[6px] items-center text-[25.7px]">
          <img
            className="size-[18.53px]"
            src={`/icon/dashboard/${src}.png`}
            alt=""
          />
          <span>
            {Math.floor(value / 1000)}
            {Math.floor((value % 1000) / 10)}
            {(value % 1000) % 10}
          </span>
        </div>
      </div>
    </>
  );
};
export default AmountItem;
