import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import farmer from "../../../../public/shared/images/img_farmer.png";

const dummyUserData = {
  name: "Razona Rakotomalala",
  address: "0x1234567890abcdef1234567890abcdef12345678",
};

const dummyTransactions = [
  {
    id: 18,
    date: "2024-06-28",
    to: "23(0xabcd...fabcdef)",
    items: "seeds",
    amount: 15,
    type: "received",
    balance: 180,
  },
  { id: 17, date: "2024-06-27", to: "45(0xabcdef...fabcdef)", items: "shovel", amount: 9, type: "sent", balance: 165 },
  {
    id: 16,
    date: "2024-06-26",
    to: "67(0xabcdef...fabcdef)",
    items: "pesticide",
    amount: 7,
    type: "received",
    balance: 174,
  },
  {
    id: 15,
    date: "2024-06-25",
    to: "89(0xabcdef...fabcdef)",
    items: "fertilizer",
    amount: 11,
    type: "sent",
    balance: 167,
  },
  {
    id: 14,
    date: "2024-06-24",
    to: "12(0xabcd...fabcdef)",
    items: "seeds",
    amount: 14,
    type: "received",
    balance: 178,
  },
  { id: 13, date: "2024-06-23", to: "34(0xabcdef...fabcdef)", items: "shovel", amount: 8, type: "sent", balance: 164 },
  {
    id: 12,
    date: "2024-06-22",
    to: "56(0xabcdef...fabcdef)",
    items: "pesticide",
    amount: 6,
    type: "received",
    balance: 172,
  },
  {
    id: 11,
    date: "2024-06-20",
    to: "12(0xabcd...fabcdef)",
    items: "fertilizer",
    amount: 10,
    type: "received",
    balance: 169,
  },
  { id: 10, date: "2024-06-19", to: "90(0xabcdef...fabcdef)", items: "shovel", amount: 5, type: "sent", balance: 159 },
  {
    id: 9,
    date: "2024-06-17",
    to: "78(0xabcdef...fabcdef)",
    items: "fertilizer",
    amount: 10,
    type: "received",
    balance: 164,
  },
  {
    id: 8,
    date: "2024-06-15",
    to: "56(0xabcdef...fabcdef)",
    items: "pesticide",
    amount: 20,
    type: "received",
    balance: 154,
  },
  { id: 7, date: "2024-06-13", to: "34(0xabcdef...fabcdef)", items: "shovel", amount: 4, type: "sent", balance: 134 },
  { id: 6, date: "2024-06-11", to: "12(0xabcd...fabcdef)", items: "seeds", amount: 18, type: "received", balance: 138 },
  {
    id: 5,
    date: "2024-06-09",
    to: "90(0xabcdef...fabcdef)",
    items: "fertilizer",
    amount: 8,
    type: "sent",
    balance: 120,
  },
  {
    id: 4,
    date: "2024-06-07",
    to: "78(0xabcdef...fabcdef)",
    items: "pesticide",
    amount: 10,
    type: "received",
    balance: 128,
  },
  {
    id: 3,
    date: "2024-06-05",
    to: "56(0xabcdef...fabcdef)",
    items: "seeds",
    amount: 25,
    type: "received",
    balance: 118,
  },
  { id: 2, date: "2024-06-03", to: "34(0xabcdef...fabcdef)", items: "shovel", amount: 7, type: "sent", balance: 93 },
  {
    id: 1,
    date: "2024-06-01",
    to: "12(0xabcd...fabcdef)",
    items: "fertilizer",
    amount: 12,
    type: "received",
    balance: 100,
  },
];

const dummyTokenBalances = {
  fertilizer: 100,
  shovel: 50,
  seeds: 200,
  pesticide: 75,
};

const exchangeRates = {
  fertilizer: 4000,
  shovel: 2500,
  seeds: 3000,
  pesticide: 4500,
};

type Token = "fertilizer" | "shovel" | "seeds" | "pesticide";

const COLORS = ["#3B82F6", "#6366F1", "#EF4444", "#F59E0B"];

