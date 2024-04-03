import CompProfile from "@/components/CompProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "profile",
};

type IMyPosts = { params: { profile_id: string } };

const MyPosts = ({ params: { profile_id } }: IMyPosts) => (
  <div className="h-screen overflow-y-scroll max-ssx:pb-28 pb-20 max-ssx:pt-20 max-w-5xl mx-auto ssx:mx-0 ssx:py-10">
    <CompProfile profile_id={profile_id} />
  </div>
);

export default MyPosts;
