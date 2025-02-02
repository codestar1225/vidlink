import Link from "next/link";

interface Type {
  isAuth: boolean;
}
const SocialLinks: React.FC<Type> = ({ isAuth }) => {
  return (
    <>
      <div
        className={`${
          isAuth ? "gap-[14px]" : "gap-[38px]"
        } flex justify-center`}
      >
        <Link href={""}>
          <img src="/icon/profile/instagram.png" alt="" />
        </Link>
        <Link href={""}>
          <img src="/icon/profile/tiktok.png" alt="" />
        </Link>
        {isAuth || (
          <>
            <Link href={""}>
              <img src="/icon/profile/envelope.png" alt="" />
            </Link>
            <Link href={""}>
              <img src="/icon/profile/behancel.png" alt="" />
            </Link>
          </>
        )}
      </div>
    </>
  );
};
export default SocialLinks;
