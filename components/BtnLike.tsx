"use client";
import { handleAddLikes, handleRemovelikes } from "@/constant/api";
import { abbreviateNumber } from "js-abbreviation-number";
import { Like_Icon, Liked_Icon } from "@/public/assets";
import { useUserContext } from "@/context/MyState";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useState } from "react";
import { IPosts } from "@/types";
import Image from "next/image";

const BtnLike = ({ ArrLike }: { ArrLike: IPosts }) => {
  const { user, userInf }: any = useUserContext();
  const router = useRouter();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(
      ArrLike?.likes?.some((like) => like.userIdLike === userInf?.uidUser)
    );
  }, [ArrLike]);

  const handleBtnRout = () => {
    if (userInf?.uidUser) {
      if (liked) return handleRemovelikes(ArrLike, userInf, user);
      return handleAddLikes(ArrLike, userInf, user);
    }
    return router.push("/log-in");
  };

  return (
    <div className="flex items-center gap-1">
      <Image
        onClick={handleBtnRout}
        src={liked ? Liked_Icon : Like_Icon}
        alt="liked"
        width={32}
        height={32}
        className="cursor-pointer"
      />

      {abbreviateNumber(ArrLike?.countLiked, 2)}
    </div>
  );
};

export default BtnLike;
