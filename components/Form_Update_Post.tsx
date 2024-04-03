"use client";
import { IForm_Create_Update_Post, IPosts } from "@/types";
import { handleSubmitUpdatePosts } from "@/constant/api";
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "@/context/MyState";
import { useRouter } from "next-nprogress-bar";
import { BtnCAEd, Loader } from "@/components/index";
import { notFound } from "next/navigation";
import Image from "next/image";

const Form_Update_Post = ({ postId }: { postId: string }) => {
  const { posts, userId }: any = useUserContext();
  const router = useRouter();
  const [valid, setValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [userIdPost, setUserIdPost] = useState<string>("");

  const [form, setForm] = useState<IForm_Create_Update_Post>({
    imgURL: "",
    caption: "",
  });

  useEffect(() => {
    let arrPost: IPosts = posts.find((arr: IPosts) => arr.uidPosts == postId);
    setUserIdPost(arrPost?.userId);

    setForm((pre) => ({
      ...pre,
      imgURL: arrPost?.imgURL,
      caption: arrPost?.caption,
    }));
  }, [posts, postId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { caption, imgURL } = form;

    await handleSubmitUpdatePosts(
      imgURL,
      caption,
      postId,
      router,
      setForm,
      refFiles,
      setValid,
      setLoading
    );
  };
  const handleCancel = () => router.back();

  const refFiles = useRef<HTMLInputElement | null>(null);

  if (userIdPost) {
    if (userIdPost !== userId) return notFound();
  }

  if (posts.loading === 0) return <Loader />;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-20">
      <div className="flex flex-col gap-3">
        <label htmlFor="caption">Caption</label>
        <textarea
          onChange={(e) => {
            setValid(false);
            setForm((pre) => ({
              ...pre,
              caption: e.target.value,
            }));
          }}
          id="caption"
          value={form.caption}
          name="caption"
          cols={30}
          rows={10}
          className="max-h-32 h-32 rounded-3xl bg-[#1F1F22] outline-none border-none p-2"
        />
      </div>
      <div className="w-full h-96 gap-5 justify-center flex-col flex">
        <h2>Add Photos</h2>
        <label
          htmlFor="Add_Photos"
          className="cursor-pointer w-full space-y-5 bg-[#1F1F22] rounded-3xl"
        >
          <div
            className={`${
              form.imgURL ? "h-80 object-cover" : "animate-pulse bg-gray-500"
            } w-full flex items-center justify-center object-cover relative`}
          >
            {form.imgURL && (
              <Image
                fill
                src={
                  typeof form.imgURL == "object"
                    ? URL.createObjectURL(form.imgURL)
                    : form.imgURL
                }
                alt={"addImage"}
                className="object-cover rounded-3xl"
              />
            )}
          </div>
        </label>
        <input
          id="Add_Photos"
          ref={refFiles}
          onChange={(e: any) => {
            setValid(false);
            e.target.files[0] &&
              setForm((pre) => ({
                ...pre,
                imgURL: e.target.files[0],
              }));
          }}
          type="file"
          className="sr-only"
        />
      </div>
      <BtnCAEd
        valid={valid}
        loading={loading}
        title="Edit Post"
        handleCancel={handleCancel}
      />
    </form>
  );
};

export default Form_Update_Post;
