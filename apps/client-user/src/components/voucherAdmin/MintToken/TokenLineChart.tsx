import React from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const TokenLineChart = () => {
  const data = [
    { day: "Mon", fertilizer: 200, shovel: 150, seed: 300, pesticide: 100 },
    { day: "Tue", fertilizer: 250, shovel: 180, seed: 280, pesticide: 120 },
    { day: "Wed", fertilizer: 300, shovel: 200, seed: 320, pesticide: 150 },
    { day: "Thu", fertilizer: 280, shovel: 160, seed: 310, pesticide: 130 },
    { day: "Fri", fertilizer: 320, shovel: 190, seed: 330, pesticide: 140 },
    { day: "Sat", fertilizer: 310, shovel: 180, seed: 340, pesticide: 160 },
    { day: "Sun", fertilizer: 330, shovel: 200, seed: 350, pesticide: 170 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="fertilizer" stroke="#8884d8" />
        <Line type="monotone" dataKey="shovel" stroke="#82ca9d" />
        <Line type="monotone" dataKey="seed" stroke="#ffc658" />
        <Line type="monotone" dataKey="pesticide" stroke="#FF5733" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TokenLineChart;
