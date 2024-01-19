"use client";
import React, { useEffect, useState } from "react";
import UEMatiere from "@/views/unite_enseignement/UEMatiere";
import Annee_UE_Matiere from "@/models/enseignement/Annee_UE_Matiere";
import Composer_1 from "@/models/composition/Composer_1";

export default function UniteEnseignement_Matiere() {
  const [annee_ue_matiere, setAnnee_ue_matiere] = useState<Annee_UE_Matiere[]>(
    []
  );
  const fetchAnnee_Ue_matiere = async () => {
    try {
      const response = await fetch(
        "/api/enseignement/unite_enseignement/ue-matiere"
      );
      const data = await response.json();
      setAnnee_ue_matiere(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAnnee_Ue_matiere();
  }, []);

  const [search_value, setSearch_value] = useState("");
  const fetchRecherche_ue = async () => {
    try {
      const response = await fetch(
        "/api/recherche/enseignement/unite_enseignement/ue-matiere",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(search_value),
        }
      );
      const data = await response.json();
      setAnnee_ue_matiere(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecherche_ue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch_value(event.target.value);
    if (event.target.value === "") fetchAnnee_Ue_matiere();
  };

  const handleRecherche = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchRecherche_ue();
  };

  const [filter, setFilter] = useState("");
  const [recuperationAU, setRecuperationAU] = useState<Composer_1[]>([]);
  const fetchRecuperationAU = async () => {
    try {
      const response = await fetch("/api/filtrage/ue-matiere/recuperation");
      const data = await response.json();
      setRecuperationAU(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecuperationAU();
  });

  const fetchFiltrageUe_matiere = async () => {
    try {
      const response = await fetch("/api/filtrage/ue-matiere", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filter),
      });
      const data = await response.json();
      setAnnee_ue_matiere(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleFilter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchFiltrageUe_matiere();
  };

  return (
    <UEMatiere
      annee_ue_matiere={annee_ue_matiere}
      handleRecherche_ue={handleRecherche_ue}
      handleRecherche={handleRecherche}
      recuperationAU={recuperationAU}
      onChangeFilter={onChangeFilter}
      handleFilter={handleFilter}
      listAll={fetchAnnee_Ue_matiere}
    />
  );
}
