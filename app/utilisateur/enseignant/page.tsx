"use client";
import { useState, useEffect } from "react";
import Enseignant from "@/models/utilisateur/listage/Enseignant";
import EnseignantList from "@/views/utilisateur/enseignant/EnseignantList";
import Swal from "sweetalert2";

function EnseignantListage() {
  const [enseignants, setEnseignants] = useState<Array<Enseignant>>([]);

  const fetchEnseignants = async () => {
    try {
      const response = await fetch("/api/utilisateur/enseignant");
      const data = await response.json();
      setEnseignants(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEnseignants();
  }, []);

  const handleDelete = async (id_utilisateur: string) => {
    try {
      const result = await Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Vous ne pourrez pas revenir en arrière!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, supprimez-le!",
        cancelButtonText: "Non, annulez!",
        // customClass: "custom-alert",
      });

      if (result.isConfirmed) {
        const response = await fetch(
          `/api/utilisateur/delete/${id_utilisateur}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          Swal.fire("Supprimé!", "L'enseignant a été supprimé.", "success");
          fetchEnseignants();
        } else {
          Swal.fire("Annulé", "Echec de la suppression!", "error");
          console.error(response);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [search_value, setSearch_value] = useState("");
  const fetchRecherche_enseignant = async () => {
    try {
      const response = await fetch("/api/recherche/utilisateur/enseignant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(search_value),
      });
      const data = await response.json();
      setEnseignants(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecherche_enseignant = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch_value(event.target.value);
    if (event.target.value === "") fetchEnseignants();
  };

  const handleRecherche = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchRecherche_enseignant();
  };

  return (
    <EnseignantList
      enseignants={enseignants}
      handleDelete={handleDelete}
      handleRecherche_enseignant={handleRecherche_enseignant}
      handleRecherche={handleRecherche}
    />
  );
}

export default EnseignantListage;
