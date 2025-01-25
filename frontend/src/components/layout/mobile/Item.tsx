import Link from "next/link";

const Item = ({ url, name }: { url: string; name: string }) => {
  return (
    <>
      <Link
        href={"/videos"}
        className="border-[1.07px] dark:border-white font-semibold border-black rounded-[3.2px] text-[17px] pt-[3.2px] pb-[1.5px] px-[2.13px] my-[43px] "
      >
        {name}
      </Link>
    </>
  );
};
export default Item;
