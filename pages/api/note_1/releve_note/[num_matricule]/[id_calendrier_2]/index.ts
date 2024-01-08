import { NextApiRequest, NextApiResponse } from "next";
import { fetchReleveNote } from "@/utils/releveNoteFunction";
import Releve_note from "@/models/note_1/Releve_note";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { num_matricule, id_calendrier_2 } = req.query;
    if (
      typeof num_matricule === "string" &&
      typeof id_calendrier_2 === "string"
    ) {
      const notes: Releve_note = await fetchReleveNote(
        id_calendrier_2,
        num_matricule
      );

      return res.status(200).json(notes);
    } else return res.status(401).json("Paramètre invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}
