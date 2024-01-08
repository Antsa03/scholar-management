"use client";
import Composer_2 from "@/models/composition/Composer_2";
import { showSwal } from "@/utils/swal";
import Composition2_List from "@/views/composition/composition_2/Composition2_List";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function Composition2() {
  const [composer_2, setComposer2] = useState<Array<Composer_2>>([]);
  const fetchComposer2 = async () => {
    try {
      const response = await fetch("/api/composition/composition2");
      const data = await response.json();
      setComposer2(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComposer2();
  }, []);

  const handleDelete = async (id_composer_2: string) => {
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
          `/api/composition/composition2/delete/${id_composer_2}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          showSwal("Supprimé!", "La composition 2 a été supprimée.", "success");
          fetchComposer2();
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
    <Composition2_List composer_2={composer_2} handleDelete={handleDelete} />
  );
}

export default Composition2;
