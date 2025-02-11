"use client";
import FooterMobile from "@/app/_components/layout/mobile/footer";
import { ChangeEvent, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Description from "./description";
import FileUpload from "./fileUpload";
import ButtonItem from "./buttonItem";
import LinkUpload from "./linkUpload";
import { useAtom } from "jotai";
import { cardAtom, CardType } from "@/store";
import useVideo from "@/hooks/useVideo";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";

interface Type {
  videoSrc: string | null;
  error: string;
  url: string;
  fileDuration: number;
  file: File | null;
  uploadedFile: File | null;
  validateVideo(value: ChangeEvent<HTMLInputElement>): void;
  setVideoLink(value: string): void;
  setEdit(value: string): void;
  setUrl(value: string): void;
  cancelVideo(): void;
  setDuration(value: number): void;
  setFile(value: File): void;
}
const Upload: React.FC<Type> = ({
  videoSrc,
  error,
  url,
  fileDuration,
  // file,
  uploadedFile,
  validateVideo,
  setVideoLink,
  setEdit,
  setUrl,
  cancelVideo,
  setDuration,
  setFile,
}) => {
  const videoRef = useRef<ReactPlayer>(null);
  const [, setCards] = useAtom<CardType[]>(cardAtom);
  const { loading } = useVideo();
  // const router = useRouter();

  const handleNext = () => {
    // const data = new FormData();
    if (videoSrc && url) {
      return alert("Please input one of them.");
    } else if (videoSrc && uploadedFile) {
      setVideoLink(videoSrc);
      setDuration(fileDuration);
      setFile(uploadedFile);
      setEdit("add");
      setCards([]);
      // data.append("file", file);
      // data.append("duration", fileDuration.toString());
    } else if (url) {
      const linkDuration = videoRef.current?.getDuration();
      if (linkDuration === null || linkDuration === undefined) {
        return alert(
          "Please enter a valid link. Or please check your network connection."
        );
      } else {
        setDuration(linkDuration);
        setVideoLink(url);
        setEdit("add");
        setCards([]);

        // data.append("url", url);
        // data.append("duration", linkDuration.toString());
      }
    } else {
      return alert("Please enter a file or a link.");
    }
    // uploadVideo(data).then((res) => {
    //   if (res.status === 200) {
    //     if ("duration" in res && "videoLink" in res) {
    //       setDuration(res.duration);
    //       setVideoLink(res.videoLink);
    //       setEdit("add");
    //     } else {
    //       return alert("Something went wrong.");
    //     }
    //   } else {
    //     alert(res.message);
    //     Cookies.remove("token");
    //     return router.push("/signin");
    //   }
    // });
    // setCards([]);
  };

  return (
    <>
      <ReactPlayer
        ref={videoRef}
        preload="metadata"
        url={url}
        // onError={handleError}
        style={{ display: "none" }}
      />
      <main className="">
        <LinkUpload setUrl={setUrl} url={url} />
        <FileUpload
          validateVideo={validateVideo}
          cancelVideo={cancelVideo}
          error={error}
          videoSrc={videoSrc}
        />
        <Description />
        <ButtonItem
          handleNext={handleNext}
          error={error}
          videoSrc={videoSrc}
          url={url}
          loading={loading}
        />
        <FooterMobile isFixed={true} />
      </main>
    </>
  );
};
export default Upload;
