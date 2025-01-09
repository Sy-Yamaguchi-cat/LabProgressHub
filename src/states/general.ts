import { atom, createStore } from "jotai";

const store = createStore();

function getToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export const todayAtom = atom(getToday());

setInterval(() => store.set(todayAtom, getToday), 60 * 60 * 1000);
