import Image from "next/image";
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
            <Image
              width={26}
              height={26}
              className="size-[26px]"
              src="/icon/profile/instagram.png"
              alt=""
              loading="eager"
            />
          </Link>
        ) : (
          <Image
            width={26}
            height={26}
            className="size-[26px]"
            src="/icon/profile/instagram.png"
            alt=""
            loading="eager"
          />
        )}
        {tiktok ? (
          <Link href={tiktok || ""} target="_blank">
            <Image
              width={26}
              height={26}
              className="size-[26px]"
              src="/icon/profile/tiktok.png"
              alt=""
              loading="eager"
            />
          </Link>
        ) : (
          <Image
            width={26}
            height={26}
            className="size-[26px]"
            src="/icon/profile/tiktok.png"
            alt=""
            loading="eager"
          />
        )}
      </div>
    </>
  );
};
export default SocialLinks;
