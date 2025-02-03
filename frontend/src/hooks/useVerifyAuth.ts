import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { tokenAtom } from "@/store";
import { verifyToken } from "@/utils/verifyToken";

const useVerifyAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [token] = useAtom<string>(tokenAtom);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const result = await verifyToken();
      setIsAuth(result);
      setLoading(false);
    };
    checkAuth();
  }, [token, router]);

  return { isAuth, loading };
};

export default useVerifyAuth;
