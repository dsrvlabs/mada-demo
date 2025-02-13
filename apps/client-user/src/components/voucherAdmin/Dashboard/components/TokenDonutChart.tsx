/* eslint-disable react/no-array-index-key */
import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Fertilizer", value: 400 },
  { name: "Seeds", value: 300 },
  { name: "Shovel", value: 300 },
  { name: "Pesticide", value: 200 },
];
const COLORS = ["#2E86C1", "#AF7AC5", "#F7DC6F", "#48C9B0"];
const TokenDonutChart = () => {
  return (
    <div className="rounded-lg p-6">
      <ResponsiveContainer width={300} height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            // label={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={50}
            innerRadius={20}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          {/* <Legend /> */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default TokenDonutChart;
