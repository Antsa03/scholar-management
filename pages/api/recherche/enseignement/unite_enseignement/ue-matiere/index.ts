import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Annee_UE_Matiere from "@/models/enseignement/Annee_UE_Matiere";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const search_value: string = req.body;
    const result_1: any = await prisma.$queryRawUnsafe(
      `
    WITH matieres AS (
     SELECT
      c.annee_universitaire_1,
      ue.id_ue,
      ue.designation_ue,
      ue.semestre_ue,
      ue.credit,
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'code_matiere', c.code_matiere,
          'designation_matiere', m.designation_matiere,
          'v_horaire_matiere', m.v_horaire_matiere,
          'coeff', m.coeff
        )
      ) AS matieres
     FROM
      "Composer_1" c
     INNER JOIN
      "Unite_Enseignement" ue ON c.id_ue = ue.id_ue
     INNER JOIN
      "Matiere" m ON c.code_matiere = m.code_matiere
     WHERE
      ue.id_ue LIKE $1 OR ue.designation_ue LIKE $1
     GROUP BY
      c.annee_universitaire_1,
      ue.id_ue,
      ue.designation_ue,
      ue.credit
    ),
    annees AS (
     SELECT
     m.annee_universitaire_1,
     JSON_AGG(
       JSON_BUILD_OBJECT(
         'id_ue', m.id_ue,
         'designation_ue', m.designation_ue,
         'credit', m.credit,
         'semestre_ue', m.semestre_ue,
         'matieres', m.matieres
       )
     ) AS ue_matieres
     FROM
     matieres m
     GROUP BY
     m.annee_universitaire_1
    )
    SELECT
     JSON_AGG(
     JSON_BUILD_OBJECT(
       'annee_universitaire_1', a.annee_universitaire_1,
       'ue_matieres', a.ue_matieres
     )
     ) AS result
    FROM
     annees a
    GROUP BY a.annee_universitaire_1
    ORDER BY
     a.annee_universitaire_1 ASC;    
    `,
      `%${search_value}%`
    );
    if (!result_1[0] || !result_1[0].result) {
      return res.status(200).json([]); // Retourne un tableau vide si annee_ue_matiere est undefined ou null
    }
    const annee_ue_matiere: Annee_UE_Matiere[] = result_1[0]
      .result as Annee_UE_Matiere[];
    return res.status(200).json(annee_ue_matiere);
  } catch (error) {
    return res.status(500).json(error);
  }
}
