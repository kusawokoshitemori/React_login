"use client";

// import { useEffect } from "react";
// import useAuth from "@/hooks/useAuth";
// import { useRouter } from "next/navigation";
import FirstHeader from "@/components/FirstPage/FirstHeader";
import FirstMain from "@/components/FirstPage/Main/FirstMain";
import FirstFooter from "@/components/FirstPage/FirstFooter";

const FirstPage = () => {
  // const router = useRouter();
  // const user = useAuth();

  // useEffect(() => {
  //   if (user) {
  //     router.push("/profile"); // ログイン済みならマイページにリダイレクト
  //   }
  // }, [user, router]);

  return (
    <div className="w-full h-screen">
      <FirstHeader />
      <FirstMain />
      <FirstFooter />
    </div>
  );
};

export default FirstPage;
