import Link from "next/link";

interface Type {
  name: string;
}
const BtnGroup: React.FC<Type> = ({ name }) => {
  return (
    <>
      <div className="font-semibold text-[20px] tracking-wider mt-[50px] mb-[140px] flex flex-col items-center gap-[20px]">
        <button className="bg-blue rounded-[20.2px] w-[282.8px] h-[50px] flex justify-center items-center gap-[20.2px] pt-[2px] ">
          {name.toUpperCase()}{" "}
          <img
            src="/icon/dashboard/download.png"
            className="size-[28px]"
            alt=""
          />
        </button>
        <Link
          href={"/profile"}
          className="border-[3px] rounded-[20.2px] w-[282.8px] h-[50px] flex justify-center items-center gap-[20.2px] pt-[2px]"
        >
          BACK TO PROFILE
        </Link>
      </div>
    </>
  );
};
export default BtnGroup;
