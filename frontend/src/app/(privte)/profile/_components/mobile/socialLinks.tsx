import Link from "next/link";

const SocialLinks = () => {
  return (
    <>
      <div className="flex gap-[14px] justify-center ">
        <Link href={""}>
          <img src="/icon/profile/instagram.png" alt="" />
        </Link>
        <Link href={""}>
          <img src="/icon/profile/tiktok.png" alt="" />
        </Link>
      </div>
    </>
  );
};
export default SocialLinks