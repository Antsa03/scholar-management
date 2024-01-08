"use client";
import { useEffect, useState } from "react";
import Relation from "@/models/utilisateur/listage/Relation";
import RelationList from "@/views/utilisateur/relation/RelationList";
import Swal from "sweetalert2";

function Relations() {
  const [relations, setRelations] = useState<Array<Relation>>([]);

  const fetchRelations = async () => {
    try {
      const response = await fetch("/api/utilisateur/relation");
      const data = await response.json();
      setRelations(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRelations();
  }, []);

  const handleDeleteRelation = async (id_relation: string) => {
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
          `/api/utilisateur/relation/delete/${id_relation}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          alert("Relation supprimée avec succès");
          Swal.fire("Supprimé!", "La relation a été supprimé.", "success");
          fetchRelations();
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
  const fetchRecherche_relation = async () => {
    try {
      const response = await fetch("/api/recherche/utilisateur/relation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(search_value),
      });
      const data = await response.json();
      setRelations(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecherche_relation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch_value(event.target.value);
    if (event.target.value === "") fetchRelations();
  };

  const handleRecherche = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchRecherche_relation();
  };

  return (
    <RelationList
      relations={relations}
      handleDeleteRelation={handleDeleteRelation}
      handleRecherche_relation={handleRecherche_relation}
      handleRecherche={handleRecherche}
    />
  );
}

export default Relations;
