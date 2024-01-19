"use client";
import React from "react";
import Json_matiere from "@/public/json/matiere.json";
import Matiere from "@/models/enseignement/Matiere";

function Page() {
  const saveMatiere = async () => {
    Json_matiere.forEach(async (matiere) => {
      const mat: Matiere = {
        code_matiere: matiere.code_matiere,
        designation_matiere: matiere.designation_matiere,
        coeff: matiere.coeff.toString(),
        credit_matiere: matiere.coeff.toString(),
        v_horaire_matiere: matiere.v_horaire_matiere.toString(),
        description: matiere.description,
        id_enseignant: matiere.id_enseignant,
      };
      const result = await fetch("/api/enseignement/matiere/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mat),
      });
      if (result.ok) console.log("Matière crée");
      else console.log(result);
    });
  };
  return (
    <div>
      <button onClick={() => saveMatiere()}>Enregistrer matiere</button>
      <pre>{JSON.stringify(Json_matiere, null, 2)}</pre>
    </div>
  );
}

export default Page;
