import React from "react";
import type { Item } from "../types/type";

interface ItemListProps {
  items: Item[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-md">
      <h2 className="mb-2 text-lg font-semibold text-gray-800">Items to Receive</h2>
      <table className="w-full table-auto border-collapse border border-black">
        <thead className="bg-gray-300">
          <tr>
            {items.map((item) => (
              <th key={item.id} className="border border-black px-4 py-2 text-center">
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {items.map((item) => (
              <td key={item.id} className="border border-gray-300 px-4 py-2 text-center">
                {item.quantity}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default ItemList;
