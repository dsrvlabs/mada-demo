import React from "react";
import type { ParameterDataType } from "../../types/type";

interface FarmerInfoProps {
  farmer: ParameterDataType;
  truncateAddress: (address: string) => string;
}

const FarmerInfo: React.FC<FarmerInfoProps> = ({ farmer, truncateAddress }) => {
  return (
    <div className="mb-4 text-center">
      <h2 className="text-xl font-bold">{farmer.userName}</h2>
      <p className="text-gray-500">{truncateAddress(farmer.userAddress)}</p>
    </div>
  );
};

export default FarmerInfo;
