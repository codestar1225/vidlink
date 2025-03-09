import AmountItem from "./amountItem";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
// import EditPic from "./editPic";

interface Type {
  picture?: string | null;
  totalVideos?: number | null;
  totalCards?: number | null;
  followers?: number | null;
}
const Index: React.FC<Type> = ({
  picture,
  totalVideos,
  totalCards,
  followers,
}) => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/signin" });
    Cookies.remove("token");
    Cookies.remove("reqUrl");
    Cookies.remove("user");
  };
  return (
    <>
      <div className="relative size-[146px] mx-auto ">
        {picture ? (
          <Image
            width={146}
            height={146}
            className="size-[146px] rounded-full"
            src={picture}
            alt=""
            loading="eager"
            priority
          />
        ) : (
          <span className="size-[146px]"></span>
        )}
        <a
          href="/settings"
          // onClick={() => setIsOpen(!isOpen)}
          className="absolute top-[9px] size-[18px] right-[17px]"
        >
          <img src="/icon/profile/edit.png" alt="" />
        </a>
        {/* {isOpen && <EditPic setIsOpen={setIsOpen} />} */}
      </div>
      <div className="h-[147.04.67px] mx-[91px] mt-[28px] mb-[28px]">
        <div className="flex justify-between mb-[21px]">
          <AmountItem number={followers || 0} label="FOLLOWING" />
          <AmountItem number={totalCards || 0} label="PROMPTS ADDED" />
          <AmountItem number={totalVideos || 0} label="VIDEOS" />
        </div>
        <div className="flex flex-col gap-[5.47px] ">
          <Link
            href={"/dashboard"}
            className="h-[28.88px] bg-blue rounded-[4.97px] flex items-center justify-center text-[10.5px] font-semibold"
          >
            DASHBOARD
          </Link>
          <Link
            href={"/settings"}
            className="h-[28.88px] bg-[#7C889D] rounded-[4.97px] flex items-center justify-center text-[10.5px] font-semibold"
          >
            SETTINGS
          </Link>
          <button
            onClick={handleSignOut}
            className="h-[28.88px] bg-[#002355] rounded-[4.97px] flex items-center justify-center text-[10.5px] font-semibold"
          >
            LOG OUT
          </button>
        </div>
      </div>
    </>
  );
};
export default Index;
