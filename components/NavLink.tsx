"use client";
import { navLink } from "@/constant/Constant";
import { useEffect, useState } from "react";
import Link from "next/link";

const NavLink = ({
  pathname,
  toggleMenu,
}: {
  pathname: string;
  toggleMenu: boolean;
}) => {
  const [toggle, setToggle] = useState<string>("");

  useEffect(() => {
    setToggle(pathname?.slice(1));
  }, [pathname]);

  return (
    <>
      {navLink.map((arr) => (
        <li
          title={arr.name}
          onClick={() => {
            setToggle(arr.cat);
          }}
          key={arr.name}
        >
          <Link
            aria-label={arr.cat}
            href={`/${arr.cat}`}
            className={`${
              toggle == arr.cat ? "bg-[#877EFF]" : ""
            } ssx:w-full hover:bg-[#877EFF] flex py-2 px-3 ssx:gap-5 items-center rounded-lg group cursor-pointer max-ssx:flex-col max-ssx:h-fit max-ssx:text-center gap-2`}
          >
            <span
              className={`${
                toggle == arr.cat ? "text-white" : "text-[#877EFF]"
              } group-hover:text-white`}
            >
              {arr.icon}
            </span>
            {!toggleMenu && (
              <span className="font-semibold max-ssx:text-xs text-base tracking-wider">
                {arr.name}
              </span>
            )}
          </Link>
        </li>
      ))}
    </>
  );
};

export default NavLink;
