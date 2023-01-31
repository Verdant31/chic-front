import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if ((req.body.type as string).includes("payment_intent")) {
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
