import { NextApiRequest, NextApiResponse } from "next";
import { fetchAllNote } from "@/utils/releveNoteFunction";
import generateExcel from "@/utils/generateExcel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id_calendrier_2, groupe } = req.query;
    if (typeof id_calendrier_2 === "string" && typeof groupe === "string") {
      const response = await fetchAllNote(id_calendrier_2, groupe);
      const file = await generateExcel(response, "liste-note");
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      return res.send(file);
    } else return res.status(401).json("Une erreur s'est produite");
  } catch (error) {
    console.error(error);
  }
}
