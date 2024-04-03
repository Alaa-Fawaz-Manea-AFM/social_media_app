"use client";
import { useUserContext } from "@/context/MyState";
import { Loader, PostDiv } from "@/components";
import { IPosts } from "@/types";

const PostExplore = ({ q }: { q: string }) => {
  const { posts }: any = useUserContext();

  if (posts.length === 0) return <Loader />;

  return (
    <div className="flex w-full flex-wrap gap-5 max-ssx:justify-center">
      {posts
        ?.filter((post: IPosts) =>
          post.caption?.toLowerCase().includes(q?.toLowerCase())
        )
        .map((arr: IPosts) => (
          <PostDiv key={arr.uidPosts} explore saved user post={arr} />
        ))}
    </div>
  );
};

export default PostExplore;
