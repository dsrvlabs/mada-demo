/* eslint-disable @nx/enforce-module-boundaries */
import React from "react";
import { useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { supplyData } from "../../../../dummy/data";

const SupplyTrendLineChart = () => {
  const [statisticPeriod, setStatisticPeriod] = useState("Daily");

  return (
    <div className="rounded-lg bg-white ">
      <ResponsiveContainer width={400} height={200}>
        <LineChart data={supplyData.Monthly} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="actualUsage" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="totalIssuance" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SupplyTrendLineChart;
