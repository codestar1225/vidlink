"use client";
import FooterMobile from "@/app/_components/layout/mobile/footer";
import { ChangeEvent, useRef } from "react";
import ReactPlayer from "react-player";
import Description from "./description";
import FileUpload from "./fileUpload";
import ButtonItem from "./buttonItem";
import LinkUpload from "./linkUpload";
import { useAtom } from "jotai";
import { cardAtom, CardType } from "@/store";
import useVideo from "@/hooks/useVideo";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { removeItem, setItem } from "@/utils/localstorage";

interface Type {
  validateVideo(value: ChangeEvent<HTMLInputElement>): void;
  setVideoLink(value: string): void;
  setEdit(value: string): void;
  setUrl(value: string): void;
  cancelVideo(): void;
  setDuration(value: number): void;
  setFile(value: File): void;
  setTitle(value: string): void;
  setUserName(value: string): void;
  setEditSignal(value: boolean): void;
  videoSrc: string | null;
  error: string;
  url: string;
  fileDuration: number;
  uploadedFile: File | null;
}
const Upload: React.FC<Type> = ({
  validateVideo,
  setVideoLink,
  setEdit,
  setUrl,
  cancelVideo,
  setDuration,
  // setFile,
  setTitle,
  setUserName,
  setEditSignal,
  videoSrc,
  error,
  url,
  fileDuration,
  uploadedFile,
}) => {
  const videoRef = useRef<ReactPlayer>(null);
  const [, setCards] = useAtom<CardType[]>(cardAtom);
  const { getUserName, storeVideoFile, loading } = useVideo();
  const router = useRouter();

  const handleNext = async () => {
    const res = await getUserName();
    if (res.status === 200 && "userName" in res) {
      if (res.userName.trim() === "") {
        alert("You must set a username before creating your first video.");
        Cookies.set("isUploadUrl", JSON.stringify(true), { expires: 1 });
        return router.push("/settings");
      } else {
        setUserName(res.userName);
      }
    } else {
      return alert(res.message);
    }
    if (videoSrc && url) {
      return alert("Please input one of them.");
    } else if (videoSrc && uploadedFile) {
      // setVideoLink(videoSrc);
      // setDuration(fileDuration);
      // setFile(uploadedFile);
      const file = new FormData();
      file.append("file", uploadedFile);
      const res = await storeVideoFile(file);
      if (res.status === 200 && "videoLink" in res) {
        setVideoLink(res.videoLink);
        setDuration(fileDuration);
        setItem("onlineVideo", res.videoLink);
        setItem("duration", fileDuration);
      } else {
        alert(res.message);
        return;
      }
    } else if (url) {
      const linkDuration = videoRef.current?.getDuration();
      if (linkDuration === null || linkDuration === undefined) {
        return alert(
          "Please enter a valid link. Or please check your network connection."
        );
      } else {
        setDuration(linkDuration);
        setVideoLink(url);
        setItem("onlineVideo", url);
        setItem("duration", linkDuration);
      }
    } else {
      return alert("Please enter a file or a link.");
    }
    setEdit("add");
    setCards([]);
    setTitle("");
    removeItem('cards')
    removeItem('title')
    setItem("editStatus", "add");
  };

  return (
    <>
      <ReactPlayer
        ref={videoRef}
        preload="metadata"
        url={url}
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
