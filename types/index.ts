import { Timestamp } from "firebase/firestore";

export type INavLink = {
  icon: JSX.Element;
  name: string;
  cat: string;
};

export type IFormLog_In = {
  email: string;
  password: string;
};

export type IFormSign_up = {
  bio: string;
  name: string;
  email: string;
  userName: string;
};

export type IUserInfCercle = {
  arr: IUser | IPosts;
  col?: boolean;
  home?: boolean;
  time?: boolean;
  userId: string;
  MyPage?: boolean;
};

export type IPosts = {
  date: string;
  name: string;
  imgURL: string;
  userId: string;
  time: Timestamp;
  uidUser: string;
  caption: string;
  uidPosts: string;
  timeLike: number;
  timeSave: number;
  userName: string;
  countLiked: number;
  likes: { userIdLike: string }[];
  saved: { userIdSave: string; userIdLike: string }[];
};

export type IUser = {
  bio: string;
  name: string;
  date: string;
  email: string;
  userId: string;
  uidUser: string;
  time: Timestamp;
  postsNum: number;
  userName: string;
  likesMynum: number;
  followers: string[];
  following: string[];
};
//  1
export type IForm_Create_Update_Post = {
  imgURL: string | File;
  caption: string;
};

export type IEditProfileInput = {
  label: string;
  name: string;
  type?: string;
};

export type IUserBtnPostORLiked = {
  name: string;
  img: string;
};
