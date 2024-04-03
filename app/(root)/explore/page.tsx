import PostExplore from "@/components/PostExplore";
import { Filter, Search } from "@/public/assets";
import { InputExplore } from "@/components";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore",
  description: "Explore more posts",
};

const ExplorePage = ({
  searchParams: { q = "" },
}: {
  searchParams: { q: string };
}) => (
  <div className="space-y-10 py-12 overflow-y-scroll h-screen max-ssx:pb-28 max-ssx:pt-20">
    <div className="flex gap-7 w-11/12 mx-auto flex-col max-w-5xl">
      <h2 className="text-2xl font-semibold">Search Posts</h2>
      <div className="flex gap-2 bg-[#3B3B3B] items-center p-2 rounded-lg">
        <label htmlFor="search">
          <Image
            src={Search}
            alt="search"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </label>
        <InputExplore q={q} />
      </div>
      <div className="flex items-center justify-between px-3">
        <h2 className="text-xl font-semibold">Popular Today</h2>
        <div className="flex items-center gap-2">
          All <Image src={Filter} alt="search" width={32} height={32} />
        </div>
      </div>
    </div>
    <PostExplore q={q} />
  </div>
);

export default ExplorePage;
