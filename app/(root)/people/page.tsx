import { CompPeople } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "People",
  description: "Explore more people",
};

const PeoplePage = () => {
  return (
    <div className="h-screen overflow-y-scroll max-ssx:mx-auto max-ssx:pb-28 pt-12 space-y-10">
      <h2 className="text-xl font-semibold pl-10 ssx:pl-0">All Users</h2>
      <CompPeople />
    </div>
  );
};

export default PeoplePage;
