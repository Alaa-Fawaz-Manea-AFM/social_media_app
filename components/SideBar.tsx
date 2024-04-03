"use client";
import { BtnLogOutAndIn, GobackPage, NavLink, UserInfCercle } from "./index";
import { useUserContext } from "@/context/MyState";
import { Logo, Fav_icon } from "@/public/assets";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const SideBar = () => {
  const { userInf }: any = useUserContext();
  const pathname = usePathname();
  const router = useRouter();
  const storage = localStorage.getItem("Toggle_menu_Snapgram");
  const [toggleMenu, setToggleMenu] = useState<boolean>(JSON.parse(storage!));
  const [toggleLogOut, setToggleLogOut] = useState<boolean>(false);

  const handleToggle = () => {
    localStorage.setItem("Toggle_menu_Snapgram", JSON.stringify(!toggleMenu));
    setToggleMenu(!toggleMenu);
  };

  let GoBack = /[^/]/gi.test(pathname);

  return (
    <div className="relative">
      <div
        className={`${
          toggleMenu ? "ssx:w-[120px]" : "ssx:w-[250px]"
        } duration-300 justify-between items-center flex max-ssx:fixed bg-black/50 z-[1020] top-0 w-full max-w-screen-xl xxs:flex gap-5 ssx:flex-col ssx:h-screen ssx:items-start pb-5`}
      >
        <div
          onClick={() => router.push("/")}
          className="ssx:flex ssx:items-center ssx:justify-center w-full ssx:pt-10 px-5 py-2 cursor-pointer"
        >
          <Image
            width={!toggleMenu ? 170 : 48}
            height={!toggleMenu ? 85 : 48}
            src={!toggleMenu ? Logo : Fav_icon}
            alt="snapgram"
            className={`${toggleMenu ? "mr-5" : ""} max-ssx:hidden`}
          />
          <Image
            src={Logo}
            alt="snapgram"
            width={200}
            height={36}
            className="ssx:hidden"
          />
        </div>
        <div className="flex flex-row-reverse ssx:h-full ssx:flex-col ssx:justify-between gap-2">
          <div className="flex relative items-center justify-center gap-2 max-ssx:pr-5">
            {!userInf ? (
              <>
                <span className="flex items-center justify-center font-semibold bg-green-700 rounded-full text-xl w-10 h-10 ssx:w-12 ssx:h-12">
                  G
                </span>

                {!toggleMenu && (
                  <div className="flex flex-col max-ssx:hidden">
                    <h2>hi, Guest</h2>
                    <span className="text-[#7878A3]">@Guest</span>
                  </div>
                )}
              </>
            ) : (
              <div className="relative flex items-center gap-2">
                <span
                  onClick={() => router.push(`/profile/${userInf?.uidUser}`)}
                  className="flex items-center justify-center font-semibold bg-green-700 rounded-full text-xl w-10 h-10 ssx:w-12 ssx:h-12 cursor-pointer max-ssx:hidden"
                >
                  {userInf?.name?.slice(0, 1).toUpperCase()}
                </span>

                <span
                  onClick={() => setToggleLogOut((pre) => !pre)}
                  className="flex items-center justify-center font-semibold bg-green-700 rounded-full text-xl w-10 h-10 ssx:w-12 ssx:h-12 cursor-pointer ssx:hidden"
                >
                  {userInf?.name?.slice(0, 1).toUpperCase()}
                </span>
                {toggleLogOut ? (
                  <div className="absolute space-y-10 p-10 right-5 rounded-xl top-10 ssx:hidden sidebar bg-gray-gradient">
                    <UserInfCercle arr={userInf} userId={userInf?.uidUser} />
                    <BtnLogOutAndIn userInf={userInf} toggleMenu={toggleMenu} />
                  </div>
                ) : (
                  ""
                )}

                {!toggleMenu && (
                  <div className="flex items-center flex-col max-ssx:hidden">
                    <h2>{userInf?.name}</h2>
                    <span className="text-[#7878A3]">@{userInf?.name}</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <ul className="max-ssx:fixed max-ssx:grid max-ssx:grid-cols-5 left-0 bottom-0 px-5 bg-black/50 z-[1020] w-full ssx:my-5 ssx:flex ssx:flex-col ssx:h-full gap-2 ssx:gap-10">
            <NavLink toggleMenu={toggleMenu} pathname={pathname} />
          </ul>
          <div className="max-ssx:hidden">
            <BtnLogOutAndIn userInf={userInf} toggleMenu={toggleMenu} />
          </div>
        </div>
      </div>
      {/* Go back and toggle btn */}
      <>
        <span
          onClick={handleToggle}
          className="absolute z-[1020] max-ssx:hidden p-2 top-10 right-0 cursor-pointer"
        >
          <GiHamburgerMenu size={30} />
        </span>
        {GoBack ? <GobackPage /> : ""}
      </>
    </div>
  );
};

export default SideBar;
