import { CardType } from "@/store";

//upload video
export type UploadVideoSuccess = {
  message: string;
  status: number;
  videoLink: string;
  duration: number;
};

export type UploadVideoError = {
  message: string;
  status?: number;
};
//publish video
export interface PublishSuccess {
  videoLink: string;
  duration: number;
  title:string
  cards: CardType[];
  message: string;
  status: number;
}
export interface PublishError {
  message: string;
  status?: number;
}
