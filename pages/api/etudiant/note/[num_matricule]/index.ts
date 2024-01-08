import { NextApiRequest, NextApiResponse } from "next";
import { fetchAllNoteByStudent } from "@/utils/releveNoteFunction";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { num_matricule } = req.query;
    if (typeof num_matricule === "string") {
      const response = await fetchAllNoteByStudent(num_matricule);
      return res.status(200).json(response);
    } else return res.status(401).json("num_matricule invalide");
  } catch (error) {
    console.error(error);
  }
}