const UserManagement = () => {
  const [userData, setUserData] = useState(dummyUserData);
  const [transactions, setTransactions] = useState(dummyTransactions);
  const [tokenBalances, setTokenBalances] = useState(dummyTokenBalances);

  const calculateTotalValue = () => {
    const totalValue = (Object.keys(tokenBalances) as Token[]).reduce((total, token) => {
      const balance = tokenBalances[token];
      const rate = exchangeRates[token];
      return total + balance * rate;
    }, 0);
    return totalValue.toFixed(0);
  };

  const balanceData = (Object.keys(tokenBalances) as Token[]).map((token) => ({
    name: token.charAt(0).toUpperCase() + token.slice(1),
    value: tokenBalances[token],
  }));

  const lineChartData = transactions.map((tx) => ({
    date: tx.date,
    [tx.items]: tx.amount,
  }));

  const lineChartDataMintedVsSent = [
    { date: "2024-01-01", minted: 50, sent: 20 },
    { date: "2024-01-02", minted: 70, sent: 30 },
    { date: "2024-01-03", minted: 100, sent: 40 },
    { date: "2024-01-04", minted: 150, sent: 50 },
    { date: "2024-01-05", minted: 200, sent: 70 },
  ];

  const renderCalendar = () => {
    const daysInMonth = (month: any, year: any) => new Date(year, month, 0).getDate();
    const month = 6; // June
    const year = 2024;
    const days = daysInMonth(month, year);

    const firstDayIndex = new Date(year, month - 1, 1).getDay();
    const rows = [];
    let cells = [];

    for (let i = 0; i < firstDayIndex; i++) {
      cells.push(<td key={`empty-${i}`} className="border p-2"></td>);
    }

    for (let day = 1; day <= days; day++) {
      const currentDate = new Date(year, month - 1, day);
      const transactionsOnDate = transactions.filter(
        (tx) => new Date(tx.date).toDateString() === currentDate.toDateString(),
      );

      cells.push(
        <td key={day} className="border p-2 align-top">
          <div>{day}</div>
          {transactionsOnDate.map((tx, index) => (
            <p key={index} className={tx.type === "received" ? "text-green-600" : "text-red-600"}>
              {tx.type === "received" ? `+${tx.amount} ${tx.items}` : `-${tx.amount} ${tx.items}`}
            </p>
          ))}
        </td>,
      );

      if ((day + firstDayIndex) % 7 === 0 || day === days) {
        rows.push(<tr key={day}>{cells}</tr>);
        cells = [];
      }
    }

    return rows;
  };

  return (
    <div className="mx-auto p-4">
      <div className="mb-4 flex items-center">
        <Image alt="Profile" src={farmer} width={90} height={90} className="rounded-full" />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{userData.name}</h1>
          <p>{userData.address}</p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1">
          <div className="rounded bg-white p-4 shadow">
            <div className="mb-4 mt-2">
              <h3 className="text-xl font-semibold">Total Value</h3>
              <p className="text-2xl font-bold">{calculateTotalValue()} MGA</p>
            </div>
            <ul>
              {Object.entries(tokenBalances).map(([token, balance]) => {
                const tokenKey = token as Token; // Type assertion
                return (
                  <li key={token} className="flex justify-between">
                    <span>{token.charAt(0).toUpperCase() + token.slice(1)}</span>
                    <div className="text-right">
                      <span>{balance}</span>
                      <span className="block text-sm text-gray-500">
                        {(balance * exchangeRates[tokenKey]).toFixed(0)} MGA
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-4 rounded bg-white p-4">
            <h2 className="mb-2 text-xl font-semibold">Token Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={balanceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {balanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-4">
          <div className=" border-1 mb-4 rounded p-4 shadow">
            <div className="flex flex-row justify-between">
              <h2 className="mb-2 text-xl font-semibold">Transaction Calendar</h2>
              <h2 className="mb-2 text-2xl font-semibold">June 2024</h2>
            </div>

            <div className="border-2 border-gray-100">
              <table className="h-[650px] min-w-full table-fixed  ">
                <thead>
                  <tr>
                    <th className="border bg-gray-25 p-2">Su</th>
                    <th className="border bg-gray-25 p-2">Mo</th>
                    <th className="border bg-gray-25 p-2">Tu</th>
                    <th className="border bg-gray-25 p-2">We</th>
                    <th className="border bg-gray-25 p-2">Th</th>
                    <th className="border bg-gray-25 p-2">Fr</th>
                    <th className="border bg-gray-25 p-2">Sa</th>
                  </tr>
                </thead>
                <tbody>{renderCalendar()}</tbody>
              </table>
            </div>
          </div>
          <div className="mb-4 rounded bg-white p-4">
            <h2 className="mb-2 text-xl font-semibold">Transaction Logs</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Date</th>
                  <th className="py-2">Vendor Id(wallet address)</th>
                  <th className="py-2">Items</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="border px-4 py-2">{tx.date}</td>
                    <td className="border px-4 py-2">{tx.to}</td>
                    <td className="border px-4 py-2">{tx.items}</td>
                    <td className="border px-4 py-2">{tx.type}</td>
                    <td className="border px-4 py-2">{tx.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
