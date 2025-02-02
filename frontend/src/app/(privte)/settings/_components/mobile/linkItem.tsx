interface Type {
  name: string;
  holderName: string;
}
const LinkItem: React.FC<Type> = ({ name, holderName }) => {
  return (
    <>
      <label className="w-full flex flex-col justify-between h-[54.01px]">
        <span className="text-[10.32px] font-semibold flex items-center gap-[8.03px]">
          {name.toUpperCase()}
          <img src={`/icon/settings/${name}.png`} alt="" />
        </span>
        <input
          type="text"
          placeholder={holderName}
          className="h-[38.98px] border-[#272727] bg-[#3E3E3E66] border-[3.12px] rounded-[10.41px] px-[11.47px] placeholder-[#4F4F4F] placeholder:text-[13px] placeholder:font-semibold "
        />
      </label>
    </>
  );
};
export default LinkItem;
