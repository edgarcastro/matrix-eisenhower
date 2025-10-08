import { getDatabase, ref, set, get } from "firebase/database";
import { EisenhowerList } from "./types";

export function writeEisenhowerList(userId: string, list: EisenhowerList) {
  const db = getDatabase();
  set(ref(db, "lists/" + userId), {
    list: list,
  });
}

export async function readEisenhowerList(userId: string) {
  const db = getDatabase();
  const list = await get(ref(db, "lists/" + userId));
  return list.val();
}
