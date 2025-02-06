"use client";
import { ChangeEvent, Suspense, useState } from "react";
import ProgressLine from "./upload/progressLine";
import { useVideoValidate } from "@/hooks/useVideoValidate";
import dynamic from "next/dynamic";
import Upload from "./upload";
import Loading from "@/app/_components/ui/loading";
// import useUpload from "@/hooks/useUpload";
const AddCards = dynamic(() => import("./addCards"));
const Preview = dynamic(() => import("./preview"));

const UploadMobile = () => {
  const [isUpload, setIsUpload] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const { error, fileName, videoSrc, validateVideo } = useVideoValidate();
  // const { uploadVideo, loading } = useUpload();

  function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    validateVideo(e);
  }
  // const videoUp = (file: ChangeEvent<HTMLInputElement>) => {
  //   const video = new FormData();
  //   if (file) {
  //   }
  // };

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
            <AddCards setIsAdd={setIsAdd} videoSrc={videoSrc} />
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
