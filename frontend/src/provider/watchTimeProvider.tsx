import useVideo from "@/hooks/useVideo";
import { watchTimeAtom } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// 'use client'
const WatchTimeProvider = ({ children }: { children: React.ReactNode }) => {
  const { watchTime } = useVideo();
  const [watchingTime, setWatchingTime] = useAtom<number>(watchTimeAtom);
  const router = useRouter();
  useEffect(() => {
    if (watchingTime > 0) {
      watchTime(watchingTime, "ddddd");
    }
  }, [router]);
  return <>{children}</>;
};
export default WatchTimeProvider
