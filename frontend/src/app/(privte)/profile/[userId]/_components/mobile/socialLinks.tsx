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
        <Link href={instagram} >
          <img src="/icon/profile/instagram.png" alt="" />
        </Link>
        <Link href={tiktok} target="blank">
          <img src="/icon/profile/tiktok.png" alt="" />
        </Link>
        {isAuth || (
          <>
            <Link href={`mailto:${email}`}>
              <img src="/icon/profile/envelope.png" alt="" />
            </Link>
            <Link href={""} >
              <img src="/icon/profile/behancel.png" alt="" />
            </Link>
          </>
        )}
      </div>
    </>
  );
};
export default SocialLinks;
