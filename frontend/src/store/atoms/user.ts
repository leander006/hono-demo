
import { atom } from "recoil";

export const userAtom = atom({
  key: "userAtom",
  default: JSON.parse(<string>localStorage.getItem("user")),
});
