"use client";
import {
  BtnLike,
  BtnSaved,
  Loader,
  UserInfCercle,
  InfiniteScrollList,
} from "@/components";
import { useUserContext } from "@/context/MyState";
import { MdKeyboardArrowUp } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IPosts, IUser } from "@/types";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CompHomePage = () => {
  const { user, posts, userId }: any = useUserContext();
  const [data, setData] = useState<IPosts[]>([]);
  const [seeMore, setSeeMore] = useState<boolean>(false);

  if (posts.length === 0) return <Loader />;

  return (
    <div className="flex h-screen ssx:py-10">
      <InfiniteScrollList
        className="flex-[1.5] space-y-5 overflow-y-scroll pb-20 max-ssx:pb-28 max-ssx:pt-20"
        loader={<Loader sideBar />}
        data={posts}
        next={(data: IPosts[]) => setData(data)}
        limit={3}
        endMessage="End page..."
      >
        {data.map((post) => (
          <div
            key={post.uidPosts}
            className="flex flex-col gap-5 justify-center text-start bg-whit max-w-md mx-auto"
          >
            <div className="px-5 xs:px-0 space-y-5">
              <UserInfCercle arr={post} userId={userId} time />
              <p>
                {post.caption?.length > 130 ? (
                  <div className="flex flex-col gap-3">
                    {seeMore
                      ? post.caption
                      : `${post.caption.slice(0, 130)}...`}
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
                  post.caption
                )}
              </p>
            </div>
            <Link
              href={`/post-info/${post.uidPosts}`}
              className="relative w-full h-[280px] block"
            >
              <Image
                src={post.imgURL}
                alt={post.caption}
                fill
                className="mx-auto rounded-lg cursor-pointer object-cover"
              />
            </Link>
            <div className="flex justify-between px-2">
              <BtnLike ArrLike={post} />
              <BtnSaved ArrSaved={post} />
            </div>
          </div>
        ))}
      </InfiniteScrollList>
      <div className="space-y-20 flex-[0.75] overflow-y-scroll h-screen max-sm:hidden gap-10 pb-20 max-ssx:pb-28 max-ssx:pt-20">
        {user.length > 0 && (
          <h2 className="text-xl font-semibold">Top Creators</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-items-center items-center gap-y-20">
          {user?.slice(0, 5).map((arr: IUser) => (
            <UserInfCercle
              home
              col
              key={arr.uidUser}
              arr={arr}
              userId={userId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompHomePage;
