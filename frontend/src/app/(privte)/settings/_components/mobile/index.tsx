"use client";
import { useState } from "react";
import FooterMobile from "@/app/_components/layout/mobile/footer";
import { UserInfoType } from "../../page";
import CameraCapture from "./cameraCapture";
import ImageCropper from "./imageCrop";
import Setting from "./setting";

interface Type {
  userInfo: UserInfoType | null;
}

const SettingsMobile: React.FC<Type> = ({ userInfo }) => {
  const [edit, setEdit] = useState<string>("");
  return (
    <>
      {edit === "" || edit === "modal" ? (
        <Setting setEdit={setEdit} edit={edit} userInfo={userInfo} />
      ) : edit === "camera" ? (
        <CameraCapture setEdit={setEdit} />
      ) : (
        <ImageCropper
          imageSrc={""}
          onCropComplete={() => {}}
          setEdit={setEdit}
        />
      )}
      <FooterMobile isFixed={edit ? true : false} />
    </>
  );
};
export default SettingsMobile;
