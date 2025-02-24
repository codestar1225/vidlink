"use client";
import { useState } from "react";
import UserBtn from "./userBtn";
import PeriodBtn from "./periodBtn";

interface Type {
  setUser(value: string): void;
  setPeriod(value: number): void;
  user: string;
  period: number;
}
const Filter: React.FC<Type> = ({ setUser, setPeriod, user, period }) => {
  return (
    <div className="mt-[51.82px]">
      <div className="flex justify-between gap-[5px]">
        <UserBtn setFilter={setUser} name="creator" filter={user} />
        <UserBtn setFilter={setUser} name="viewer" filter={user} />
      </div>
      <div className="flex justify-between gap-[5px] mt-[15px]">
        <PeriodBtn setFilter={setPeriod} name="7 days" filter={period} />
        <PeriodBtn setFilter={setPeriod} name="30 days" filter={period} />
        <PeriodBtn setFilter={setPeriod} name="1 year" filter={period} />
      </div>
    </div>
  );
};
export default Filter;
