import React from "react";
import DashboardStats from "./components/DashboardStats";
import DistributionItemStatus from "./components/DistributionItemStatus";
import RegionalVoucherApplicationVolume from "./components/RegionalVoucherApplicationVolume";
import VoucherRemainder from "./components/VoucherRemainder";
import WeeklyVoucherActivity from "./components/WeeklyVoucherActivity";

const Dashboard = () => {
  return (
    <div className="h-screen overflow-y-auto p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex h-full w-full">
          <DashboardStats />
        </div>
        <div className="flex w-full space-x-6">
          <div className="flex-[0.6]">
            <WeeklyVoucherActivity />
          </div>
          <div className="flex-[0.4]">
            <DistributionItemStatus />
          </div>
        </div>
        <div className="flex w-full space-x-2">
          <div className="flex flex-[0.7]">
            <RegionalVoucherApplicationVolume />
          </div>
          <div className="flex flex-[0.3]">
            <VoucherRemainder />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
