/* eslint-disable guard-for-in */

/* eslint-disable no-restricted-syntax */
import type { BigNumberish } from "ethers";
import { ethers } from "ethers";
import React, { useState } from "react";
import type { RecentTransaction, RecentTxsProps, TransferEvent } from "../../../types/type";
import { formatBalance } from "../../../utils/formatBalance";

const statisticsData = [
  { label: "Total Balance", value: "123,003 MGA", change: "+0.25%" },
  { label: "Today's Trading", value: "502", change: "-21", unit: "MGA" },
  { label: "Total Trading", value: "5,502 MGA", change: "+201" },
  { label: "Transaction Count", value: 789, change: "+3" },
];

const RecentTxs: React.FC<RecentTxsProps> = ({ logs, isLoading }) => {
  const [expandedTx, setExpandedTx] = useState<number | null>(null);

  const toggleDetails = (txId: number) => {
    setExpandedTx(expandedTx === txId ? null : txId);
  };

  const processLogs = (logs: TransferEvent[]): RecentTransaction[] => {
    const recentTransactions: RecentTransaction[] = [];
    const transactionMap: { [hash: string]: TransferEvent[] } = {};

    logs.forEach((log) => {
      if (log.from.walletAddress === "0x0000000000000000000000000000000000000000") {
        return;
      }
      if (!transactionMap[log.hash]) {
        transactionMap[log.hash] = [];
      }
      transactionMap[log.hash].push(log);
    });

    let id = 1;

    for (const hash in transactionMap) {
      const groupedLogs = transactionMap[hash];
      if (groupedLogs.length < 1) continue;

      const { from, to, date, status } = groupedLogs[0];
      const items = groupedLogs.map((log) => ({
        type: log.item,
        amount: log.quantity || "0",
      }));

      const transaction: RecentTransaction = {
        id: (id += 1),
        hash,
        from,
        to,
        items,
        date,
        status,
      };

      recentTransactions.push(transaction);
    }

    return recentTransactions;
  };

  const recentTransactions = processLogs(logs as TransferEvent[]);

  const renderItemsSummary = (items: any) => {
    if (items.length === 1) {
      return `${items[0].type}: ${items[0].amount}`;
    }
    if (items.length > 1) {
      const firstItem = `${items[0].type}`;
      const remainingCount = items.length - 1;
      return `${firstItem} and ${remainingCount} more`;
    }
    return "";
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row mb-4">
        <div className="col-md-12">
          <h2>Transactions</h2>
        </div>
      </div>
      <div className="row mb-4">
        {statisticsData.map((stat) => (
          <div className="col-md-3 mb-4" key={stat.label}>
            <div className="card p-3 text-center shadow-sm">
              <h5>{stat.label}</h5>
              <p className="h4">
                {stat.value} {stat.unit ? stat.unit : ""}
              </p>
              {stat.change && (
                <span className={`text-${stat.change.startsWith("-") ? "danger" : "success"}`}>{stat.change}</span>
              )}
              <p className="text-muted" style={{ fontSize: "0.8rem" }}>
                As of [specific time/date]
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">Recent Transactions</div>
            <div className="card-body">
              {isLoading ? (
                <p className="text-center">Loading Data...</p>
              ) : (
                <table className="table-bordered table-hover table" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>From</th>
                      <th>To</th>
                      <th>Items</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((tx) => (
                      <React.Fragment key={tx.id}>
                        <tr onClick={() => toggleDetails(tx.id)} style={{ cursor: "pointer" }} className="table-row">
                          <td>
                            <div className="d-flex align-items-center">
                              {expandedTx === tx.id && tx.from.profileImg}
                              <div className="ms-2">
                                {tx.from.userId} <br />
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {expandedTx === tx.id && tx.to.profileImg}
                              <div className="ms-2">
                                {tx.to.userId} <br />
                              </div>
                            </div>
                          </td>
                          <td>
                            <ul className="list-unstyled">
                              <li>{renderItemsSummary(tx.items)}</li>
                            </ul>
                          </td>
                          <td className={tx.status === "completed" ? "text-success" : ""}>{tx.status}</td>
                          <td>{tx.date}</td>
                        </tr>
                        {expandedTx === tx.id && (
                          <tr>
                            <td colSpan={5} className="bg-light p-4">
                              <div className="trading-details">
                                <p>
                                  <strong>Trading Details: </strong>
                                  This trade was conducted between a farmer and a vendor. The farmer, identified by{" "}
                                  <strong>User ID {tx.from.userId}</strong> and wallet address{" "}
                                  <strong className="text-gray-400">{tx.from.walletAddress}</strong>, transferred
                                  products to the vendor. The vendor&apos;s information includes{" "}
                                  <strong>User ID {tx.to.userId}</strong> and wallet address{" "}
                                  <strong className="text-gray-400">{tx.to.walletAddress}</strong>. The vendor is
                                  located in the city of <strong>Antananarivo, Madagascar</strong>.
                                </p>

                                <p className="mt-4">
                                  The trade included{" "}
                                  <strong className=" text-red-400">
                                    {formatBalance(ethers.parseUnits(tx.items[0].amount, 18) as BigNumberish, 18)}{" "}
                                    {tx.items[0].type}{" "}
                                  </strong>
                                  ,{" "}
                                  <strong className=" text-red-400">
                                    {formatBalance(ethers.parseUnits(tx.items[1].amount, 18) as BigNumberish, 18)}{" "}
                                    {tx.items[1].type}
                                  </strong>{" "}
                                  ,{" "}
                                  <strong className=" text-red-400">
                                    {formatBalance(ethers.parseUnits(tx.items[2].amount, 18) as BigNumberish, 18)}{" "}
                                    {tx.items[2].type}
                                  </strong>{" "}
                                  , and{" "}
                                  <strong className=" text-red-400">
                                    {formatBalance(ethers.parseUnits(tx.items[3].amount, 18) as BigNumberish, 18)}{" "}
                                    {tx.items[3].type}
                                  </strong>{" "}
                                  .
                                </p>
                                <p className="mt-0">
                                  The farmer gave the products to the merchant, and the merchant handed over the items.
                                  Because this exchange was confirmed, the status is marked as
                                  <span className="text-success">
                                    {" "}
                                    <strong>completed</strong>
                                  </span>
                                  !!
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTxs;
