"use client";
import { handleAddFollowing, handleRemoveFollowing } from "@/constant/api";
import { useRouter } from "next-nprogress-bar";
import { IUser } from "@/types";

type IBtnFollow = {
  id: string;
  usInf: IUser;
  userId: string;
};

const BtnFollow = ({ usInf, userId, id }: IBtnFollow) => {
  const handleAddFollowingFun = async () => handleAddFollowing(userId, id);
  const handleRemoveFollowingFun = async () =>
    handleRemoveFollowing(usInf, userId);
  const router = useRouter();

  const isFollowing = usInf?.followers?.includes(userId);

  const handleButtonClick = () => {
    if (!userId) {
      router.push("/log-in");
    } else {
      isFollowing ? handleRemoveFollowingFun() : handleAddFollowingFun();
    }
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className="px-5 py-2 bg-[#877EFF] h-fit rounded-lg font-semibold"
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
};

export default BtnFollow;
