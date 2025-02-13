import React from "react";
import { FaStore, FaUsers } from "react-icons/fa";

const DashboardStats: React.FC = () => {
  return (
    <div className="grid w-full gap-4" style={{ gridTemplateColumns: "3fr 3fr 2fr 2fr" }}>
      <div className="rounded-lg bg-white p-4 shadow-md">
        <h3 className="mb-8 text-xl">Total Voucher issuance status</h3>
        <p className="text-2xl font-bold text-[#2D60FF]">300,520 EA</p>
        <p className="text-xl font-semibold">1,658,200,580 Ar</p>
      </div>
      <div className="rounded-lg bg-white p-4 shadow-md">
        <h3 className="mb-8 text-xl">Today usage</h3>
        <p className="text-2xl font-bold text-[#2D60FF]">120 EA</p>
        <p className="text-xl font-semibold">1,535,010 Ar</p>
      </div>
      <div className="rounded-lg bg-white p-4 shadow-md">
        <h3 className="mb-16 text-xl">Today&apos;s citizen visit status</h3>
        <div className="flex items-center">
          <FaUsers className="mr-2 text-2xl text-black" />
          <p className="text-2xl font-bold text-[#2D60FF]">650</p>
        </div>
      </div>
      <div className="rounded-lg bg-white p-4 shadow-md">
        <h3 className="mb-16 text-xl">Total Partner Merchant</h3>
        <div className="flex items-center">
          <FaStore className="mr-2 text-2xl text-black" />
          <p className="text-2xl font-bold text-[#2D60FF]">1,250</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
