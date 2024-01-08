"use client";
import Calendrier_2 from "@/models/note_1/Calendrier_2";
import Calendrier_2_List from "@/views/note/calendrier_2/Calendrier_2_List";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function Calendrier_2List() {
  const [calendrier_2, setCalendrier_2] = useState<Array<Calendrier_2>>([]);
  const fetchCalendrier_2 = async () => {
    try {
      const response = await fetch("/api/note_1/calendrier_2");
      const data = await response.json();
      setCalendrier_2(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCalendrier_2();
  }, []);

  const handleDelete = async (id_calendrier_2: string) => {
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
          `/api/note_1/calendrier_2/delete/${id_calendrier_2}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          Swal.fire("Supprimé!", "Le calendrier_2 a été supprimé.", "success");
          fetchCalendrier_2();
        } else {
          Swal.fire("Annulé", "Echec de la suppression!", "error");
          console.error(response);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Calendrier_2_List
      calendrier_2={calendrier_2}
      handleDelete={handleDelete}
    />
  );
}

export default Calendrier_2List;
