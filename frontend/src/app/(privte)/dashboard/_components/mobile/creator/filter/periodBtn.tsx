interface Type {
  setFilter(value: number): void;
  name: string;
  filter: number;
}
const PeriodBtn: React.FC<Type> = ({ setFilter, name, filter }) => {
  return (
    <button
      onClick={() => setFilter(Number(name.charAt(0)))}
      className={`${
        name.startsWith(filter.toString())
          ? "text-white bg-blue"
          : "text-background bg-[#191919]"
      } h-[34px] flex justify-center items-center rounded-[7px] tracking-wider w-full pt-[1px] font-bold text-[14px]`}
    >
      {name.toUpperCase()}
    </button>
  );
};
export default PeriodBtn;
