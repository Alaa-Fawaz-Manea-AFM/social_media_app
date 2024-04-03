"use client";
import { handleAddSaved, handleRemoveSaved } from "@/constant/api";
import { Save_Icon, Saved_Icon } from "@/public/assets";
import { useUserContext } from "@/context/MyState";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useState } from "react";
import { IPosts } from "@/types";
import Image from "next/image";

const BtnSeved = ({ ArrSaved }: { ArrSaved: IPosts }) => {
  const { userId }: any = useUserContext();
  const router = useRouter();

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(ArrSaved.saved?.some((save) => save.userIdSave === userId));
  }, [ArrSaved, userId]);

  const handleBtnRout = () => {
    if (userId) {
      if (saved) return handleRemoveSaved(ArrSaved, userId);
      return handleAddSaved(ArrSaved, userId);
    }
    return router.push("/log-in");
  };

  return (
    <div className="flex items-center gap-1">
      <Image
        onClick={handleBtnRout}
        src={saved ? Saved_Icon : Save_Icon}
        alt="Saved_Icon"
        width={32}
        height={32}
        className="cursor-pointer"
      />
    </div>
  );
};

export default BtnSeved;
