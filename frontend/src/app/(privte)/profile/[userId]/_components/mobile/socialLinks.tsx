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
        {isAuth || (
          <>
            {email ? (
              <Link href={`mailto:${email}`}>
                <img
                  className="size-[26px]"
                  src="/icon/profile/envelope.png"
                  alt=""
                />
              </Link>
            ) : (
              <img
                className="size-[26px]"
                src="/icon/profile/envelope.png"
                alt=""
              />
            )}
            <Link href={""}>
              <img
                className="size-[26px]"
                src="/icon/profile/behancel.png"
                alt=""
              />
            </Link>
          </>
        )}
      </div>
    </>
  );
};
export default SocialLinks;
