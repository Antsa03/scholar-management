"use client";
import { useState, useEffect } from "react";
import EtudiantList from "@/views/utilisateur/etudiant/EtudiantList";
import Etudiant from "@/models/utilisateur/listage/Etudiant";
import Swal from "sweetalert2";

function EtudiantPage() {
  const [etudiants, setEtudiants] = useState<Array<Etudiant>>([]);

  const fetchEtudiants = async () => {
    try {
      const response = await fetch("/api/utilisateur/etudiant");
      const data = await response.json();
      setEtudiants(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEtudiants();
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
          Swal.fire("Supprimé!", "L'étudiant a été supprimé.", "success");
          fetchEtudiants();
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
  const fetchRecherche_etudiant = async () => {
    try {
      const response = await fetch("/api/recherche/utilisateur/etudiant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(search_value),
      });
      const data = await response.json();
      setEtudiants(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecherche_etudiant = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch_value(event.target.value);
    if (event.target.value === "") fetchEtudiants();
  };

  const handleRecherche = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchRecherche_etudiant();
  };

  return (
    <EtudiantList
      etudiants={etudiants}
      handleDelete={handleDelete}
      handleRecherche_etudiant={handleRecherche_etudiant}
      handleRecherche={handleRecherche}
    />
  );
}

export default EtudiantPage;
