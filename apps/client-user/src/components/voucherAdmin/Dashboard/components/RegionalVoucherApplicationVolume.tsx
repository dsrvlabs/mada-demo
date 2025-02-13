/* eslint-disable react/no-array-index-key */
import Image from "next/image";
import React from "react";
import mga from "../../../../../public/shared/images/img_country.png";
import { RegionalData } from "../../../../dummy/data";

const getBackgroundColor = (volume: string): string => {
  const volumeNumber = parseInt(volume.replace(/,/g, "").replace(" EA", ""), 10);
  if (volumeNumber > 100000) {
    return "bg-[#2D60FF] bg-opacity-60 ";
  }
  if (volumeNumber > 50000) {
    return "bg-[#2D60FF] bg-opacity-30";
  }
  return "bg-[#2D60FF] bg-opacity-10";
};

const RegionalVoucherApplicationVolume: React.FC = () => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-4 text-xl font-bold">Regional Voucher Application Volume</h3>
      <div className="flex flex-row gap-4">
        <div className="flex h-[230px] w-[800px] flex-wrap">
          {RegionalData.map((item, index) => (
            <div
              key={index}
              className={`mr-2 flex h-[30px] w-[140px] items-center rounded border px-2 py-1 ${getBackgroundColor(item.volume)}`}
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-black bg-white">
                <span className="text-[11px] text-black">{item.region}</span>
              </div>
              <p className="ml-2 text-[16px] font-semibold leading-none">{item.volume}</p>
            </div>
          ))}
        </div>
        <div className="rounded bg-[#2D60FF] bg-opacity-10 p-4">
          <Image src={mga} alt="map" width={120} height={230} />
        </div>
      </div>
    </div>
  );
};

export default RegionalVoucherApplicationVolume;
