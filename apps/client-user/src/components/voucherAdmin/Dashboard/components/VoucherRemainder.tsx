import Image from "next/image";
import React from "react";
import remainder from "../../../../../public/shared/images/img_remainder.png";

const VoucherRemainder = () => {
  return (
    <div className="w-full rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-4 text-xl font-bold">Voucher remainder</h3>
      <div className="flex  items-center justify-center">
        <Image alt="img" className="h-[250px] w-[130px]" src={remainder} />
      </div>
    </div>
  );
};

export default VoucherRemainder;
