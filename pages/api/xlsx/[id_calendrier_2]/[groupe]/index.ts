import { NextApiRequest, NextApiResponse } from "next";
import { fetchAllNote } from "@/utils/releveNoteFunction";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id_calendrier_2, groupe } = req.query;
    if (typeof id_calendrier_2 === "string" && typeof groupe === "string") {
      const response = await fetchAllNote(id_calendrier_2, groupe);
      return res.status(200).json(response);
    } else return res.status(401).json("Année universitaire invalide");
  } catch (error) {
    console.error(error);
  }
}
