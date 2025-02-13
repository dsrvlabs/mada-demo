import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { statisticsData } from "../../../../dummy/data";

const TokenBarChart = () => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-4 text-xl font-bold">Minted Volume per Token</h3>
      <div className="chart-container mx-auto w-full" style={{ height: "40vh" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={statisticsData.tokens} barSize={40}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalIssued" fill="#4242a4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TokenBarChart;
