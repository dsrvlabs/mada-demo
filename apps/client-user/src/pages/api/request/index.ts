/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { NextApiRequest, NextApiResponse } from "next";
import { CreateRequestDto } from "../../../service/request/dto/create-request.dto";
import { requestService } from "../../../service/request/requestService";

export default async function requestHandler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === "POST") {
    try {
      const createRequestDto = new CreateRequestDto(req.body.requestData, req.body.userPassword);
      const result = requestService.create(createRequestDto);
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
