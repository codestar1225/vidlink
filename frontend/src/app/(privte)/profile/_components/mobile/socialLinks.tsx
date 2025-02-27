import Link from "next/link";
interface Type {
  instagram?: string | null;
  tiktok?: string | null;
}
const SocialLinks: React.FC<Type> = ({ instagram, tiktok }) => {
  return (
    <>
      <div className="flex gap-[14px] justify-center ">
        {instagram ? (
          <Link href={instagram || ""} target="_blank">
            <img
              className="size-[26px]"
              src="/icon/profile/instagram.png"
              alt=""
            />
          </Link>
        ) : (
          <img
            className="size-[26px]"
            src="/icon/profile/instagram.png"
            alt=""
          />
        )}
        {tiktok ? (
          <Link href={tiktok || ""} target="_blank">
            <img
              className="size-[26px]"
              src="/icon/profile/tiktok.png"
              alt=""
            />
          </Link>
        ) : (
          <img className="size-[26px]" src="/icon/profile/tiktok.png" alt="" />
        )}
      </div>
    </>
  );
};
export default SocialLinks;
