import { atom } from "jotai";
export interface CardType {
  link: string;
  name: string;
  icon: string;
  start: number;
  no: number;
  isSaved: boolean;
}
export const cardAtom = atom<CardType[]>([]);
