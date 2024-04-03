"use client";
import { EditProfileInput } from "@/constant/Constant";
import { useUserContext } from "@/context/MyState";
import { FaRegEyeSlash } from "react-icons/fa";
import { handleSignUp } from "@/constant/api";
import { useRouter } from "next-nprogress-bar";
import { FaRegEye } from "react-icons/fa6";
import { BtnCAEd } from "@/components";
import { IFormSign_up } from "@/types";
import { useState } from "react";

const Form_Log_Up = () => {
  const { setUserEmail }: any = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [shoPass, setShoPass] = useState<boolean>(false);
  const router = useRouter();

  const [form, setForm] = useState<(IFormSign_up & { password: string }) | any>(
    {
      bio: "",
      name: "",
      email: "",
      userName: "",
      password: "",
    }
  );
  const handleLoginFun = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignUp(form, setForm, router, setLoading, setUserEmail);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((pre: any) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleLoginFun} className="space-y-7">
      {EditProfileInput.map((arr) => (
        <div key={arr.name} className="space-y-3">
          {arr?.text ? (
            <>
              <label htmlFor={arr.label}>{arr.label}</label>
              <textarea
                value={form[arr.name]}
                onChange={handleChange}
                name={arr.name}
                id={arr.label}
                cols={10}
                rows={10}
                className="outline-none font-semibold sm:text-sm rounded-lg border border-transparent focus:border-[#877EFF] w-full p-2.5 max-h-20"
              />
            </>
          ) : (
            <>
              <label htmlFor={arr.label}>{arr.label}</label>
              <input
                id={arr.label}
                name={arr.name}
                type={arr.type}
                value={form[arr.name]}
                onChange={handleChange}
                className="outline-none font-semibold sm:text-sm rounded-lg border border-transparent focus:border-[#877EFF] w-full p-2.5"
              />
            </>
          )}
        </div>
      ))}

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

export default Form_Log_Up;
