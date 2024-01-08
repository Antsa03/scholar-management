"use client";
import Composer_1 from "@/models/composition/Composer_1";
import { showSwal } from "@/utils/swal";
import Composition1_List from "@/views/composition/composition_1/Composition1_List";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function Composition1() {
  const [composer_1, setComposer_1] = useState<Array<Composer_1>>([]);
  const fetchComposer_1 = async () => {
    try {
      const response = await fetch("/api/composition/composition1");
      const data = await response.json();
      setComposer_1(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComposer_1();
  }, []);

  const handleDelete = async (id_composer_1: string) => {
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
          `/api/composition/composition1/delete/${id_composer_1}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          showSwal("Supprimé!", "La composition 1 a été supprimée.", "success");
          fetchComposer_1();
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
    <Composition1_List composer_1={composer_1} handleDelete={handleDelete} />
  );
}

export default Composition1;
