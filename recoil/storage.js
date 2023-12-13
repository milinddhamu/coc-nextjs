import { atom } from "recoil";
// configs/recoil.ts
import { RecoilEnv } from 'recoil';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
export  const commentState = atom({
  key: "comment",
  default: [],
});

export const userState = atom({
  key: "user",
  default: null,
});

export const teamState = atom({
  key:"TeamList",
  default:[],
})

export const locationsState = atom({
  key:"Locations",
  default:[],
})

