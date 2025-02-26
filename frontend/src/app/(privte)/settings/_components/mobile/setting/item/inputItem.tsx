interface Type {
  name: string;
  holderName: string;
  value: string;
  setValue(value: string): void;
}
const InputItem: React.FC<Type> = ({ name, holderName, value, setValue }) => {
  return (
    <>
      <label className="w-full flex flex-col justify-between h-[54.01px]">
        <span className="text-[10.32px] font-semibold">
          {name.toUpperCase()}
        </span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder={holderName}
          className={`${
            value ? "bg-blue border-none" : "bg-[#3E3E3E66] border-[#272727] border-[3.12px]"
          } h-[38.98px] text-[14px] pt-[1.5px]  rounded-[10.41px] px-[11.47px] placeholder-[#4F4F4F] placeholder:text-[13px] placeholder:font-semibold `}
        />
      </label>
    </>
  );
};
export default InputItem;
