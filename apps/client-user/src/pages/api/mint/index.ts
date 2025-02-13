import type { NextApiRequest, NextApiResponse } from "next";
import { MintService } from "../../../service/mint/mintService";
import { RelayService } from "../../../service/relay/relayService";
import type { MintData } from "../../../types/type";

const relayService = new RelayService();
const mintService = new MintService(relayService);

export default async function mintHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const mintData: MintData = req.body;
  try {
    const result = await mintService.processMinting(mintData);

    if (result === "Transaction executed successfully") {
      res.status(200).json({ message: "Minting executed successfully" });
    } else {
      res.status(500).json({ message: `Minting failed to execute: ${result}` });
    }
  } catch (error: any) {
    console.error("Error processing minting:", error);
    res.status(500).json({ message: `Minting failed: ${error.message}` });
  }
}
