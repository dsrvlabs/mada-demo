import type { NextApiRequest, NextApiResponse } from "next";
import { RelayService } from "../../../service/relay/relayService";
import type { ForwardRequest } from "../../../types/type";

export default async function batchRelayHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const signedTransactionList: ForwardRequest[] = req.body;

    const relayService = new RelayService();
    try {
      const result = await relayService.processBatchTransaction(signedTransactionList);
      if (result === "Transaction executed successfully") {
        res.status(200).json({ message: "Transaction executed successfully" });
      } else {
        res.status(500).json({ message: `Transaction failed to execute: ${result}` });
      }
    } catch (error: any) {
      console.error("Error processing transaction:", error);
      res.status(500).json({ message: `Transaction failed: ${error.message}` });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
