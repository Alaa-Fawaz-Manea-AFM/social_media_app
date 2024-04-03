"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressLayOut = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <ProgressBar
        height="3px"
        color="#5f55eb"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </main>
  );
};

export default ProgressLayOut;
