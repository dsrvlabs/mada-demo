import type { NextApiRequest, NextApiResponse } from "next";
import { requestService } from "../../../service/request/requestService";

export default async function requestRecentHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const latestRequest = requestService.findLatest();
      res.status(200).json(latestRequest);
    } catch (error) {
      console.error("Error fetching latest request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
