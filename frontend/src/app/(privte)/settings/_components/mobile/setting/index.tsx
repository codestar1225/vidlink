"use client";
import InputItem from "./item/inputItem";
import LinkItem from "./item/linkItem";
import SaveBtn from "./item/saveBtn";
import GenderItem from "./gender";
import UserName from "./userName";
import { useEffect, useState } from "react";
import useVideo from "@/hooks/useVideo";
import { validateSocialMediaUrl } from "@/utils/validateUrl";
import { UserInfoType } from "../../../page";
import EditPic from "./editPic";

interface Type {
  setEdit(value: string): void;
  setImgUrl(value: string): void;
  setImgBase64(value: string): void;
  setImgFile(value: File | null): void;
  edit: string;
  userInfo: UserInfoType | null;
  imgFile: File | null;
  imgUrl: string;
}
const Index: React.FC<Type> = ({
  setEdit,
  setImgUrl,
  setImgBase64,
  setImgFile,
  edit,
  userInfo,
  imgFile,
  imgUrl,
}) => {
  const { setUserInfo, loading } = useVideo();
  const [userName, setUserName] = useState<string>(userInfo?.userName || "");
  const [gender, setGender] = useState<string>(userInfo?.gender || "");
  const [bio, setBio] = useState<string>(userInfo?.bio || "");
  const [instagram, setInstagram] = useState<string>(userInfo?.instagram || "");
  const [tiktok, setTiktok] = useState<string>(userInfo?.tiktok || "");
  const [youtube, setYoutube] = useState<string>(userInfo?.youtube || "");
  const [linkedin, setLinkedin] = useState<string>(userInfo?.linkedin || "");
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [caution, setCaution] = useState<string>("");
  const [checkingName, setCheckingName] = useState<boolean>(false);

  const handleSave = async () => {
    if (caution || isSaved || loading || checkingName) return;
    const isInstagram = validateSocialMediaUrl("instagram", instagram);
    const isTiktok = validateSocialMediaUrl("tiktok", tiktok);
    const isYoutube = validateSocialMediaUrl("youtube", youtube);
    const isLinkedin = validateSocialMediaUrl("linkedin", linkedin);
    if (!isInstagram || !isTiktok || !isYoutube || !isLinkedin) {
      alert("Please enter the valid links.");
      return;
    }
    const userInfo = new FormData();
    if (imgFile) {
      userInfo.append("file", imgFile);
    }
    userInfo.append("userName", userName);
    userInfo.append("gender", gender);
    userInfo.append("bio", bio);
    userInfo.append("instagram", instagram);
    userInfo.append("tiktok", tiktok);
    userInfo.append("youtube", youtube);
    userInfo.append("linkedin", linkedin);
    console.log(userInfo.get("picture"));
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
        <EditPic
          setEdit={setEdit}
          setImgUrl={setImgUrl}
          setImgFile={setImgFile}
          setImgBase64={setImgBase64}
          edit={edit}
          picture={userInfo?.picture}
          imgUrl={imgUrl}
        />
        <div className="mt-[21px] flex flex-col gap-[17.2px] justify-between">
          <h1 className="text-[10.32px] font-semibold text-center">
            BASIC INFO
          </h1>
          <div className="flex flex-col gap-1">
            <UserName
              setUserName={setUserName}
              setCaution={setCaution}
              setCheckingName={setCheckingName}
              userName={userName}
            />
            <i className="text-[red] text-[12px]">
              <h1>{caution}</h1>
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
        <SaveBtn handleSave={handleSave} isSaved={isSaved} loading={loading} />
      </main>
    </>
  );
};
export default Index;
