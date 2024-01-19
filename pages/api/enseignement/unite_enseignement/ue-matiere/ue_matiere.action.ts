import prisma from "@/prisma/client";
import UE_matiere from "@/models/enseignement/UE_matiere";

export const annee_ue_matiere = async (annee_universitaire: string) => {
  const ue_matiere: UE_matiere = await prisma.$queryRawUnsafe(
    ` 
      SELECT 
          ue.id_ue,
          ue.designation_ue,
          ue.credit,
          ue.semestre_ue,
          JSON_AGG (
              JSON_BUILD_OBJECT(
              'code_matiere', c.code_matiere,
              'designation_matiere', m.designation_matiere,
              'v_horaire_matiere', m.v_horaire_matiere,
              'coeff', m.coeff
          )
      ) as matieres
      FROM 
      "Unite_Enseignement" AS ue
      JOIN 
      "Composer_1" AS c ON ue.id_ue = c.id_ue
      JOIN 
      "Matiere" AS m ON c.code_matiere = m.code_matiere
      WHERE c.annee_universitaire_1 = $1
      GROUP BY 
      ue.id_ue
      ORDER BY id_ue ASC
  `,
    annee_universitaire
  );
  return ue_matiere;
};
