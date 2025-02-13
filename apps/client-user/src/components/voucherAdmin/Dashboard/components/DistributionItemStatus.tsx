/* eslint-disable no-nested-ternary */

/* eslint-disable react/no-array-index-key */

/* eslint-disable react/no-array-index-key */
import React from "react";
import { FaLeaf, FaSeedling, FaTools, FaWater } from "react-icons/fa";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { CustomLabelProps } from "../../../../types/type";

const data = [
  { name: "Fertilizer", value: 35, icon: <FaSeedling />, color: "#FFC433" },
  { name: "Shovel", value: 25, icon: <FaTools />, color: "#FF8743" },
  { name: "Seed", value: 30, icon: <FaLeaf />, color: "#1CCAB8" },
  { name: "Pesticide", value: 10, icon: <FaWater />, color: "#4393FF" },
];

const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, percent, index }: CustomLabelProps) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const labelBgWidth = 150;
  const labelBgHeight = 40;

  return (
    <g>
      <rect
        x={data[index].name === "Pesticide" ? x - 130 : data[index].name === "Shovel" ? x - 20 : x - labelBgWidth / 2}
        y={y - labelBgHeight / 2}
        width={labelBgWidth}
        height={labelBgHeight}
        fill={data[index].color}
        fillOpacity={0.2}
        rx={10}
        ry={10}
      />
      <foreignObject
        x={data[index].name === "Pesticide" ? x - 130 : data[index].name === "Shovel" ? x - 20 : x - labelBgWidth / 2}
        y={y - labelBgHeight / 2}
        width={labelBgWidth}
        height={labelBgHeight}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          <div style={{ color: data[index].color, marginRight: 5 }}>{data[index].icon}</div>
          <div style={{ color: data[index].color, marginRight: 5, fontWeight: 800 }}>{data[index].name}</div>
          <div style={{ color: data[index].color, fontWeight: 800 }}>{`${(percent * 100).toFixed(0)}%`}</div>
        </div>
      </foreignObject>
    </g>
  );
};

const DistributionItemStatus: React.FC = () => {
  return (
    <div className="rounded-lg bg-white pb-2 pl-6 pr-6 pt-6 shadow-md">
      <h3 className="mb-4 text-xl font-bold">Distribution Item Status</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={160} // 시작 각도
            endAngle={-200} // 끝 각도
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={85}
            fill="#8884d8"
            stroke="#FFF"
            strokeWidth={4}
            dataKey="value"
            paddingAngle={2} // 조각 사이의 간격
            cornerRadius={10} // 조각의 모서리를 둥글게
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default DistributionItemStatus;
