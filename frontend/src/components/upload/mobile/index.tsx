"use client";
import { ChangeEvent, useState } from "react";
import ProgressLine from "./upload/progressLine";
import AddCards from "./addCards";
import FooterMobile from "@/components/layout/mobile/footer";
import Image from "next/image";
import Upload from "./upload";
import Preview from "./preview";

const UploadMobile = () => {
  const [fileName, setFileName] = useState<string>("");
  const [isUpload, setIsUpload] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);

  function handleUpload(e: ChangeEvent<any>) {
    const fName = e.target.files[0].name.slice(0, 10);
    setFileName(fName);
  }
  return (
    <>
      <ProgressLine />
      {isUpload && fileName ? (
        !isAdd ? (
          <AddCards isAdd={isAdd} setIsAdd={setIsAdd} />
        ) : (
          <Preview setIsAdd={setIsAdd}/>
        )
      ) : (
        <>
          <Upload
            fileName={fileName}
            setIsUpload={setIsUpload}
            handleUpload={handleUpload}
          />
        </>
      )}
    </>
  );
};
export default UploadMobile;
