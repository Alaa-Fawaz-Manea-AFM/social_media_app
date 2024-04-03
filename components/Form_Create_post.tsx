"use client";
import { handleSubmitCreatePosts } from "@/constant/api";
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "@/context/MyState";
import { IForm_Create_Update_Post } from "@/types";
import { useRouter } from "next-nprogress-bar";
import { File_Upload } from "@/public/assets";
import { BtnCAEd } from "@/components/index";
import Image from "next/image";

const Form_Create_post = () => {
  const { userInf }: any = useUserContext();
  const [form, setForm] = useState<IForm_Create_Update_Post>({
    imgURL: "",
    caption: "",
  });
  const [valid, setValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (form.imgURL && form.caption && userInf?.uidUser) {
      return setValid(false);
    }
  }, [form]);

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmitCreatePosts(
      form,
      router,
      userInf,
      setForm,
      setValid,
      setLoading
    );
  };

  const refFiles = useRef<any>();

  const handleCancel = () => {
    if (!loading) {
      refFiles.current.value = "";
      setForm({ imgURL: "", caption: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-20">
      <div className="flex flex-col gap-3">
        <label htmlFor="caption">Caption</label>
        <textarea
          onChange={(e) =>
            setForm((pre) => ({ ...pre, caption: e.target.value }))
          }
          id="caption"
          value={form?.caption}
          name="caption"
          cols={30}
          rows={10}
          className="max-h-32 h-32 rounded-3xl bg-[#1F1F22] outline-none border-none p-2"
        />
      </div>
      <div className="w-full max-h-96 gap-5 justify-center flex-col flex">
        <h2>Add Photos</h2>
        <label
          htmlFor="file"
          className="cursor-pointer w-full space-y-5 bg-[#1F1F22] rounded-3xl"
        >
          <div className="w-full h-80 flex items-center justify-center">
            <div
              className={`${
                form?.imgURL ? "h-80 object-cover" : "h-32"
              } w-full flex items-center justify-center object-cover relative`}
            >
              {form?.imgURL ? (
                <Image
                  src={
                    !form?.imgURL
                      ? File_Upload
                      : URL.createObjectURL(form.imgURL as any)
                  }
                  fill
                  alt="addImage"
                  className="object-cover rounded-3xl"
                />
              ) : (
                <Image src={File_Upload} fill alt="addImage" />
              )}
            </div>
          </div>
        </label>
        <input
          ref={refFiles}
          onChange={(e: any) => {
            setForm((pre) => ({
              ...pre,
              imgURL: e.target.files[0],
            }));
          }}
          id="file"
          type="file"
          accept="image/.png, image/.jpeg, image/.jpg"
          className="sr-only"
        />
      </div>

      <BtnCAEd
        loading={loading}
        valid={valid}
        title="Create Post"
        handleCancel={handleCancel}
      />
    </form>
  );
};

export default Form_Create_post;
