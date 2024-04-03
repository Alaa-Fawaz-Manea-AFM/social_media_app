"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getPostsData, getUserData, getUserInfoAll } from "@/constant/api";
import { IPosts, IUser } from "@/types";

type IValue = {
  user: IUser[];
  posts: IPosts[];
  userId: string;
  userInf: IUser;
  setUserId: Dispatch<SetStateAction<string>>;
  userEmail: string;
  setUserEmail: Dispatch<SetStateAction<string>>;
};

const MyContext = createContext<IValue | null>(null);

export const useUserContext = () => useContext(MyContext);

const MyState = ({ children }: { children: React.ReactNode }) => {
  const [userEmail, setUserEmail] = useState<string>("");

  const [userId, setUserId] = useState("");

  const [user, setUser] = useState<IUser[]>([]);
  const [posts, setPosts] = useState<IPosts[]>([]);
  useEffect(() => {
    getUserData(setUser);
    getPostsData(setPosts);
    setUserId(JSON.parse(localStorage.getItem("user_SocialMedia")!));
  }, []);

  const [userInf, setUserInf] = useState<IUser | any>({});

  useEffect(() => {
    const { _userInfo } = getUserInfoAll(user, userId);
    setUserInf(_userInfo);
  }, [userId, user]);

  const value = {
    user,
    posts,
    userId,
    userInf,
    setUserId,
    userEmail,
    setUserEmail,
  };
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export default MyState;
