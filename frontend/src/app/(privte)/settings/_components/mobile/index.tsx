"use client";
import { useEffect, useState } from "react";
import InputItem from "./inputItem";
import FooterMobile from "@/app/_components/layout/mobile/footer";
import LinkItem from "./linkItem";
import AddPic from "./addPic";
import GenderItem from "./gender";
import { UserInfoType } from "../../page";
import useVideo from "@/hooks/useVideo";
import { Loader } from "lucide-react";
import { validateSocialMediaUrl } from "@/utils/validateUrl";
import UserName from "./userName";

interface Type {
  userInfo: UserInfoType | null;
}
const SettingsMobile: React.FC<Type> = ({ userInfo }) => {
  const { setUserInfo, loading } = useVideo();
  const [userName, setUserName] = useState<string>(userInfo?.userName || "");
  const [gender, setGender] = useState<string>(userInfo?.gender || "");
  const [bio, setBio] = useState<string>(userInfo?.bio || "");
  const [instagram, setInstagram] = useState<string>(userInfo?.instagram || "");
  const [tiktok, setTiktok] = useState<string>(userInfo?.tiktok || "");
  const [youtube, setYoutube] = useState<string>(userInfo?.youtube || "");
  const [linkedin, setLinkedin] = useState<string>(userInfo?.linkedin || "");
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRepeated, setIsRepeated] = useState<boolean>(false);
  const [caution, setCaution] = useState<string>("");
  const [checkingName, setCheckingName] = useState<boolean>(false);

  const handleSave = async () => {
    if (isRepeated || caution || isSaved || loading || checkingName) return;
    const isInstagram = validateSocialMediaUrl("instagram", instagram);
    const isTiktok = validateSocialMediaUrl("tiktok", tiktok);
    const isYoutube = validateSocialMediaUrl("youtube", youtube);
    const isLinkedin = validateSocialMediaUrl("linkedin", linkedin);
    if (!isInstagram || !isTiktok || !isYoutube || !isLinkedin) {
      alert("Please enter the valid links.");
      return;
    }
    const userInfo = new FormData();
    userInfo.append("userName", userName);
    userInfo.append("gender", gender);
    userInfo.append("bio", bio);
    userInfo.append("instagram", instagram);
    userInfo.append("tiktok", tiktok);
    userInfo.append("youtube", youtube);
    userInfo.append("linkedin", linkedin);
    const res = await setUserInfo(userInfo);
    if (res.status === 200) {
      setIsSaved(true);
    } else {
      alert(res.message);
    }
  };
  useEffect(() => {
    setIsSaved(false);
  }, [userName, bio, gender, instagram, tiktok, youtube, linkedin]);

  return (
    <>
      <main className="mt-[128px]  w-screen px-[11.25px] tracking-wider">
        <div className="flex gap-[17.67px] ml-[19.75px] h-[74px]">
          <img
            className="size-[74px] rounded-full"
            src={userInfo?.picture}
            alt=""
          />
          <div className=" relative mt-[28px] ">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex justify-center items-center border-[1.07px] border-white  rounded-[3.2px] text-[13px] w-[110.3px] h-[17.4px]"
            >
              EDIT PICTURE
            </button>
            {isOpen && <AddPic setIsOpen={setIsOpen} />}
          </div>
        </div>
        <div className="mt-[21px] flex flex-col gap-[17.2px] justify-between">
          <h1 className="text-[10.32px] font-semibold text-center">
            BASIC INFO
          </h1>
          <div className="flex flex-col gap-1">
            <UserName
              setUserName={setUserName}
              setIsRepeated={setIsRepeated}
              setCaution={setCaution}
              setCheckingName={setCheckingName}
              userName={userName}
            />
            <i className="text-[red] text-[12px]">
              <h1>{caution}</h1>
              <h1>{isRepeated && "This username is already in use."}</h1>
            </i>
          </div>
          <GenderItem setGender={setGender} gender={gender} />
          <InputItem
            name="bio"
            holderName="Text"
            setValue={setBio}
            value={bio}
          />
        </div>
        <div className="h-[314.15px] flex flex-col gap-[17.2px] mt-[32.1px] mb-[201px]">
          <h1 className="text-[10.32px] font-semibold  flex items-center gap-[8px] justify-center">
            LINKS <img src="/icon/settings/link.png" alt="" />
          </h1>
          <LinkItem
            setValue={setInstagram}
            name="instagram"
            holderName="Link"
            value={instagram}
          />
          <LinkItem
            setValue={setTiktok}
            name="tiktok"
            holderName="Link"
            value={tiktok}
          />
          <LinkItem
            setValue={setYoutube}
            name="youtube"
            holderName="Link"
            value={youtube}
          />
          <LinkItem
            setValue={setLinkedin}
            name="linkedin"
            holderName="Link"
            value={linkedin}
          />
        </div>
        <button
          onClick={handleSave}
          className={`${
            isSaved ? "bg-blue" : "bg-[#002355]"
          } h-[50px] w-[282.8px] bg-blue rounded-[20px] text-[25px] mb-[71px] font-semibold flex items-center justify-center mx-auto`}
        >
          {loading ? (
            <>
              <span className="text-white">SAVING...</span>
              <Loader className=" text-white animate-spin" />
            </>
          ) : isSaved ? (
            <div className="flex items-center gap-[20px]">
              SAVED
              <img
                className="size-[28px]"
                src="/icon/upload/checked.png"
                alt=""
              />
            </div>
          ) : (
            <>SAVE</>
          )}
        </button>
      </main>
      <FooterMobile isFixed={false} />
    </>
  );
};
export default SettingsMobile;
