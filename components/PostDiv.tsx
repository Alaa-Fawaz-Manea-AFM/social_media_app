import { handleNavigate } from "@/constant/api";
import { useRouter } from "next-nprogress-bar";
import BtnSeved from "./BtnSaved";
import { IPosts } from "@/types";
import BtnLike from "./BtnLike";
import Image from "next/image";

type IPostDiv = {
  post: IPosts;
  user?: boolean;
  saved?: boolean;
  explore?: boolean;
};

const PostDiv = ({ post, user, saved, explore }: IPostDiv) => {
  let userId = JSON.parse(localStorage.getItem("user_SocialMedia")!);
  const router = useRouter();

  const handleNavigateFun = () => handleNavigate(post.userId, userId, router);

  return (
    <div className="h-[250px] w-11/12 sm:w-[250px] overflow-hidden rounded-xl relative">
      <Image
        fill
        onClick={() => router.push(`/post-info/${post?.uidPosts}`)}
        src={post?.imgURL}
        alt="Snapgram Image"
        className="object-cover cursor-pointer"
      />

      <div className="justify-between absolute bottom-0 w-full h-10 bg-black/50 flex items-center px-2">
        {explore && (
          <div className="flex items-center gap-2">
            <span
              onClick={handleNavigateFun}
              className="flex items-center justify-center font-semibold bg-green-700 rounded-full text-xl w-8 h-8 cursor-pointer"
            >
              {post.name?.slice(0, 1).toUpperCase()}
            </span>
            <span className="font-semibold text-left">
              {post.name?.length > 10
                ? `${post.name.slice(0, 10)}...`
                : post.name}
            </span>
          </div>
        )}
        <div
          className={`${
            explore ? "gap-2" : "justify-between w-full"
          } flex items-center`}
        >
          {user ? (
            <BtnLike ArrLike={post} />
          ) : (
            <div
              onClick={handleNavigateFun}
              className="flex items-center justify-center font-semibold bg-green-700 rounded-full w-7 h-7 cursor-pointer"
            >
              {post.name?.slice(0, 1).toUpperCase()}
            </div>
          )}
          {saved ? <BtnSeved ArrSaved={post} /> : ""}
        </div>
      </div>
    </div>
  );
};

export default PostDiv;
