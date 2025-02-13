/* eslint-disable react/no-array-index-key */
import React, { useState } from "react";
import {
  Bar,
  BarChart,
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

const dummyStoreData = {
  name: "Green Valley Store(12)",
  address: "0xabcdef1234567890abcdef1234567890abcdef12",
  owner: "John Doe",
  physicalAddress: "123 Green Valley Road, Cityville, Countryland",
};

const dummyInventory = [
  { id: 1, item: "fertilizer", quantity: 120, price: 4000 },
  { id: 2, item: "shovel", quantity: 80, price: 2500 },
  { id: 3, item: "seeds", quantity: 200, price: 3000 },
  { id: 4, item: "pesticide", quantity: 150, price: 4500 },
];

const dummyTransactions = [
  {
    id: 11,
    date: "2024-06-20",
    user: "12(0xabcd...fabcdef)",
    item: "fertilizer",
    quantity: 10,
    type: "sold",
    total: 40000,
  },
  {
    id: 10,
    date: "2024-06-19",
    user: "90(0xabcdef...fabcdef)",
    item: "shovel",
    quantity: 5,
    type: "sold",
    total: 12500,
  },
  {
    id: 9,
    date: "2024-06-17",
    user: "78(0xabcdef...fabcdef)",
    item: "fertilizer",
    quantity: 10,
    type: "sold",
    total: 40000,
  },
  {
    id: 8,
    date: "2024-06-15",
    user: "56(0xabcdef...fabcdef)",
    item: "pesticide",
    quantity: 20,
    type: "sold",
    total: 90000,
  },
  {
    id: 7,
    date: "2024-06-13",
    user: "34(0xabcdef...fabcdef)",
    item: "shovel",
    quantity: 4,
    type: "sold",
    total: 10000,
  },
  { id: 6, date: "2024-06-11", user: "12(0xabcd...fabcdef)", item: "seeds", quantity: 18, type: "sold", total: 54000 },
  {
    id: 5,
    date: "2024-06-09",
    user: "90(0xabcdef...fabcdef)",
    item: "fertilizer",
    quantity: 8,
    type: "sold",
    total: 32000,
  },
  {
    id: 4,
    date: "2024-06-07",
    user: "78(0xabcdef...fabcdef)",
    item: "pesticide",
    quantity: 10,
    type: "sold",
    total: 45000,
  },
  {
    id: 3,
    date: "2024-06-05",
    user: "56(0xabcdef...fabcdef)",
    item: "seeds",
    quantity: 25,
    type: "sold",
    total: 75000,
  },
  {
    id: 2,
    date: "2024-06-03",
    user: "34(0xabcdef...fabcdef)",
    item: "shovel",
    quantity: 7,
    type: "sold",
    total: 17500,
  },
  {
    id: 1,
    date: "2024-06-01",
    user: "12(0xabcd...fabcdef)",
    item: "fertilizer",
    quantity: 12,
    type: "sold",
    total: 48000,
  },
];

const COLORS = ["#3B82F6", "#6366F1", "#EF4444", "#F59E0B"];

const VendorManagement = () => {
  const [storeData] = useState(dummyStoreData);
  const [inventory] = useState(dummyInventory);
  const [transactions] = useState(dummyTransactions);

  const inventoryData = inventory.map((item) => ({
    name: item.item.charAt(0).toUpperCase() + item.item.slice(1),
    value: item.quantity,
  }));

  const calculateTotalSales = () => {
    return transactions.reduce((total, tx) => total + tx.total, 0).toFixed(0);
  };

  const salesData = transactions.map((tx) => ({
    date: tx.date,
    total: tx.total,
  }));

  const renderInventoryChange = () => {
    const changes: Record<string, { date: string; quantity: number }[]> = {};

    transactions.forEach((tx) => {
      if (!changes[tx.item]) {
        changes[tx.item] = [];
      }
      changes[tx.item].push({
        date: tx.date,
        quantity: tx.type === "sold" ? -tx.quantity : tx.quantity,
      });
    });

    const formattedChanges = Object.keys(changes).map((item) => {
      return {
        name: item.charAt(0).toUpperCase() + item.slice(1),
        data: changes[item],
      };
    });

    return formattedChanges;
  };

  const inventoryChangeData = renderInventoryChange();

  return (
    <div className="mx-auto p-4">
      <div className="mb-4 rounded bg-white p-4 shadow">
        <h1 className="text-2xl font-bold">{storeData.name}</h1>
        <p>{storeData.physicalAddress}</p>
        <p>
          Owner: {storeData.owner} ({storeData.address})
        </p>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded bg-white p-4 shadow">
          <h2 className="mb-2 text-xl font-semibold">Inventory Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={inventoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {inventoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded bg-white p-4 shadow">
          <h2 className="mb-2 text-xl font-semibold">Total Sales</h2>
          <p className="text-2xl font-bold">{calculateTotalSales()} MGA</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mb-4 rounded bg-white p-4 shadow">
        <h2 className="mb-2 text-xl font-semibold">Transaction History</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Date</th>
              <th className="py-2">Farmer Id(wallet address)</th>
              <th className="py-2">Item</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Total (MGA)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td className="border px-4 py-2">{tx.date}</td>
                <td className="border px-4 py-2">{tx.user}</td>
                <td className="border px-4 py-2">{tx.item}</td>
                <td className="border px-4 py-2">{tx.quantity}</td>
                <td className="border px-4 py-2">{tx.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded bg-white p-4 shadow">
        <h2 className="mb-2 text-xl font-semibold">Inventory Changes Over Time</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {inventoryChangeData.map((itemData, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{itemData.name}</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={itemData.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorManagement;
