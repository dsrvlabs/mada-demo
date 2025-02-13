/* eslint-disable @nx/enforce-module-boundaries */
import { transactions } from "apps/client-user/src/dummy/data";
import { useAuth } from "apps/client-user/src/hooks/useAuth";
import { useBalance } from "apps/client-user/src/hooks/useBalance";
import axios from "axios";
// import Lottie from "react-lottie-player";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaSmile } from "react-icons/fa";
import farmer from "../../../../public/shared/images/img_farmer.png";
import joonwon from "../../../../public/shared/images/img_profile.jpg";
import loadingloti from "../../../../public/shared/lottie/loading2.json";
import { useMinting } from "../../../hooks/useMinting";
import { usePayment } from "../../../hooks/usePayments";
import type { ParameterDataType } from "../../../types/type";
import QRPopup from "../../popUpModal/QrPopup";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

const MintTokenForm = ({ user }: { user: { id: string; name: string; address: string } }) => {
  const { address } = useAuth();
  const { fertilizerbalance, shovelbalance, seedsbalance, pesticidebalance } = useBalance();
  const { mintVoucherToken, loading } = useMinting();
  const { signQRInfo } = usePayment();
  const { fetchVoucherBalances } = useBalance();

  const [userPassword, setUserPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [recipient, setRecipient] = useState(address || "");
  const [fertilizer, setFertilizer] = useState(0);
  const [shovel, setShovel] = useState(0);
  const [seeds, setSeeds] = useState(0);
  const [pesticide, setPesticide] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [urlValue, setUrlValue] = useState<string>("");
  const [userValue, setUserValue] = useState<ParameterDataType>();

  useEffect(() => {
    const initializeBalances = async () => {
      if (address) {
        setRecipient(address);
        await fetchVoucherBalances(address);
      }
    };
    initializeBalances();
  }, [address, fetchVoucherBalances]);

  const handleMint = async () => {
    if (userPassword.length !== 4 || userPassword !== confirmPassword) {
      alert("Password must be 4 digits and match the confirmation password.");
      return;
    }

    const items = {
      fertilizer: String(fertilizer),
      shovel: String(shovel),
      seeds: String(seeds),
      pesticide: String(pesticide),
    };

    await mintVoucherToken(recipient, items);
    await fetchVoucherBalances(recipient);

    const transferRequests = await signQRInfo(items);

    const parameterData: ParameterDataType = {
      userId: user.id,
      userName: user.name,
      userAddress: user.address,
      fertilizer: String(fertilizer),
      shovel: String(shovel),
      seeds: String(seeds),
      pesticide: String(pesticide),
    };

    if (transferRequests !== null) {
      const requestData = {
        transferRequests,
        parameterData,
      };

      try {
        const response = await axios.post("/api/request", {
          requestData,
          userPassword,
        });
        setUrlValue(String(response.data.apiUrl));
        setUserValue(parameterData);
        setShowPopup(true);
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }
  };

  return (
    <div className="container-fluid">
      {loading && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <Lottie loop animationData={loadingloti} play />
        </div>
      )}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">User Information</div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3 d-flex align-items-center justify-content-center">
                  <Image alt="Farmer" src={joonwon} width={150} height={150} />
                </div>
                <div className="col-md-8">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th scope="row">User ID:</th>
                        <td>{user.id}</td>
                      </tr>
                      <tr>
                        <th scope="row">Name:</th>
                        <td>{user.name}</td>
                      </tr>
                      <tr>
                        <th scope="row">Address:</th>
                        <td>{user.address}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-header">Current Holdings</div>
            <div className="card-body">
              <table className="min-w-full border bg-white">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 text-center">Fertilizer</th>
                    <th className="border px-4 py-2 text-center">Shovel</th>
                    <th className="border px-4 py-2 text-center">Seeds</th>
                    <th className="border px-4 py-2 text-center">Pesticide</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2 text-center">{fertilizerbalance}</td>
                    <td className="border px-4 py-2 text-center">{shovelbalance}</td>
                    <td className="border px-4 py-2 text-center">{seedsbalance}</td>
                    <td className="border px-4 py-2 text-center">{pesticidebalance}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header">Transaction History</div>
            <div className="card-body">
              <ul className="list-group">
                {transactions.map((transaction) => (
                  <li key={transaction.id} className="list-group-item">
                    <div className="d-flex justify-content-between">
                      <div>{transaction.date}</div>
                      <div>{transaction.item}</div>
                      <div>{transaction.quantity}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-center">
                <button type="button" className="btn btn-primary rounded bg-blue-100 px-3 py-1 text-black">
                  Show More
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">Products</div>
            <div className="card-body">
              <div className="form-group mb-4">
                <div className="form-group mb-4">
                  <label className="d-flex justify-content-between align-items-center">
                    Fertilizer
                    <div className="d-flex justify-content-between" style={{ width: "200px" }}>
                      <button
                        type="button"
                        className="btn btn-secondary text-black"
                        onClick={() => setFertilizer(fertilizer > 0 ? fertilizer - 1 : 0)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control border-none text-center"
                        value={fertilizer}
                        onChange={(e) => setFertilizer(Number(e.target.value))}
                        min="0"
                      />
                      <button
                        type="button"
                        className="btn btn-secondary text-black"
                        onClick={() => setFertilizer(fertilizer + 1)}
                      >
                        +
                      </button>
                    </div>
                  </label>
                </div>

                <div className="form-group mb-4">
                  <label className="d-flex justify-content-between align-items-center">
                    Shovel
                    <div className="d-flex justify-content-between" style={{ width: "200px" }}>
                      <button
                        type="button"
                        className="btn btn-secondary text-black"
                        onClick={() => setShovel(shovel > 0 ? shovel - 1 : 0)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control border-none text-center"
                        value={shovel}
                        onChange={(e) => setShovel(Number(e.target.value))}
                        min="0"
                      />
                      <button
                        type="button"
                        className="btn btn-secondary text-black"
                        onClick={() => setShovel(shovel + 1)}
                      >
                        +
                      </button>
                    </div>
                  </label>
                </div>

                <div className="form-group mb-4">
                  <label className="d-flex justify-content-between align-items-center">
                    Seeds
                    <div className="d-flex justify-content-between" style={{ width: "200px" }}>
                      <button
                        type="button"
                        className="btn btn-secondary text-black"
                        onClick={() => setSeeds(seeds > 0 ? seeds - 1 : 0)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control border-none text-center"
                        value={seeds}
                        onChange={(e) => setSeeds(Number(e.target.value))}
                        min="0"
                      />
                      <button
                        type="button"
                        className="btn btn-secondary text-black"
                        onClick={() => setSeeds(seeds + 1)}
                      >
                        +
                      </button>
                    </div>
                  </label>
                </div>

                <div className="form-group mb-4">
                  <label className="d-flex justify-content-between align-items-center">
                    Pesticide
                    <div className="d-flex justify-content-between" style={{ width: "200px" }}>
                      <button
                        type="button"
                        className="btn btn-secondary text-black"
                        onClick={() => setPesticide(pesticide > 0 ? pesticide - 1 : 0)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control border-none text-center"
                        value={pesticide}
                        onChange={(e) => setPesticide(Number(e.target.value))}
                        min="0"
                      />
                      <button
                        type="button"
                        className="btn btn-secondary text-black"
                        onClick={() => setPesticide(pesticide + 1)}
                      >
                        +
                      </button>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <label className=" d-flex justify-content-between align-items-center mb-4 mt-4">
            Password
            <div className="d-flex justify-content-between" style={{ width: "200px" }}>
              <input
                type="password"
                className="form-control"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                maxLength={4}
                placeholder="Enter 4 digit password"
              />
            </div>
          </label>
          <label className="d-flex justify-content-between align-items-center mb-8">
            Confirm Password
            <div className="d-flex justify-content-between" style={{ width: "200px" }}>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                maxLength={4}
                placeholder="Confirm 4 digit password"
              />
            </div>
          </label>
          <button
            type="button"
            className="btn btn-primary w-100 bg-blue-600 py-2 font-bold text-white hover:bg-gray-800 hover:text-white"
            onClick={handleMint}
            disabled={userPassword.length !== 4 || userPassword !== confirmPassword}
          >
            Issue Voucher
          </button>
        </div>
      </div>
      {showPopup && userValue && urlValue && (
        <QRPopup qrValue={urlValue} userValue={userValue} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default MintTokenForm;
