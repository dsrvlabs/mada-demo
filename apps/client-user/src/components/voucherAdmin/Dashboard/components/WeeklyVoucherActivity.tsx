/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { name: "Sat", issuance: 300, usage: 200 },
  { name: "Sun", issuance: 250, usage: 150 },
  { name: "Mon", issuance: 400, usage: 300 },
  { name: "Tue", issuance: 450, usage: 350 },
  { name: "Wed", issuance: 300, usage: 250 },
  { name: "Thu", issuance: 500, usage: 400 },
  { name: "Fri", issuance: 350, usage: 300 },
];

const COLORS = {
  issuance: "#4393FF",
  usage: "#FFC433",
};

const WeeklyVoucherActivity: React.FC = () => {
  return (
    <div className="rounded-lg bg-white pb-2 pl-6 pr-6 pt-6 shadow-md">
      <h3 className="mb-4 text-xl font-bold">Weekly Voucher Activity</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barGap={10}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#9CA3AF", fontSize: 14 }} />
          <YAxis tick={{ fill: "#9CA3AF", fontSize: 14 }} />
          <Tooltip />
          <Legend
            verticalAlign="top"
            align="left"
            iconType="square"
            iconSize={16}
            wrapperStyle={{ top: -10, left: 10 }}
            formatter={(value) => <span style={{ color: "#9CA3AF", fontSize: 14 }}>{value}</span>}
          />
          <Bar
            dataKey="issuance"
            name="Voucher Issuance volume"
            fill={COLORS.issuance}
            barSize={15}
            radius={[3, 3, 0, 0]}
          />
          <Bar dataKey="usage" name="Usage volume" fill={COLORS.usage} barSize={15} radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyVoucherActivity;
