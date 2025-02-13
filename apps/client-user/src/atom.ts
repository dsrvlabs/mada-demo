import { atom } from "jotai";

export const activeSectionAtom = atom<string>("dashboard");

export const addressAtom = atom<string>("");

export const loggedInAtom = atom<boolean>(false);
