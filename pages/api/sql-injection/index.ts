import { sql_injection } from "@/utils/scriptSQL";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const utilisateur = await sql_injection("001A' OR  1=1 --");
  return res.status(200).json(utilisateur);
}
