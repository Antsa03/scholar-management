"use client";
import Composer_3 from "@/models/composition/Composer_3";
import { showSwal } from "@/utils/swal";
import Composition3_List from "@/views/composition/composition_3/Composition3_List";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function Composition3() {
  const [composer_3, setComposer_3] = useState<Array<Composer_3>>([]);
  const fetchComposer3 = async () => {
    try {
      const response = await fetch("/api/composition/composition3");
      const data = await response.json();
      setComposer_3(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComposer3();
  }, []);

  const handleDelete = async (id_composer_3: string) => {
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
          `/api/composition/composition3/delete/${id_composer_3}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          showSwal("Supprimé!", "La composition 3 a été supprimée.", "success");
          fetchComposer3();
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
    <Composition3_List composer_3={composer_3} handleDelete={handleDelete} />
  );
}

export default Composition3;
