"use client";
import { BtnLike, PostDiv, BtnSaved, UserInfCercle } from "@/components";
import { getDataPost, handleRemovePosts } from "@/constant/api";
import { useUserContext } from "@/context/MyState";
import { MdKeyboardArrowUp } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { Delete, Edit } from "@/public/assets";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useState } from "react";
import { IPosts } from "@/types";
import Image from "next/image";
import Link from "next/link";

const CompPostInfo = ({ post_id }: { post_id: string }) => {
  const { posts, userInf }: any = useUserContext();
  const router = useRouter();
  const [post, setPost] = useState<IPosts | any>({});
  const [postsAll, setPostsAll] = useState<IPosts[]>([]);
  const [seeMore, setSeeMore] = useState<boolean>(false);

  useEffect(() => {
    const { _post, _allPosts } = getDataPost(posts, post_id);
    setPost(_post);
    setPostsAll(_allPosts);
  }, [post_id, posts]);

  const handleRemovePostsFun = () =>
    handleRemovePosts(router, userInf, post.likes.length, post_id);
  return (
    <div className="h-screen overflow-y-scroll pb-28 max-ssx:pt-20 ssx:pb-20 max-w-5xl mx-auto ssx:mx-0 ssx:py-12">
      <div className="flex gap-10 max-md:flex-wrap pb-10">
        <div className="relative h-[300px] max-ss:w-11/12 ss:w-[500px] max-sm:mx-auto rounded-md max-sm:w-full">
          <Image
            fill
            src={post?.imgURL}
            alt="image snapgram"
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex gap-5 flex-col md:h-[300px] w-[300px] max-md:w-[500px] max-sm:w-11/12 md:justify-between max-md:space-y-5 max-sm:mx-auto">
          <div className="flex flex-col gap-5 px-2">
            <div className="flex items-center justify-between">
              <UserInfCercle arr={post} userId={userInf?.uidUser} time />
              {post?.userId == userInf?.uidUser && (
                <div className="space-x-2 flex">
                  <Image
                    onClick={handleRemovePostsFun}
                    src={Delete}
                    alt="Delete"
                    width={32}
                    height={32}
                    className="cursor-pointer"
                  />
                  <Link href={`/update-post/${post?.uidPosts}`}>
                    <Image src={Edit} alt="Edit" width={32} height={32} />
                  </Link>
                </div>
              )}
            </div>
            <p>
              {post?.caption?.length > 280 ? (
                <div className="flex flex-col gap-3">
                  {seeMore ? post.caption : `${post.caption.slice(0, 280)}...`}
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
                post?.caption
              )}
            </p>
          </div>

          {post && (
            <div className="flex items-center justify-between px-2">
              <BtnLike ArrLike={post} />
              <BtnSaved ArrSaved={post} />
            </div>
          )}
        </div>
      </div>

      <div className="flex max-sm:justify-center gap-5 flex-wrap w-full mt-5">
        <div className="w-11/12 mb-20 mt-10 h-0.5 bg-[#877EFF]" />
        {postsAll?.map((arr) => (
          <PostDiv key={arr.uidPosts} saved user post={arr} />
        ))}
      </div>
    </div>
  );
};

export default CompPostInfo;
