import prisma from "@/prisma/client";
import Releve_note from "@/models/note_1/Releve_note";

export async function fetchAllNote(id_calendrier_2: string, groupe: string) {
  const allNotes: any = await prisma.$queryRawUnsafe(
    `
   SELECT
        u.nom,
        u.prenoms,
        cal.id_calendrier_2,
        cal.annee_universitaire_2,
        n.num_matricule,
        niv.id_niveau,
        niv.designation_niveau,
        par.id_parcours,
        par.designation_parcours,
        info.groupe,
        JSON_AGG(
          JSON_BUILD_OBJECT(
                'id_ue', ue.id_ue,
                'designation_ue', ue.designation_ue,
                'credit', ue.credit,
                'semestre_ue', ue.semestre_ue,
                'matieres', (
                    SELECT JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'code_matiere', note.code_matiere,
                            'designation_matiere', m.designation_matiere,
                            'v_horaire_matiere', m.v_horaire_matiere,
                            'coeff', m.coeff,
                            'note_matiere', note.note_matiere
                        )
                        ORDER BY note.code_matiere ASC
                    )
                    FROM "Noter_1" note
                    INNER JOIN "Composer_1" c ON note.code_matiere = c.code_matiere
                    INNER JOIN "Matiere" m ON note.code_matiere = m.code_matiere AND c.code_matiere = m.code_matiere
                    INNER JOIN "Calendrier_2" cal ON note.id_calendrier_2 = cal.id_calendrier_2 AND cal.semestre = ue.semestre_ue
                    INNER JOIN "Etudiant" e ON note.num_matricule = e.num_matricule
                    INNER JOIN "Utilisateur" u ON e.id_utilisateur = u.id_utilisateur
                    INNER JOIN "Information" info ON note.num_matricule = info.num_matricule
                    INNER JOIN "Niveau" niv ON info.id_niveau = niv.id_niveau AND info.annee_universitaire_5 = cal.annee_universitaire_2
                    INNER JOIN "Composer_3" comp_3 ON niv.id_niveau = comp_3.id_niveau
                    INNER JOIN "Parcours" par ON comp_3.id_parcours = par.id_parcours
                    INNER JOIN "Composer_2" comp_2 ON comp_2.id_parcours = par.id_parcours AND comp_2.id_ue = ue.id_ue
                    WHERE c.id_ue = ue.id_ue AND note.num_matricule = n.num_matricule
                )
            )
            ORDER BY ue.id_ue ASC
        ) AS unite_enseignements
    FROM
        "Noter_1" n
    INNER JOIN
        "Composer_1" c ON n.code_matiere = c.code_matiere
    INNER JOIN
        "Unite_Enseignement" ue ON c.id_ue = ue.id_ue
    INNER JOIN
        "Calendrier_2" cal ON n.id_calendrier_2 = cal.id_calendrier_2 AND cal.semestre = ue.semestre_ue
    INNER JOIN
        "Matiere" m ON n.code_matiere = m.code_matiere
    INNER JOIN
        "Etudiant" e ON n.num_matricule = e.num_matricule
    INNER JOIN
        "Utilisateur" u ON e.id_utilisateur = u.id_utilisateur
    INNER JOIN
        "Information" info ON n.num_matricule = info.num_matricule
    INNER JOIN
        "Niveau" niv ON info.id_niveau = niv.id_niveau AND info.annee_universitaire_5 = cal.annee_universitaire_2
    INNER JOIN
        "Composer_3" comp_3 ON niv.id_niveau = comp_3.id_niveau
    INNER JOIN
        "Parcours" par ON comp_3.id_parcours = par.id_parcours
    INNER JOIN 
        "Composer_2" comp_2 ON comp_2.id_parcours = par.id_parcours AND comp_2.id_ue = ue.id_ue
    WHERE cal.id_calendrier_2 = $1 AND info.groupe = $2
    GROUP BY
        u.nom,
        u.prenoms,
        n.num_matricule,
        cal.id_calendrier_2,
        cal.semestre,
        cal.session,
        cal.annee_universitaire_2,
        niv.id_niveau,
        niv.designation_niveau,
        par.id_parcours,
        par.designation_parcours,
        info.groupe;
  `,
    id_calendrier_2,
    groupe
  );

  const result: any = allNotes.map((releve_note: any) => {
    let moy_ue = 0;
    let somme_coeff_ue = 0;
    let matiere_rattr: string[] = [];
    let somme_coeff = 0;
    let somme_note_ponderee = 0;
    let somme_heure_ue = 0;
    return {
      ...releve_note,
      unite_enseignements: releve_note.unite_enseignements
        .filter((ue: any, index: number, self: any[]) => {
          // Vérifier si l'élément actuel a déjà été ajouté à la liste des résultats
          const isDuplicate =
            self.findIndex((item: any) => item.id_ue === ue.id_ue) !== index;
          // Retourner true si l'élément est unique, false sinon
          return !isDuplicate;
        })
        .map((ue: any) => {
          somme_coeff_ue = 0;
          moy_ue = 0;
          somme_heure_ue = 0;
          somme_coeff += parseFloat(ue.credit);
          ue.matieres.map((matiere: any) => {
            somme_note_ponderee +=
              Number(matiere.coeff) * Number(matiere.note_matiere);
            somme_coeff_ue += Number(matiere.coeff);
            moy_ue += Number(matiere.coeff) * Number(matiere.note_matiere);
            if (Number(matiere.note_matiere) < 10)
              matiere_rattr.push(matiere.code_matiere);
            somme_heure_ue += parseInt(matiere.v_horaire_matiere);
          });
          return {
            id_ue: ue.id_ue,
            designation_ue: ue.designation_ue,
            credit: ue.credit,
            semestre_ue: ue.semestre_ue,
            v_horaire_ue: somme_heure_ue,
            moy_ue: (moy_ue / somme_coeff_ue).toFixed(2),
            matieres: ue.matieres.map((matiere: any) => {
              return {
                code_matiere: matiere.code_matiere,
                designation_matiere: matiere.designation_matiere,
                v_horaire_matiere: matiere.v_horaire_matiere,
                coeff: Number(matiere.coeff).toFixed(2),
                note_matiere: Number(matiere.note_matiere).toFixed(2),
              };
            }),
          };
        }),
      matiere_rattr: matiere_rattr,
      moy_semestre: somme_note_ponderee / somme_coeff,
    };
  });
  return result;
}

