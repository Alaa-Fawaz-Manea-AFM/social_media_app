"use client";
import { Loader_icon } from "@/public/assets";
import Image from "next/image";

interface IBtnCAED {
  title: string;
  valid?: boolean;
  loading: boolean;
  NoCancel?: boolean;
  handleCancel?: () => void;
}

const BtnCAEd = ({
  NoCancel,
  title,
  loading,
  handleCancel,
  valid,
}: IBtnCAED) => (
  <div className="flex justify-end gap-5">
    {!NoCancel && (
      <button
        type="button"
        onClick={handleCancel}
        className={` ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        } bg-black px-3 py-2 rounded-lg font-semibold`}
      >
        Cancel
      </button>
    )}
    <button
      type="submit"
      disabled={valid}
      className={`${NoCancel ? "w-full" : ""} ${
        valid ? "opacity-50 cursor-not-allowed" : ""
      } px-5 py-3.5 rounded-lg font-semibold bg-[#877EFF] hover:bg-[#6b60ff]`}
    >
      {loading ? (
        <span className="flex gap-2 justify-center">
          <Image src={Loader_icon} alt="Loader" width={24} height={24} />
          {title}...
        </span>
      ) : (
        <span>{title}</span>
      )}
    </button>
  </div>
);

export default BtnCAEd;
