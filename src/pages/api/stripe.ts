import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(req);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
