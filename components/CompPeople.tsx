"use client";
import { BtnFollow, Loader, UserInfCercle } from "@/components";
import { useUserContext } from "@/context/MyState";
import { IUser } from "@/types";

const CompPeople = () => {
  const { user, userInf }: any = useUserContext();

  if (user.length === 0) return <Loader />;

  return (
    <div className="grid max-ssx:justify-items-center grid-cols-1 xs:grid-cols-2 mdD:grid-cols-4 gap-10">
      {user?.map((us: IUser) => (
        <div key={us.uidUser} className="flex w-40 flex-col items-center gap-2">
          <UserInfCercle col arr={us} userId={userInf?.uidUser} />
          {us.uidUser !== userInf?.uidUser && (
            <BtnFollow userId={userInf?.uidUser} id={us.uidUser} usInf={us} />
          )}
        </div>
      ))}
    </div>
  );
};

export default CompPeople;
