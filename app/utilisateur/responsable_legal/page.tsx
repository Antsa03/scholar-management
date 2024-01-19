"use client";
import Responsable_legal from "@/models/utilisateur/listage/Responsable_legal";
import { useEffect, useState } from "react";
import ResponsableLegalList from "@/views/utilisateur/responsable_legal/ResponsableLegalList";
import Swal from "sweetalert2";

function ResponsableLegal() {
  const [responsable_legals, setResponsableLegal] = useState<
    Array<Responsable_legal>
  >([]);

  const fetchResponsableLegal = async () => {
    try {
      const response = await fetch("/api/utilisateur/responsable_legal");
      const data = await response.json();
      setResponsableLegal(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchResponsableLegal();
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
          Swal.fire(
            "Supprimé!",
            "Le responsable légale a été supprimé.",
            "success"
          );
          fetchResponsableLegal();
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
  const fetchRecherche_responsable_legal = async () => {
    try {
      const response = await fetch(
        "/api/recherche/utilisateur/responsable_legal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(search_value),
        }
      );
      const data = await response.json();
      setResponsableLegal(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecherche_responsable_legal = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch_value(event.target.value);
    if (event.target.value === "") fetchResponsableLegal();
  };

  const handleRecherche = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchRecherche_responsable_legal();
  };

  return (
    <ResponsableLegalList
      responsable_legals={responsable_legals}
      handleDelete={handleDelete}
      handleRecherche_responsable_legal={handleRecherche_responsable_legal}
      handleRecherche={handleRecherche}
    />
  );
}

export default ResponsableLegal;
