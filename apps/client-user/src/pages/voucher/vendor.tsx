/* eslint-disable no-nested-ternary */
import axios from "axios";
import type { BigNumberish } from "ethers";
import { ethers } from "ethers";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaCopy, FaQrcode, FaRegUserCircle } from "react-icons/fa";
// import Lottie from "react-lottie-player";
import profile from "../../../public/shared/images/img_farmer.png";
import joonwon from "../../../public/shared/images/img_profile.jpg";
import loadingloti from "../../../public/shared/lottie/loading1.json";
import ItemList from "../../components/itemList";
import FarmerInfo from "../../components/vendorPage/farmerInfo";
import { farmertransactions } from "../../dummy/data";
import useQRScanner from "../../hooks/useQRScanner";
import type { ParameterDataType, ParsedData, SignedTxType } from "../../types/type";
import { formatBalance } from "../../utils/formatBalance";
import { usePayment } from "../../hooks/usePayments";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

const VendorHome: React.FC = () => {
  const walletAddress = process.env.NEXT_PUBLIC_STORE_ADDRESS || "";
  const fertilizerAddress = process.env.NEXT_PUBLIC_FERTILIZER_TOKEN_ADDRESS || "";
  const shovelAddress = process.env.NEXT_PUBLIC_SHOVEL_TOKEN_ADDRESS || "";
  const seedsAddress = process.env.NEXT_PUBLIC_SEEDS_TOKEN_ADDRESS || "";
  const pesticideAddress = process.env.NEXT_PUBLIC_PESTICIDE_TOKEN_ADDRESS || "";

  const [vendorFertilizerBalance, setVendorFertilizerBalance] = useState<string | null>(null);
  const [vendorShovelBalance, setVendorShovelBalance] = useState<string | null>(null);
  const [vendorSeedsBalance, setVendorSeedsBalance] = useState<string | null>(null);
  const [vendorPesticideBalance, setVendorPesticideBalance] = useState<string | null>(null);

  const [signedTransferData, setSignedTransferData] = useState<SignedTxType[] | string | null>(null);
  const [userInfoData, setUserInfoData] = useState<ParameterDataType | null>(null);
  const [userActualInfoData, setActualUserInfoData] = useState<ParameterDataType | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [showPad, setShowPad] = useState<boolean>(false);
  const [passwordConfirmed, setPasswordConfirmed] = useState<boolean>(false);

  const router = useRouter();
  const { transferSuccess, onClickBatchTransfer, loading } = usePayment();

  const { videoRef, scanning, startCamera, setScanning, stopCamera } = useQRScanner(async (result: string) => {
    try {
      console.log("진입");
      const response = await axios.get("/api/request/recent");
      console.log(response);
      const parsedData: ParsedData = response.data;
      if (parsedData) {
        const { requestData, userPassword } = parsedData;

        setUserPassword(userPassword);
        setSignedTransferData(requestData.transferRequests);

        setUserInfoData({
          userId: "0",
          userName: "Need to verify",
          userAddress: "0XXXXXXXXXXXX",
          fertilizer: requestData.parameterData.fertilizer,
          shovel: requestData.parameterData.shovel,
          seeds: requestData.parameterData.seeds,
          pesticide: requestData.parameterData.pesticide,
        });
        setActualUserInfoData(requestData.parameterData);
      }
    } catch (error) {
      console.error("Error fetching data from QR code:", error);
    } finally {
      setScanning(false);
    }
  });

  useEffect(() => {
    const fetchTokenBalance = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
        const fertilizerContract = new ethers.Contract(
          fertilizerAddress,
          ["function balanceOf(address owner) view returns (uint256)"],
          provider,
        );
        const shovelContract = new ethers.Contract(
          shovelAddress,
          ["function balanceOf(address owner) view returns (uint256)"],
          provider,
        );
        const seedsContract = new ethers.Contract(
          seedsAddress,
          ["function balanceOf(address owner) view returns (uint256)"],
          provider,
        );
        const pesticideContract = new ethers.Contract(
          pesticideAddress,
          ["function balanceOf(address owner) view returns (uint256)"],
          provider,
        );

        const fertilizerbalance: BigNumberish = await fertilizerContract.balanceOf(walletAddress);
        setVendorFertilizerBalance(formatBalance(fertilizerbalance, 18));

        const shovelbalance: BigNumberish = await shovelContract.balanceOf(walletAddress);
        setVendorShovelBalance(formatBalance(shovelbalance, 18));

        const seedsbalance: BigNumberish = await seedsContract.balanceOf(walletAddress);
        setVendorSeedsBalance(formatBalance(seedsbalance, 18));

        const pesticidebalance: BigNumberish = await pesticideContract.balanceOf(walletAddress);
        setVendorPesticideBalance(formatBalance(pesticidebalance, 18));
      } catch (error) {
        console.error("Error fetching token balance:", error);
      }
    };

    fetchTokenBalance();
  }, [walletAddress, fertilizerAddress, shovelAddress, seedsAddress, pesticideAddress]);

  const handleShowPad = () => {
    setShowPad(true);
  };

  const handleSendToken = () => {
    if (signedTransferData) {
      let parsedData;
      if (typeof signedTransferData === "string") {
        try {
          parsedData = JSON.parse(signedTransferData);
        } catch (error) {
          console.error("Error parsing signedTransferData:", error);
          return;
        }
      } else {
        parsedData = signedTransferData;
      }
      onClickBatchTransfer(parsedData as string[]);
    }
  };

  const onClickQr = async () => {
    setErrorMessage(null);
    try {
      setScanning(true);
      await startCamera();
    } catch (error) {
      setErrorMessage("Camera access was denied. Please allow camera access and try again.");
      setScanning(false);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Wallet address copied to clipboard.");
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}....${address.slice(-4)}`;
  };

  const handleConfirmReceipt = () => {
    alert("Receipt confirmed!");
  };

  const handleReportIssue = () => {
    alert("Issue reported!");
  };

  const handleGoHome = () => {
    window.location.reload();
  };

  useEffect(() => {
    router.prefetch("/payments");
    router.prefetch("/minting");

    return () => {
      stopCamera();
    };
  }, [router, stopCamera]);

  const handlePadInput = (num: string) => {
    if (enteredPassword.length < 4) {
      setEnteredPassword(enteredPassword + num);
    }
  };

  const handlePadDelete = () => {
    setEnteredPassword(enteredPassword.slice(0, -1));
  };

  const handlePadSubmit = () => {
    if (enteredPassword === userPassword) {
      alert("Password confirmed!");
      setShowPad(false);
      setPasswordConfirmed(true);
      setIsVerified(true);
      // if (signedTransferData) {
      //   let parsedData;
      //   if (typeof signedTransferData === "string") {
      //     try {
      //       parsedData = JSON.parse(signedTransferData);
      //     } catch (error) {
      //       console.error("Error parsing signedTransferData:", error);
      //       return;
      //     }
      //   } else {
      //     parsedData = signedTransferData;
      //   }
      //   onClickBatchTransfer(parsedData as string[]);
      // }
    } else {
      alert("Incorrect password. Please try again.");
      setEnteredPassword("");
    }
  };

  const DUMMY_EXCHANGE_RATES = {
    fertilizer: 3000, // 1 token = 3000 Ariary
    shovel: 2500, // 1 token = 2500 Ariary
    seeds: 3000, // 1 token = 3000 Ariary
    pesticide: 4000, // 1 token = 4000 Ariary
  };

  const calculateTotalAriary = () => {
    const fertilizerAriary = Number(vendorFertilizerBalance) * DUMMY_EXCHANGE_RATES.fertilizer;
    const shovelAriary = Number(vendorShovelBalance) * DUMMY_EXCHANGE_RATES.shovel;
    const seedsAriary = Number(vendorSeedsBalance) * DUMMY_EXCHANGE_RATES.seeds;
    const pesticideAriary = Number(vendorPesticideBalance) * DUMMY_EXCHANGE_RATES.pesticide;
    return fertilizerAriary + shovelAriary + seedsAriary + pesticideAriary;
  };

  const displayBalanceWithAriary = (balance: string | null, exchangeRate: number) => {
    if (balance === null) return "Loading...";
    const balanceInAriary = Number(balance) * exchangeRate;
    return `${balanceInAriary.toFixed(0)} Ar`;
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex items-center justify-between bg-blue-600 p-4 text-white">
        <div>
          <h1 className="text-xl font-bold">Merchant Home</h1>
          <div className="flex items-center">
            <p className="text-white">{truncateAddress(walletAddress)}</p>
            <FaCopy onClick={() => handleCopy(walletAddress)} className="ml-2 cursor-pointer text-white" size={15} />
          </div>
        </div>
        <FaRegUserCircle size={30} className="text-white" />
      </div>
      {loading && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <Lottie loop animationData={loadingloti} play />
        </div>
      )}
      <div className="flex-1 p-4">
        {userInfoData ? (
          <div className="flex flex-col items-center">
            {userActualInfoData && isVerified ? (
              <>
                <Image
                  src={joonwon}
                  alt="profile"
                  width={300}
                  height={400}
                  style={{ marginBottom: "30px", marginTop: "40px" }}
                />
                <FarmerInfo farmer={userActualInfoData} truncateAddress={truncateAddress} />
              </>
            ) : (
              <>
                <Image
                  src={profile}
                  alt="profile"
                  width={300}
                  height={400}
                  style={{ marginBottom: "30px", marginTop: "20px" }}
                />
                <FarmerInfo farmer={userInfoData} truncateAddress={truncateAddress} />
              </>
            )}
            <ItemList
              items={[
                { id: "item1", name: "Fertilizer", quantity: Number(userInfoData.fertilizer) },
                { id: "item2", name: "Shovel", quantity: Number(userInfoData.shovel) },
                { id: "item3", name: "Seeds", quantity: Number(userInfoData.seeds) },
                { id: "item4", name: "Pesticide", quantity: Number(userInfoData.pesticide) },
              ]}
            />
            {transferSuccess === null ? (
              userActualInfoData && isVerified ? (
                <button
                  type="button"
                  onClick={handleSendToken}
                  className="mt-4 w-full max-w-md rounded bg-green-600 p-2 text-white transition duration-300 hover:bg-green-700"
                >
                  Accept Voucher
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleShowPad}
                  className="mt-4 w-full max-w-md rounded bg-gray-600 p-2 text-white transition duration-300 hover:bg-green-700"
                >
                  Verify Identity
                </button>
              )
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleConfirmReceipt}
                  className="mt-4 w-full max-w-md rounded bg-green-600 p-2 text-white transition duration-300 hover:bg-green-700"
                >
                  Confirm Receipt
                </button>
                <button
                  type="button"
                  onClick={handleReportIssue}
                  className="mt-2 w-full max-w-md rounded bg-red-600 p-2 text-white transition duration-300 hover:bg-red-700"
                >
                  Report Issue
                </button>
                <button
                  type="button"
                  onClick={handleGoHome}
                  className="mt-2 w-full max-w-md rounded bg-blue-600 p-2 text-white transition duration-300 hover:bg-red-700"
                >
                  Home
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={onClickQr}
              className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition duration-300 hover:bg-blue-700 active:bg-blue-800"
            >
              <FaQrcode size={36} />
            </button>
            <div className="mt-4 w-full max-w-md rounded-lg bg-white p-4 shadow-md">
              <h2 className="mb-2 text-lg font-semibold text-gray-800">Inventory Management</h2>
              <ul className="list-inside list-disc">
                <li className="mb-4 flex flex-col justify-between">
                  <span className="flex flex-row justify-between">
                    <span>Fertilizer</span>
                    <span>{200 - Number(vendorFertilizerBalance)}</span>
                  </span>
                  <span className="text-right text-gray-500">
                    {displayBalanceWithAriary(vendorFertilizerBalance, DUMMY_EXCHANGE_RATES.fertilizer)}
                  </span>
                </li>
                <li className="mb-4 flex flex-col justify-between">
                  <span className="flex flex-row justify-between">
                    <span>Shovel</span>
                    <span>{200 - Number(vendorShovelBalance)}</span>
                  </span>
                  <span className="text-right text-gray-500">
                    {displayBalanceWithAriary(vendorShovelBalance, DUMMY_EXCHANGE_RATES.shovel)}
                  </span>
                </li>
                <li className="mb-4 flex flex-col justify-between">
                  <span className="flex flex-row justify-between">
                    <span>Seeds</span>
                    <span>{200 - Number(vendorSeedsBalance)}</span>
                  </span>
                  <span className="text-right text-gray-500">
                    {displayBalanceWithAriary(vendorSeedsBalance, DUMMY_EXCHANGE_RATES.seeds)}
                  </span>
                </li>
                <li className="mb-4 flex flex-col justify-between">
                  <span className="flex flex-row justify-between">
                    <span>Pesticide</span>
                    <span>{200 - Number(vendorPesticideBalance)}</span>
                  </span>
                  <span className="text-right text-gray-500">
                    {displayBalanceWithAriary(vendorPesticideBalance, DUMMY_EXCHANGE_RATES.pesticide)}
                  </span>
                </li>
              </ul>
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-800">Total Value</h2>
                <p className="text-right">Ar {calculateTotalAriary().toFixed(0)} MGA</p>
              </div>
            </div>
            <div className="mt-4 w-full max-w-md rounded-lg bg-white p-4 shadow-md">
              <h2 className="mb-2 text-lg font-semibold text-gray-800">Transaction History</h2>
              <ul className="mt-4">
                {farmertransactions.map((transaction) => (
                  <li key={transaction.id} className="mb-2 flex flex-col rounded-md bg-gray-100 p-2 shadow">
                    <div className="flex justify-between">
                      <span>Farmer:</span>
                      <span>{transaction.farmer}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Address:</span>
                      <span>{truncateAddress(transaction.farmerAddress)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{transaction.date}</span>
                    </div>
                    <div className="mt-2">
                      <span className="font-semibold">Items:</span>
                      <ul className="list-inside list-disc">
                        {transaction.items.map((item) => (
                          <li key={item.id} className="flex justify-between">
                            <span>{item.name}</span>
                            <span>{item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div
                      className={`mt-2 flex justify-between ${transaction.status === "Completed" ? "text-green-600" : "text-red-600"}`}
                    >
                      <span>Status:</span>
                      <span>{transaction.status}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {scanning && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="w-full max-w-md p-4">
              <video ref={videoRef} className="h-auto w-full rounded-lg shadow-lg" />
              <button
                type="button"
                onClick={() => setScanning(false)}
                className="mt-4 w-full rounded bg-red-600 p-2 text-white transition duration-300 hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {showPad && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
              <div className="mb-4 flex justify-between">
                <div className="flex flex-col">
                  <div className="text mb-4 rounded bg-yellow-200 px-4 pb-4 pt-4 text-lg text-red-700 ">
                    Please enter the password to use your Voucher!
                  </div>
                  <div className="flex flex-row">
                    <input
                      type="password"
                      value={enteredPassword}
                      readOnly
                      className="w-full rounded border p-2 text-center"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPad(false)}
                      className="ml-2 rounded bg-red-600 p-2 text-white"
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => handlePadInput(num.toString())}
                    className="rounded bg-gray-200 p-4 hover:bg-gray-300"
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  onClick={handlePadDelete}
                  className="mr-2 w-1/2 rounded bg-red-600 p-2 text-white"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={handlePadSubmit}
                  className="ml-2 w-1/2 rounded bg-green-600 p-2 text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorHome;
