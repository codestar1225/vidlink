"use client";
import FooterMobile from "@/app/_components/layout/mobile/footer";
import { useState } from "react";
import UserInfo from "./creator/userInfo";
import Filter from "./creator/filter";
import Videos from "./creator/videos";
import Cards from "./creator/cards";
import Total from "./creator/total";
import BtnGroup from "./btnGroup";
import Viewer from "./viewer";

const DashboardMobile = () => {
  const [user, setUser] = useState<string>("creator");
  const [period, setPeriod] = useState<number>(1);
  return (
    <>
      <div className="min-h-screen flex flex-col justify-between">
        <main className="mt-[109px] px-[20px]">
          <UserInfo />
          <Filter
            setUser={setUser}
            setPeriod={setPeriod}
            user={user}
            period={period}
          />
          {user === "creator" ? (
            <>
              <Videos />
              <Cards />
              <Total />
            </>
          ) : (
            <Viewer />
          )}
          <BtnGroup name="yearly" />
        </main>
        <FooterMobile isFixed={false} />
      </div>
    </>
  );
};
export default DashboardMobile;
