"use client";
import { useEffect, useState } from "react";
import Niveau from "@/models/pedagogie/Niveau";
import NiveauList from "@/views/pedagogie/niveau/NiveauList";
import ParcoursList from "@/views/pedagogie/parcours/ParcoursList";
import Parcours from "@/models/pedagogie/Parcours";
import Swal from "sweetalert2";
import { showSwal } from "@/utils/swal";

function Pedagogie() {
  // Tout ce qui concerne le niveau
  const [niveaux, setNiveaux] = useState<Array<Niveau>>([]);
  const fetchNiveaux = async () => {
    try {
      const response = await fetch("/api/pedagogie/niveau");
      const data = await response.json();
      setNiveaux(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNiveau = async (id_niveau: string) => {
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
          `/api/pedagogie/niveau/delete/${id_niveau}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          showSwal("Supprimé!", "Le niveau a été supprimé.", "success");
          fetchNiveaux();
        } else {
          showSwal("Annulé", "Echec de la suppression!", "error");
          console.error(response);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Tout ce qui concerne le parcours
  const [parcours, setParcours] = useState<Array<Parcours>>([]);
  const fetchParcours = async () => {
    try {
      const response = await fetch("/api/pedagogie/parcours");
      const data = await response.json();
      setParcours(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteParcours = async (id_parcours: string) => {
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
          `/api/pedagogie/parcours/delete/${id_parcours}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          showSwal("Supprimé!", "Le parcours a été supprimé.", "success");
          fetchParcours();
        } else {
          showSwal("Annulé", "Echec de la suppression!", "error");
          console.error(response);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNiveaux();
    fetchParcours();
  }, []);

  return (
    <div className="flex flex-row gap-2 max-w-fit">
      <NiveauList niveaux={niveaux} handleDelete={handleDeleteNiveau} />
      <ParcoursList parcours={parcours} handleDelete={handleDeleteParcours} />
    </div>
  );
}

export default Pedagogie;
