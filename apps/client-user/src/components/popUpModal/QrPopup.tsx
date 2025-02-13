/* eslint-disable @nx/enforce-module-boundaries */

/* eslint-disable jsx-a11y/label-has-associated-control */
import type { ParameterDataType } from "apps/client-user/src/types/type";
import QRCode from "qrcode.react";
import { FaPrint } from "react-icons/fa";

interface QRPopupProps {
  qrValue: string;
  userValue: ParameterDataType;
  onClose: () => void;
}

const QRPopup: React.FC<QRPopupProps> = ({ qrValue, userValue, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-3/4 max-w-2xl rounded-lg bg-white p-6 shadow-lg">
        <button
          type="button"
          className="absolute right-0 top-0 mr-4 mt-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>
        <h1 className="mb-6 text-center text-2xl font-bold">QR Code for User {userValue.userName}</h1>

        <table className="mb-6 w-full border border-gray-300">
          <tbody>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2 text-left">User ID</th>
              <td className="border border-gray-300 p-2">{userValue.userId}</td>
            </tr>
            <tr>
              <th className="border border-gray-300 bg-gray-200 p-2 text-left">Name</th>
              <td className="border border-gray-300 p-2">{userValue.userName}</td>
            </tr>
            <tr>
              <th className="border border-gray-300 bg-gray-200 p-2 text-left">Address</th>
              <td className="border border-gray-300 p-2">{userValue.userAddress}</td>
            </tr>
          </tbody>
        </table>

        <div className="mb-6 flex justify-center">
          <QRCode value={qrValue} size={256} level="H" />
        </div>

        <table className="mb-6 w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="border border-gray-300 p-2">Fertilizer</th>
              <th className="border border-gray-300 p-2">Shovel</th>
              <th className="border border-gray-300 p-2">Seeds</th>
              <th className="border border-gray-300 p-2">Pesticide</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 text-center">{userValue.fertilizer}</td>
              <td className="border border-gray-300 p-2 text-center">{userValue.shovel}</td>
              <td className="border border-gray-300 p-2 text-center">{userValue.seeds}</td>
              <td className="border border-gray-300 p-2 text-center">{userValue.pesticide}</td>
            </tr>
          </tbody>
        </table>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
          onClick={handlePrint}
        >
          Print QR Code
          <FaPrint size={20} />
        </button>
      </div>
    </div>
  );
};

export default QRPopup;
