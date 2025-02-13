import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const TokenSideBarChart = () => {
  const data = [
    { name: "Fertilizer", balance: 300 },
    { name: "Shovel", balance: 150 },
    { name: "Seed", balance: 500 },
    { name: "Pesticide", balance: 200 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barSize={40}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="balance" fill="#0b4ac9" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TokenSideBarChart;
