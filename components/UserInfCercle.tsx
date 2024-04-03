"use client";
import { formateDate, handleNavigate } from "@/constant/api";
import { useRouter } from "next-nprogress-bar";
import { IUserInfCercle } from "@/types";

const UserInfCercle = ({
  col,
  arr,
  home,
  time,
  userId,
  MyPage,
}: IUserInfCercle) => {
  const router = useRouter();
  let userIdAll: string = arr?.uidUser || arr?.userId;
  let sliceName = home ? 10 : 20;

  return (
    <div
      onClick={() => (MyPage ? "" : handleNavigate(userIdAll, userId, router))}
      className={`${col ? "flex-col" : ""} ${
        time ? "" : " text-center"
      } flex items-center ${MyPage ? "" : "cursor-pointer"} gap-2 w-fit`}
    >
      <div className="flex items-center justify-center font-semibold bg-green-700 rounded-full text-3xl w-12 h-12">
        {arr?.name?.slice(0, 1).toUpperCase()}
      </div>
      <div className={`${col ? "" : "items-start"} flex flex-col`}>
        <span>
          {arr?.name?.length > sliceName
            ? `${arr.name.slice(0, sliceName)}...`
            : arr?.name}
        </span>
        {time ? (
          <span className="text-[#7878A3]">
            <b className="text-gray-400 mr-1">•</b>
            {formateDate(arr?.date)}
          </span>
        ) : (
          <span className="text-[#7878A3]">
            @
            {arr?.userName?.length > sliceName
              ? `${arr.userName.slice(0, sliceName)}...`
              : arr?.userName}
          </span>
        )}
      </div>
    </div>
  );
};

export default UserInfCercle;
