"use client";
import { useUserContext } from "@/context/MyState";
import { Log_Out } from "@/public/assets";
import { BiLogIn } from "react-icons/bi";
import Image from "next/image";
import { IUser } from "@/types";
import Link from "next/link";

type IBtnLog = {
  userInf: IUser;
  toggleMenu: boolean;
};

const BtnLogOutAndIn = ({ userInf, toggleMenu }: IBtnLog) => {
  const { setUserId }: any = useUserContext();

  const handleSignOut = () => {
    localStorage.clear();
    setUserId("");
  };
  return (
    <>
      {userInf?.uidUser ? (
        <div
          title="Log Out"
          onClick={handleSignOut}
          className="flex items-center ssx:pl-8 gap-3 cursor-pointer"
        >
          <Image
            width={35}
            height={30}
            src={Log_Out}
            alt="Log Out"
            className="cursor-pointer"
          />
          {!toggleMenu && <span className="font-semibold text-xl">LogOut</span>}
        </div>
      ) : (
        <Link
          title="Log in"
          href="/log-in"
          className="flex items-center ssx:pl-8 gap-3 cursor-pointer"
        >
          <BiLogIn size={35} color="#877EFF" />
          {!toggleMenu && <span className="font-semibold text-xl">Log in</span>}
        </Link>
      )}
    </>
  );
};

export default BtnLogOutAndIn;
