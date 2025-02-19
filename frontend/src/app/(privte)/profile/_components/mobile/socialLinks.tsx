import Link from "next/link";
interface Type {
  instagram?: string | null;
  tiktok?: string | null;
}
const SocialLinks: React.FC<Type> = ({ instagram, tiktok }) => {
  return (
    <>
      <div className="flex gap-[14px] justify-center ">
        <Link href={instagram || ""} target="blank">
          <img src="/icon/profile/instagram.png" alt="" />
        </Link>
        <Link href={tiktok || ""} target="blank">
          <img src="/icon/profile/tiktok.png" alt="" />
        </Link>
      </div>
    </>
  );
};
export default SocialLinks;
