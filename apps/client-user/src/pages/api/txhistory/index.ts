import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function txHistoryHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { from, to, items, count, amount, total, timestamp } = req.body;

    try {
      const newTxHistory = await prisma.txHistory.create({
        data: {
          from,
          to,
          items,
          count,
          amount,
          total,
          timestamp,
        },
      });

      res.status(201).json(newTxHistory);
    } catch (error) {
      console.error("Error creating transaction history:", error);
      if (error instanceof PrismaClientKnownRequestError) {
        console.error("Known request error:", error.message);
      }
      res.status(500).json({ error: "Unable to save transaction history", details: error });
    }
  } else if (req.method === "GET") {
    const { address } = req.query;

    try {
      const txHistories = await prisma.txHistory.findMany({
        where: { from: address as string },
        orderBy: { timestamp: "desc" },
      });

      res.status(200).json(txHistories);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
      if (error instanceof PrismaClientKnownRequestError) {
        console.error("Known request error:", error.message);
      }
      res.status(500).json({ error: "Unable to fetch transaction history", details: error });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
