"use client";
import { useUserContext } from "@/context/MyState";
import { useEffect, useState } from "react";
import { Save_Icon } from "@/public/assets";
import { Loader, PostDiv } from "@/components";
import { IPosts } from "@/types";
import Image from "next/image";

const CompSaved = () => {
  const { posts, userId }: any = useUserContext();
  const [saved, setSaved] = useState<IPosts[]>([]);

  useEffect(() => {
    let arrPosts: IPosts[] = [];
    posts.forEach((arr: IPosts) =>
      arr.saved?.filter(
        (filter) =>
          filter.userIdSave === userId && arrPosts.push({ ...arr, ...filter })
      )
    );
    setSaved(arrPosts);
  }, [posts, userId]);

  return (
    <div className="h-screen overflow-y-scroll pb-28 pt-12 ssx:py-12 ">
      {saved?.length === 0 ? (
        <div className="flex items-center justify-center pt-20 text-3xl font-semibold">
          There is no saving
        </div>
      ) : (
        <div className="space-y-10">
          <div className="max-ssx:pl-5 flex items-center gap-2">
            <Image src={Save_Icon} alt="Save_Icon" width={25} height={25} />

            <h2 className="font-semibold text-2xl">Saved Posts</h2>
          </div>
          <div className="flex max-ssx:justify-center flex-wrap gap-5">
            {saved
              ?.sort((a, b) => b.timeSave - a.timeSave)
              .map((arr) => (
                <PostDiv key={arr.uidPosts} saved post={arr} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompSaved;
