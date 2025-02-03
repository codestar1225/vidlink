"use client";
import { ChangeEvent, Suspense, useState } from "react";
import ProgressLine from "./upload/progressLine";
import Image from "next/image";
import { useVideoValidate } from "@/hooks/useVideoValidate";
import dynamic from "next/dynamic";
import Upload from "./upload";
import Loading from "@/app/_components/ui/loading";
const AddCards = dynamic(() => import("./addCards"));
const Preview = dynamic(() => import("./preview"));

const UploadMobile = () => {
  const [isUpload, setIsUpload] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const { error, fileName, validateVideo } = useVideoValidate();

  function handleUpload(e: ChangeEvent<any>) {
    validateVideo(e);
  }
  return (
    <>
      <ProgressLine fileName={fileName} isUpload={isUpload} isAdd={isAdd} />
      {isUpload && fileName ? (
        isAdd ? (
          <Suspense fallback={<Loading />}>
            <Preview setIsAdd={setIsAdd} />
          </Suspense>
        ) : (
          <Suspense fallback={<Loading />}>
            <AddCards isAdd={isAdd} setIsAdd={setIsAdd} />
          </Suspense>
        )
      ) : (
        <Upload
          fileName={fileName}
          error={error}
          setIsUpload={setIsUpload}
          handleUpload={handleUpload}
        />
      )}
    </>
  );
};
export default UploadMobile;
