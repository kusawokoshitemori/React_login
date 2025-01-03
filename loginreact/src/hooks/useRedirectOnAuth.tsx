import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const useRedirectOnAuth = (redirectTo: string) => {
  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(redirectTo);
    }
  }, [user, router, redirectTo]);
};

export default useRedirectOnAuth;
