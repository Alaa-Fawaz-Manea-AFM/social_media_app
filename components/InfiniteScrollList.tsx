"use client";
import { useEffect, useState } from "react";
import { IPosts } from "@/types";

type InfiniteScrollList = {
  data: IPosts[];
  className: string;
  next: (data: IPosts[]) => void;
  children: React.ReactNode;
  limit: number;
  loader: any;
  endMessage: string;
};

const InfiniteScrollList = ({
  data,
  className,
  next,
  children,
  limit,
  loader,
  endMessage,
}: InfiniteScrollList) => {
  const [dataLocal, setdataLocal] = useState<IPosts[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [endPage, setEndPage] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setLoading(true);
    setEndPage(false);

    let arr = data?.slice(0, page * limit);

    next(arr);
    setdataLocal(arr);
  }, [page, data]);

  useEffect(() => {
    if (data?.length == dataLocal?.length) {
      setLoading(false);
      setEndPage(true);
    }
  }, [dataLocal]);

  const handleScroll = (e: any) => {
    let scrollTop = e.target.scrollTop + 1 + window.innerHeight;
    let scrollHeight = e.target.scrollHeight;

    if (scrollTop >= scrollHeight && data?.length > dataLocal.length) {
      setPage((pre) => ++pre);
    }
  };

  return (
    <div onScroll={handleScroll} className={className}>
      {children}
      {dataLocal?.length > 0 && (
        <p className="text-center">
          {loading ? loader : ""}
          {endPage ? endMessage : ""}
        </p>
      )}
    </div>
  );
};

export default InfiniteScrollList;
