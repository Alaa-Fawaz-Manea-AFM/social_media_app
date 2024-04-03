"use client";
import { useUserContext } from "@/context/MyState";
import { FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from "next-nprogress-bar";
import { handleLogin } from "@/constant/api";
import { FaRegEye } from "react-icons/fa6";
import { BtnCAEd } from "@/components";
import { IFormLog_In } from "@/types";
import { useState } from "react";

const Form_Log_in = () => {
  const { userEmail, setUserEmail, setUserId }: any = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [shoPass, setShoPass] = useState<boolean>(false);
  const router = useRouter();

  const [form, setForm] = useState<IFormLog_In>({
    email: userEmail || "",
    password: "",
  });

  const handleLoginFun = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(form, router, setUserId, setLoading, setUserEmail);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((pre) => ({ ...pre, [e.target.name]: e.target.value }));

  return (
    <form onSubmit={handleLoginFun} className="space-y-7">
      <div className="space-y-1">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="outline-none font-semibold sm:text-sm rounded-lg border border-transparent focus:border-[#877EFF] w-full p-2.5"
        />
      </div>
      <div className="space-y-3 relative">
        <label htmlFor="password">password</label>
        <input
          id="password"
          name="password"
          type={shoPass ? "text" : "password"}
          value={form.password}
          onChange={handleChange}
          className="outline-none font-semibold sm:text-sm rounded-lg border border-transparent focus:border-[#877EFF] w-full p-2.5"
        />
        <span
          onClick={() => setShoPass(!shoPass)}
          className="absolute bottom-2.5 right-2 text-[#877EFF]"
        >
          {shoPass ? <FaRegEye size={25} /> : <FaRegEyeSlash size={25} />}
        </span>
      </div>
      <BtnCAEd loading={loading} title="Sign Up" NoCancel />
    </form>
  );
};

export default Form_Log_in;
