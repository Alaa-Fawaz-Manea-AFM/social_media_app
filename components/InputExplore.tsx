"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";

const InputExplore = ({ q }: { q: string}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [_search, set_Search] = useState(q);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    set_Search(value);
    if (!value) return router.push(pathname);
    router.push(`?q=${value}`);
  };

  return (
    <input
      value={_search}
      onChange={handleSearch}
      type="search"
      name="search"
      id="search"
      className="w-full outline-none border-none bg-transparent"
      placeholder="search..."
    />
  );
};

export default InputExplore;
