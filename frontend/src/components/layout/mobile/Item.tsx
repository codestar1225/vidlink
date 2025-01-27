import Link from "next/link";
interface Type {
  url: string;
  name: string;
  setIsOpenMenu(value: boolean): void;
}

const Item: React.FC<Type> = ({ url, name, setIsOpenMenu }) => {
  return (
    <Link
      onClick={() => setIsOpenMenu(false)}
      href={url}
      className="border-[1.07px] h-[18.39px] border-white font-semibold  rounded-[3.2px] text-[15px]  px-[2.13px] tracking-widest "
    >
      <span>{name}</span>
    </Link>
  );
};
export default Item;