export async function fetchReleveNote(
  id_calendrier_2: string,
  num_matricule: string
) {
  const allNotes: any = await prisma.$queryRawUnsafe(
    `
   SELECT
        u.nom,
        u.prenoms,
        cal.id_calendrier_2,
        cal.annee_universitaire_2,
        cal.semestre,
        cal.session,
        n.num_matricule,
        niv.id_niveau,
        niv.designation_niveau,
        par.id_parcours,
        par.designation_parcours,
        info.groupe,
        JSON_AGG(
          JSON_BUILD_OBJECT(
                'id_ue', ue.id_ue,
                'designation_ue', ue.designation_ue,
                'credit', ue.credit,
                'semestre_ue', ue.semestre_ue,
                'matieres', (
                    SELECT JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'code_matiere', note.code_matiere,
                            'designation_matiere', m.designation_matiere,
                            'v_horaire_matiere', m.v_horaire_matiere,
                            'coeff', m.coeff,
                            'note_matiere', note.note_matiere
                        )
                        ORDER BY note.code_matiere ASC
                    )
                    FROM "Noter_1" note
                    INNER JOIN "Composer_1" c ON note.code_matiere = c.code_matiere
                    INNER JOIN "Matiere" m ON note.code_matiere = m.code_matiere AND c.code_matiere = m.code_matiere
                    INNER JOIN "Calendrier_2" cal ON note.id_calendrier_2 = cal.id_calendrier_2 AND cal.semestre = ue.semestre_ue AND cal.annee_universitaire_2 = c.annee_universitaire_1
                    INNER JOIN "Etudiant" e ON note.num_matricule = e.num_matricule
                    INNER JOIN "Utilisateur" u ON e.id_utilisateur = u.id_utilisateur
                    INNER JOIN "Information" info ON note.num_matricule = info.num_matricule
                    INNER JOIN "Niveau" niv ON info.id_niveau = niv.id_niveau AND info.annee_universitaire_5 = cal.annee_universitaire_2
                    INNER JOIN "Composer_3" comp_3 ON niv.id_niveau = comp_3.id_niveau
                    INNER JOIN "Parcours" par ON comp_3.id_parcours = par.id_parcours
                    INNER JOIN "Composer_2" comp_2 ON comp_2.id_parcours = par.id_parcours AND comp_2.id_ue = ue.id_ue
                    WHERE c.id_ue = ue.id_ue AND note.num_matricule = n.num_matricule
                )
            )
            ORDER BY ue.id_ue
        ) AS unite_enseignements
    FROM
        "Noter_1" n
    INNER JOIN
        "Composer_1" c ON n.code_matiere = c.code_matiere
    INNER JOIN
        "Unite_Enseignement" ue ON c.id_ue = ue.id_ue
    INNER JOIN
        "Calendrier_2" cal ON n.id_calendrier_2 = cal.id_calendrier_2 AND cal.semestre = ue.semestre_ue AND cal.annee_universitaire_2 = c.annee_universitaire_1
    INNER JOIN
        "Matiere" m ON n.code_matiere = m.code_matiere
    INNER JOIN
        "Etudiant" e ON n.num_matricule = e.num_matricule
    INNER JOIN
        "Utilisateur" u ON e.id_utilisateur = u.id_utilisateur
    INNER JOIN
        "Information" info ON n.num_matricule = info.num_matricule
    INNER JOIN
        "Niveau" niv ON info.id_niveau = niv.id_niveau AND info.annee_universitaire_5 = cal.annee_universitaire_2
    INNER JOIN
        "Composer_3" comp_3 ON niv.id_niveau = comp_3.id_niveau
    INNER JOIN
        "Parcours" par ON comp_3.id_parcours = par.id_parcours
    INNER JOIN 
        "Composer_2" comp_2 ON comp_2.id_parcours = par.id_parcours AND comp_2.id_ue = ue.id_ue
    WHERE cal.id_calendrier_2 = $1 AND n.num_matricule = $2
    GROUP BY
        u.nom,
        u.prenoms,
        n.num_matricule,
        cal.id_calendrier_2,
        cal.semestre,
        cal.session,
        cal.annee_universitaire_2,
        niv.id_niveau,
        niv.designation_niveau,
        par.id_parcours,
        par.designation_parcours,
        info.groupe;
  `,
    id_calendrier_2,
    num_matricule
  );

  const result: Releve_note[] = allNotes.map((releve_note: any) => {
    let moy_ue = 0;
    let somme_coeff_ue = 0;
    let matiere_rattr: string[] = [];
    let somme_coeff = 0;
    let somme_note_ponderee = 0;
    let somme_heure_ue = 0;
    return {
      ...releve_note,
      unite_enseignements: releve_note.unite_enseignements
        .filter((ue: any, index: number, self: any[]) => {
          // Vérifier si l'élément actuel a déjà été ajouté à la liste des résultats
          const isDuplicate =
            self.findIndex((item: any) => item.id_ue === ue.id_ue) !== index;
          // Retourner true si l'élément est unique, false sinon
          return !isDuplicate;
        })
        .map((ue: any) => {
          somme_coeff_ue = 0;
          moy_ue = 0;
          somme_heure_ue = 0;
          somme_coeff += parseFloat(ue.credit);
          ue.matieres.map((matiere: any) => {
            somme_note_ponderee +=
              Number(matiere.coeff) * Number(matiere.note_matiere);
            somme_coeff_ue += Number(matiere.coeff);
            moy_ue += Number(matiere.coeff) * Number(matiere.note_matiere);
            if (Number(matiere.note_matiere) < 10)
              matiere_rattr.push(matiere.code_matiere);
            somme_heure_ue += parseInt(matiere.v_horaire_matiere);
          });
          return {
            id_ue: ue.id_ue,
            designation_ue: ue.designation_ue,
            credit: ue.credit,
            semestre_ue: ue.semestre_ue,
            v_horaire_ue: somme_heure_ue,
            moy_ue: (moy_ue / somme_coeff_ue).toFixed(2),
            matieres: ue.matieres.map((matiere: any) => {
              return {
                code_matiere: matiere.code_matiere,
                designation_matiere: matiere.designation_matiere,
                v_horaire_matiere: matiere.v_horaire_matiere,
                coeff: Number(matiere.coeff).toFixed(2),
                note_matiere: Number(matiere.note_matiere).toFixed(2),
              };
            }),
          };
        }),
      somme_coeff: somme_coeff,
      moy_semestre: (somme_note_ponderee / somme_coeff).toFixed(2),
    };
  });
  return result[0];
}

