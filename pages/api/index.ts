import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import authOptions from "@/pages/api/auth/[...nextauth]/index";

export default async function restApiHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  console.log(session);
  res.status(200).json({ authenticate: !!session });
}
