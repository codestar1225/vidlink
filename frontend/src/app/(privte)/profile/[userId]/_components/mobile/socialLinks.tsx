import Image from "next/image";
import Link from "next/link";
interface Type {
  instagram: string;
  tiktok: string;
  isAuth: boolean;
  email: string | undefined;
}
const SocialLinks: React.FC<Type> = ({ instagram, tiktok, isAuth, email }) => {
  return (
    <>
      <div
        className={`${
          isAuth ? "gap-[14px]" : "gap-[38px]"
        } flex justify-center`}
      >
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
        {isAuth || (
          <>
            {email ? (
              <Link href={`mailto:${email}`}>
                <Image
                  width={26}
                  height={26}
                  className="size-[26px]"
                  src="/icon/profile/envelope.png"
                  alt=""
                  loading="eager"
                />
              </Link>
            ) : (
              <Image
                width={26}
                height={26}
                className="size-[26px]"
                src="/icon/profile/envelope.png"
                alt=""
                loading="eager"
              />
            )}
            <Link href={""}>
              <Image
                width={26}
                height={26}
                className="size-[26px]"
                src="/icon/profile/behancel.png"
                alt=""
                loading="eager"
              />
            </Link>
          </>
        )}
      </div>
    </>
  );
};
export default SocialLinks;
