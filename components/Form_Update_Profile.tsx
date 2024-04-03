"use client";
import { handleSubmitUpdateProfile } from "@/constant/api";
import { useUserContext } from "@/context/MyState";
import { useRouter } from "next-nprogress-bar";
import { BtnCAEd, Loader } from "@/components/index";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { IFormSign_up } from "@/types";

const Form_Update_Profile = ({
  updat_profile_id,
}: {
  updat_profile_id: string;
}) => {
  const { userInf, posts }: any = useUserContext();
  const router = useRouter();
  const [valid, setValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<IFormSign_up>({
    bio: "",
    name: "",
    email: "",
    userName: "",
  });

  useEffect(() => {
    setForm({
      bio: userInf?.bio,
      name: userInf?.name,
      email: userInf?.email,
      userName: userInf?.userName,
    });
  }, [userInf]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValid(false);
    setForm((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleEditeProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmitUpdateProfile(
      form,
      posts,
      userInf.uidUser,
      router,
      setValid,
      setLoading
    );
  };

  const handleCancel = () => router.back();

  if (userInf?.uidUser) {
    if (updat_profile_id !== userInf?.uidUser) return notFound();
  }

  if (!userInf) return <Loader />;

  return (
    <div className="space-y-10">
      <span className="flex items-center justify-center font-semibold bg-green-700 rounded-full text-3xl w-16 h-16 cursor-pointer">
        {form?.name?.slice(0, 1)?.toUpperCase()}
      </span>

      <form onSubmit={handleEditeProfile} className="flex flex-col gap-7">
        <div className="space-y-3">
          <label htmlFor="Name">Name</label>
          <input
            id="Name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="outline-none font-semibold sm:text-sm rounded-lg border border-transparent focus:border-[#877EFF] w-full p-2.5"
          />
        </div>

        <div className="space-y-3">
          <label htmlFor="UserName">UserName</label>
          <input
            id="UserName"
            name="userName"
            type="text"
            value={form.userName}
            onChange={handleChange}
            className="outline-none font-semibold sm:text-sm rounded-lg border border-transparent focus:border-[#877EFF] w-full p-2.5"
          />
        </div>

        <div className="space-y-3">
          <label htmlFor="Bio">Bio</label>
          <textarea
            value={form.bio}
            onChange={handleChange}
            name="bio"
            id="Bio"
            cols={10}
            rows={10}
            className="outline-none font-semibold sm:text-sm rounded-lg border border-transparent focus:border-[#877EFF] w-full p-2.5 max-h-20"
          />
        </div>

        <div className="space-y-3">
          <label htmlFor="Email">Email</label>
          <input
            id="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="outline-none font-semibold sm:text-sm rounded-lg border border-transparent focus:border-[#877EFF] w-full p-2.5"
          />
        </div>

        <BtnCAEd
          loading={loading}
          valid={valid}
          title="Edite Profile"
          handleCancel={handleCancel}
        />
      </form>
    </div>
  );
};

export default Form_Update_Profile;
