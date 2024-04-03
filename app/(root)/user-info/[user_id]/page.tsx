"use client";
import { BtnFollow, Loader, PostDiv, UserInfCercle } from "@/components";
import { useUserContext } from "@/context/MyState";
import { MdKeyboardArrowUp } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import { IPosts, IUser } from "@/types";

type IParamsUser_Id = {
  params: { user_id: string };
};

const UserInfoPage = ({ params: { user_id } }: IParamsUser_Id) => {
  const { user, posts, userId }: any = useUserContext();
  const [usInf, setUsInf] = useState<IUser | any>({});
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const [arrPostsMy, setArrPostsMy] = useState<IPosts[]>([]);

  useEffect(() => {
    setArrPostsMy(posts.filter((arr: IPosts) => arr.userId == user_id));
    let _user = user.find(
      ({ uidUser }: { uidUser: string }) => uidUser == user_id
    );
    setUsInf(_user);
  }, [user_id, user, posts]);

  if (!usInf) return <Loader />;

  return (
    <div className="h-screen overflow-y-scroll max-w-5xl px-2 xxs:px-5 mx-auto space-y-10 max-ssx:pb-24 pb-20 max-ssx:pt-20 py-10">
      <div className="flex gap-10 flex-col">
        <div className="flex items-center justify-between max-xxs:gap-2 gap-5 w-full md:w-4/5">
          <UserInfCercle userId={user_id} MyPage arr={usInf} />
          <BtnFollow userId={userId} id={user_id} usInf={usInf} />
        </div>

        <div className="flex flex-wrap flex-col gap-5">
          {usInf?.bio?.length > 250 ? (
            <div className="flex flex-col gap-3">
              {seeMore ? usInf?.bio : `${usInf?.bio.slice(0, 250)}...`}
              <button
                className={`${
                  seeMore ? "text-[#EF4444]" : "text-[#22C55E]"
                } w-fit flex gap-2 items-center`}
                onClick={() => setSeeMore(!seeMore)}
              >
                {seeMore ? (
                  <>
                    <MdKeyboardArrowUp /> See Less
                  </>
                ) : (
                  <>
                    <IoIosArrowDown /> See More
                  </>
                )}
              </button>
            </div>
          ) : (
            usInf?.bio
          )}
          <div className="flex flex-wrap gap-5">
            <span className="flex items-center gap-1 mt-5">
              <p className="text-[#877EFF]">{usInf?.postsNum}</p> Posts
            </span>
            <span className="flex items-center gap-1 mt-5">
              <p className="text-[#877EFF]">{usInf?.likesMynum}</p>
              Likes
            </span>
            <span className="flex items-center gap-1 mt-5">
              <p className="text-[#877EFF]">{usInf?.followers?.length}</p>
              Followers
            </span>
            <span className="flex items-center gap-1 mt-5">
              <p className="text-[#877EFF]">{usInf?.following?.length}</p>
              Following
            </span>
          </div>
        </div>
      </div>
      <div className="flex max-sm:justify-center gap-5 flex-wrap w-full">
        {arrPostsMy?.map((arr) => (
          <PostDiv key={arr.uidPosts} saved user post={arr} />
        ))}
        {arrPostsMy?.length == 0 && (
          <div className="mx-auto text-3xl font-semibold">He has no posts</div>
        )}
      </div>
    </div>
  );
};

export default UserInfoPage;
