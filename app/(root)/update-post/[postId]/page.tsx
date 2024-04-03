import { Form_Update_Post } from "@/components";
import { Edit } from "@/public/assets";
import { Metadata } from "next";
import Image from "next/image";

type IUpdatePost = { params: { postId: string } };

export const metadata: Metadata = {
  title: "Update Post",
  description: "Page Update Posts",
};

const UpdatePostPage = ({ params: { postId } }: IUpdatePost) => (
  <div className="h-screen overflow-y-scroll max-ssx:pb-56 max-ssx:pt-20 max-w-5xl py-10 mx-auto">
    <div className="flex items-center gap-5 mb-10">
      <span>
        <Image src={Edit} alt="edit" width={30} height={30} />
      </span>
      <h2 className="text-2xl font-semibold">Edit Post</h2>
    </div>

    <Form_Update_Post postId={postId} />
  </div>
);

export default UpdatePostPage;
