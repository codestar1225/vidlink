import { atom } from "jotai";
export interface CardType {
  link: string;
  name: string;
  icon: string;
  start: number;
  no: number;
  isPreview: boolean;
}
export const cardAtom = atom<CardType[]>([]);