export async function fetchAllNoteByStudent(num_matricule: string) {
  const allNotes: any = await prisma.$queryRawUnsafe(
    `
   SELECT
        u.nom,
        u.prenoms,
        cal.id_calendrier_2,
        cal.annee_universitaire_2,
        cal.semestre,
        n.num_matricule,
        niv.id_niveau,
        niv.designation_niveau,
        par.id_parcours,
        par.designation_parcours,
        info.groupe,
        JSON_AGG(
          JSON_BUILD_OBJECT(
                'id_ue', ue.id_ue,
                'designation_ue', ue.designation_ue,
                'credit', ue.credit,
                'semestre_ue', ue.semestre_ue,
                'matieres', (
                    SELECT JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'code_matiere', note.code_matiere,
                            'designation_matiere', m.designation_matiere,
                            'v_horaire_matiere', m.v_horaire_matiere,
                            'coeff', m.coeff,
                            'note_matiere', note.note_matiere
                        )
                        ORDER BY note.code_matiere ASC
                    )
                    FROM "Noter_1" note
                    INNER JOIN "Composer_1" c ON note.code_matiere = c.code_matiere
                    INNER JOIN "Matiere" m ON note.code_matiere = m.code_matiere AND c.code_matiere = m.code_matiere
                    INNER JOIN "Calendrier_2" cal ON note.id_calendrier_2 = cal.id_calendrier_2 AND cal.semestre = ue.semestre_ue AND cal.annee_universitaire_2 = c.annee_universitaire_1
                    INNER JOIN "Etudiant" e ON note.num_matricule = e.num_matricule
                    INNER JOIN "Utilisateur" u ON e.id_utilisateur = u.id_utilisateur
                    INNER JOIN "Information" info ON note.num_matricule = info.num_matricule
                    INNER JOIN "Niveau" niv ON info.id_niveau = niv.id_niveau AND info.annee_universitaire_5 = cal.annee_universitaire_2
                    INNER JOIN "Composer_3" comp_3 ON niv.id_niveau = comp_3.id_niveau
                    INNER JOIN "Parcours" par ON comp_3.id_parcours = par.id_parcours
                    INNER JOIN "Composer_2" comp_2 ON comp_2.id_parcours = par.id_parcours AND comp_2.id_ue = ue.id_ue
                    WHERE c.id_ue = ue.id_ue AND note.num_matricule = n.num_matricule
                )
            )
            ORDER BY ue.id_ue
        ) AS unite_enseignements
    FROM
        "Noter_1" n
    INNER JOIN
        "Composer_1" c ON n.code_matiere = c.code_matiere
    INNER JOIN
        "Unite_Enseignement" ue ON c.id_ue = ue.id_ue
    INNER JOIN
        "Calendrier_2" cal ON n.id_calendrier_2 = cal.id_calendrier_2 AND cal.semestre = ue.semestre_ue AND cal.annee_universitaire_2 = c.annee_universitaire_1
    INNER JOIN
        "Matiere" m ON n.code_matiere = m.code_matiere
    INNER JOIN
        "Etudiant" e ON n.num_matricule = e.num_matricule
    INNER JOIN
        "Utilisateur" u ON e.id_utilisateur = u.id_utilisateur
    INNER JOIN
        "Information" info ON n.num_matricule = info.num_matricule
    INNER JOIN
        "Niveau" niv ON info.id_niveau = niv.id_niveau AND info.annee_universitaire_5 = cal.annee_universitaire_2
    INNER JOIN
        "Composer_3" comp_3 ON niv.id_niveau = comp_3.id_niveau
    INNER JOIN
        "Parcours" par ON comp_3.id_parcours = par.id_parcours
    INNER JOIN 
        "Composer_2" comp_2 ON comp_2.id_parcours = par.id_parcours AND comp_2.id_ue = ue.id_ue
    WHERE n.num_matricule = $1
    GROUP BY
        u.nom,
        u.prenoms,
        n.num_matricule,
        cal.id_calendrier_2,
        cal.semestre,
        cal.session,
        cal.annee_universitaire_2,
        niv.id_niveau,
        niv.designation_niveau,
        par.id_parcours,
        par.designation_parcours,
        info.groupe;
  `,
    num_matricule
  );

  const result: any = allNotes.map((releve_note: any) => {
    let moy_ue = 0;
    let somme_coeff_ue = 0;
    let matiere_rattr: string[] = [];
    let somme_coeff = 0;
    let somme_note_ponderee = 0;
    let somme_heure_ue = 0;
    return {
      ...releve_note,
      unite_enseignements: releve_note.unite_enseignements
        .filter((ue: any, index: number, self: any[]) => {
          // Vérifier si l'élément actuel a déjà été ajouté à la liste des résultats
          const isDuplicate =
            self.findIndex((item: any) => item.id_ue === ue.id_ue) !== index;
          // Retourner true si l'élément est unique, false sinon
          return !isDuplicate;
        })
        .map((ue: any) => {
          somme_coeff_ue = 0;
          moy_ue = 0;
          somme_heure_ue = 0;
          somme_coeff += parseFloat(ue.credit);
          ue.matieres.map((matiere: any) => {
            somme_note_ponderee +=
              Number(matiere.coeff) * Number(matiere.note_matiere);
            somme_coeff_ue += Number(matiere.coeff);
            moy_ue += Number(matiere.coeff) * Number(matiere.note_matiere);
            if (Number(matiere.note_matiere) < 10)
              matiere_rattr.push(matiere.code_matiere);
            somme_heure_ue += parseInt(matiere.v_horaire_matiere);
          });
          return {
            id_ue: ue.id_ue,
            designation_ue: ue.designation_ue,
            credit: ue.credit,
            semestre_ue: ue.semestre_ue,
            v_horaire_ue: somme_heure_ue,
            moy_ue: (moy_ue / somme_coeff_ue).toFixed(2),
            matieres: ue.matieres.map((matiere: any) => {
              return {
                code_matiere: matiere.code_matiere,
                designation_matiere: matiere.designation_matiere,
                v_horaire_matiere: matiere.v_horaire_matiere,
                coeff: Number(matiere.coeff).toFixed(2),
                note_matiere: Number(matiere.note_matiere).toFixed(2),
              };
            }),
          };
        }),
    };
  });
  return result;
}
