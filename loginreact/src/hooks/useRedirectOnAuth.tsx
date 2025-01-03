import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const useRedirectOnAuth = () => {
  const { user, userLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !userLoading) {
      router.push("/");
    }
  }, [user, router, userLoading]);
};

export default useRedirectOnAuth;
