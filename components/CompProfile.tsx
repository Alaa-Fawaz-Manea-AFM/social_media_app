"use client";
import { userBtnPostORLiked } from "@/constant/Constant";
import { Loader, PostDiv, UserInfCercle } from "@/components";
import { useUserContext } from "@/context/MyState";
import { MdKeyboardArrowUp } from "react-icons/md";
import { getUserPostsFun } from "@/constant/api";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import { Edit } from "@/public/assets";
import { IPosts } from "@/types";
import Image from "next/image";
import Link from "next/link";

const CompProfile = ({ profile_id }: { profile_id: string }) => {
  const { posts, userInf }: any = useUserContext();
  const [likedMy, setLikedMy] = useState<IPosts[]>([]);
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const [active, setActive] = useState<string>("Posts");
  const [arrPostsMy, setArrPostsMy] = useState<IPosts[]>([]);

  useEffect(() => {
    const { _arrAllPostsMy, _arrPostsLikedMy } = getUserPostsFun(
      profile_id,
      posts
    );
    setLikedMy(_arrPostsLikedMy);
    setArrPostsMy(_arrAllPostsMy);
  }, [profile_id, posts, active]);

  if (!userInf) return <Loader />;

  return (
    <div className="space-y-10">
      <div className="flex gap-10 flex-col">
        <div className="flex items-center justify-between max-xxs:gap-2 gap-5 w-full">
          <UserInfCercle userId={userInf?.userId} MyPage arr={userInf} />
          <Link
            href={`/update-profile/${profile_id}`}
            className="px-3 py-2 bg-[#1F1F22] h-fit rounded-lg font-semibold flex items-center space-x-2"
          >
            <Image src={Edit} alt="edit" width={25} height={25} />

            <span className="max-xs:hidden">Edit Profile</span>
          </Link>
        </div>
        <div className="flex flex-wrap flex-col gap-5">
          {userInf?.bio?.length > 250 ? (
            <div className="flex flex-col gap-3">
              {seeMore ? userInf?.bio : `${userInf.bio?.slice(0, 250)}...`}
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
            userInf?.bio
          )}
          <div className="flex flex-wrap gap-5">
            <span className="flex items-center gap-1 mt-5">
              <p className="text-[#877EFF]">{userInf?.postsNum}</p> Posts
            </span>
            <span className="flex items-center gap-1 mt-5">
              <p className="text-[#877EFF]">{userInf?.likesMynum}</p>
              Likes
            </span>
            <span className="flex items-center gap-1 mt-5">
              <p className="text-[#877EFF]">{userInf?.followers?.length}</p>
              Followers
            </span>
            <span className="flex items-center gap-1 mt-5">
              <p className="text-[#877EFF]">{userInf?.following?.length}</p>
              Following
            </span>
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-16">
          {userBtnPostORLiked?.map((btn) => (
            <button
              key={btn.name}
              onClick={() => setActive(btn.name)}
              className="flex items-center gap-2"
            >
              <Image
                width={32}
                height={32}
                src={btn.img}
                alt={`post-${btn.name}`}
              />

              <span
                className={`${
                  active == btn.name ? "text-[#877eff]" : "text-white"
                } text-xl`}
              >
                {btn.name}
              </span>
            </button>
          ))}
        </div>
      </div>
      {active == "Posts" ? (
        <div className="flex gap-10 max-sm:justify-center flex-wrap w-full">
          {arrPostsMy?.length == 0 && (
            <div className="mx-auto text-3xl font-semibold">
              You do not have posts
            </div>
          )}
          {arrPostsMy?.map((arr) => (
            <PostDiv key={arr.uidPosts} saved user post={arr} />
          ))}
        </div>
      ) : (
        <div className="flex gap-10 max-sm:justify-center flex-wrap w-full">
          {likedMy?.length == 0 && (
            <div className="mx-auto text-3xl font-semibold">
              You do not have likes
            </div>
          )}
          {likedMy
            ?.sort((a, b) => b.timeLike - a.timeLike)
            .map((arr) => (
              <PostDiv key={arr.uidPosts} post={arr} />
            ))}
        </div>
      )}
    </div>
  );
};

export default CompProfile;
