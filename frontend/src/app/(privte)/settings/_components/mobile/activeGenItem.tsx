interface Type {
  gender: string;
  setGender(value: string): void;
}
const ActiveGenItem: React.FC<Type> = ({ gender, setGender }) => {
  return (
    <>
      <div className="flex justify-between items-center h-[38.98px] bg-blue  rounded-[10.41px] px-[11.47px]">
        <span>{gender}</span>
        <button onClick={() => setGender("")}>
          <img src="/icon/settings/close.png" alt="" />
        </button>
      </div>
    </>
  );
};
export default ActiveGenItem;
