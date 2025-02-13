import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const dummyTokenData = [
  {
    token: "Fertilizer",
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    balance: 1000,
    transactions: [
      { id: 1, date: "2024-06-20", user: "12(0xabcd...fabcdef)", quantity: 10, type: "issued", price: 4000 },
      { id: 2, date: "2024-06-19", user: "90(0xabcdef...fabcdef)", quantity: 5, type: "received", price: 2000 },
      { id: 3, date: "2024-06-17", user: "78(0xabcdef...fabcdef)", quantity: 10, type: "issued", price: 4000 },
      { id: 4, date: "2024-06-15", user: "56(0xabcdef...fabcdef)", quantity: 20, type: "issued", price: 8000 },
    ],
  },
  {
    token: "Shovel",
    address: "0xabcdef1234567890abcdef1234567890abcdef34",
    balance: 500,
    transactions: [
      { id: 1, date: "2024-06-20", user: "12(0xabcd...fabcdef)", quantity: 3, type: "issued", price: 7500 },
      { id: 2, date: "2024-06-19", user: "90(0xabcdef...fabcdef)", quantity: 7, type: "received", price: 17500 },
      { id: 3, date: "2024-06-17", user: "78(0xabcdef...fabcdef)", quantity: 5, type: "issued", price: 12500 },
    ],
  },
  {
    token: "Seeds",
    address: "0xabcdef1234567890abcdef1234567890abcdef56",
    balance: 2000,
    transactions: [
      { id: 1, date: "2024-06-20", user: "12(0xabcd...fabcdef)", quantity: 15, type: "issued", price: 45000 },
      { id: 2, date: "2024-06-19", user: "90(0xabcdef...fabcdef)", quantity: 10, type: "received", price: 30000 },
      { id: 3, date: "2024-06-17", user: "78(0xabcdef...fabcdef)", quantity: 20, type: "issued", price: 60000 },
    ],
  },
  {
    token: "Pesticide",
    address: "0xabcdef1234567890abcdef1234567890abcdef78",
    balance: 800,
    transactions: [
      { id: 1, date: "2024-06-20", user: "12(0xabcd...fabcdef)", quantity: 8, type: "issued", price: 36000 },
      { id: 2, date: "2024-06-19", user: "90(0xabcdef...fabcdef)", quantity: 12, type: "received", price: 54000 },
      { id: 3, date: "2024-06-17", user: "78(0xabcdef...fabcdef)", quantity: 10, type: "issued", price: 45000 },
    ],
  },
];

const COLORS = ["#6c757d", "#007bff", "#28a745", "#dc3545"];

const TokenManagement = () => {
  const [tokenData] = useState(dummyTokenData);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const calculateTotalValue = (transactions: any) => {
    return transactions.reduce((total: any, tx: any) => total + tx.price, 0);
  };

  const calculateTotalSpentReceived = (transactions: any, type: string) => {
    return transactions.filter((tx: any) => tx.type === type).reduce((total: any, tx: any) => total + tx.price, 0);
  };

  const renderTransactionHistory = (transactions: any) => (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">Date</th>
          <th className="py-2">User</th>
          <th className="py-2">Quantity</th>
          <th className="py-2">Type</th>
          <th className="py-2">Price (MGA)</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx: any) => (
          <tr key={tx.id}>
            <td className="border px-4 py-2">{tx.date}</td>
            <td className="border px-4 py-2">{tx.user}</td>
            <td className="border px-4 py-2">{tx.quantity}</td>
            <td className={`border px-4 py-2 ${tx.type === "issued" ? "text-green-500" : "text-red-500"}`}>
              {tx.type}
            </td>
            <td className="border px-4 py-2">{tx.price.toLocaleString()} MGA</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderInventoryChanges = (transactions: any) => {
    const changes = transactions.map((tx: any) => ({
      date: tx.date,
      quantity: tx.type === "received" ? tx.quantity : -tx.quantity,
    }));

    return (
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={changes}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderTokenSummary = (token: any) => {
    const totalValue = calculateTotalValue(token.transactions);
    const totalReceived = calculateTotalSpentReceived(token.transactions, "issued");
    const totalSpent = calculateTotalSpentReceived(token.transactions, "received");

    return (
      <div className="mb-8 rounded bg-white p-4 shadow">
        <h2 className="text-primary mb-2 text-2xl font-bold">{token.token}</h2>
        <p className="mb-4 text-gray-700">Address: {token.address}</p>
        <p className="mb-4 text-lg">Balance: {token.balance.toLocaleString()} units</p>
        <p className="mb-2 text-lg font-semibold">Total Value of Transactions: {totalValue.toLocaleString()} MGA</p>
        <p className="mb-2 text-lg text-green-500">Total Issued: {totalReceived.toLocaleString()} MGA</p>
        <p className="mb-8 text-lg text-red-500">Total Received: {totalSpent.toLocaleString()} MGA</p>
        <h3 className="mb-2 text-xl font-semibold">Transaction History</h3>
        {renderTransactionHistory(token.transactions)}
        <h3 className="mb-2 mt-4 text-xl font-semibold">Inventory Changes Over Time</h3>
        {renderInventoryChanges(token.transactions)}
      </div>
    );
  };

  const renderTotalValueBarChart = (tokens: any) => {
    const data = tokens.map((token: any) => ({
      name: token.token,
      totalValue: calculateTotalValue(token.transactions),
    }));

    return (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalValue" fill="#007bff">
            {data.map((entry: any, index: any) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="mx-auto p-4">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1">
          <div className="rounded bg-white p-4 shadow">
            <h2 className="mb-4 text-xl font-semibold">Total Value of Transactions by Token(MGA)</h2>
            {renderTotalValueBarChart(tokenData)}
          </div>
        </div>

        <div className="col-span-4">
          <div className="flex flex-row">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for a token..."
              className="mb-8 w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none"
            />
            <FaSearch className="ml-2 mt-2 text-black" size={20} />
          </div>

          {tokenData.map((token) => renderTokenSummary(token))}
        </div>
      </div>
    </div>
  );
};

export default TokenManagement;
