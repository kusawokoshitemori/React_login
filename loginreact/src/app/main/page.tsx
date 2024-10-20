"use client";

import Contents from "@/components/contents";
import MainHeader from "@/components/MainHeader";
import MainFooter from "@/components/MainFooter";

const Main = () => {
  return (
    <div className="w-full">
      <MainHeader />
      <Contents postId={3} />
      <MainFooter />
    </div>
  );
};

export default Main;
