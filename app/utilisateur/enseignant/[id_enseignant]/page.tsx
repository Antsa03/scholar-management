"use client";
import Enseignant_info from "@/models/information/Enseignant_info";
import EnseignantInfoView from "@/views/utilisateur/enseignant/EnseignantInfoView";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

function EnseignantInfo() {
  const params = useParams();
  const [enseignant_info, setEnseignant_info] = useState<Enseignant_info>();
  const fetchEnseignant_info = async () => {
    try {
      const response = await fetch(
        `/api/information/enseignant/${params?.id_enseignant}`
      );
      const data = await response.json();
      setEnseignant_info(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEnseignant_info();
  }, [params?.id_enseignant]);

  if (enseignant_info)
    return <EnseignantInfoView enseignant_info={enseignant_info} />;
  else <h1>Chargement ou aucune information à afficher</h1>;
}

export default EnseignantInfo;
