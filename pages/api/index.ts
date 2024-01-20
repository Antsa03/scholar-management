import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import authOptions from "@/pages/api/auth/[...nextauth]/index";
import { getToken } from "next-auth/jwt";

export default async function restApiHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const token: any = await getToken({ req, secret: process.env.SECRET });
  console.log(session, token);
  if (!token) res.status(401).json("Vous n'êtes pas authentififé");
  res.status(200).json({ authenticate: !!session });
}
