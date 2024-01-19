"use client";
import Demande_absence from "@/models/demande_absence/Demande_absence";
import { showSwal } from "@/utils/swal";
import Demande_absence_List from "@/views/demande_absence/Demande_absence_List";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function Demande_absencePage() {
  const [demande_absences, setDemande_absences] = useState<
    Array<Demande_absence>
  >([]);
  const fetchDemande_absences = async () => {
    try {
      const response = await fetch("/api/demande_absence");
      const data = await response.json();
      setDemande_absences(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDemande_absences();
  }, []);

  const handleDelete = async (id_demande_absence: string) => {
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
          `/api/demande_absence/delete/${id_demande_absence}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          showSwal(
            "Supprimé!",
            "La demande d'absence a été supprimée.",
            "success"
          );
          fetchDemande_absences();
        } else {
          showSwal("Annulé", "Echec de la suppression!", "error");
          console.error(response);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Demande_absence_List
      demande_absences={demande_absences}
      handleDelete={handleDelete}
    />
  );
}

export default Demande_absencePage;
