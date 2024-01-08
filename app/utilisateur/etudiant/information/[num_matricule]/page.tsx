"use client";
import Information from "@/models/information/listage/Information";
import InformationList from "@/views/information/InformationList";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function InformationPage() {
  const router = useRouter();
  const params = useParams();
  const [information, setInformation] = useState<Array<Information>>([]);
  const fetchInformation = async () => {
    try {
      const response = await fetch(
        `/api/information/etudiant/${params?.num_matricule}`
      );
      const data = await response.json();
      setInformation(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInformation();
  }, [params?.num_matricule]);

  const handleDelete = async (id_obs: string) => {
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
          `/api/information/observation/delete/${id_obs}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          Swal.fire("Supprimé!", "L'information a été supprimée.", "success");
          router.push("/utilisateur/etudiant");
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
    <InformationList information={information} handleDelete={handleDelete} />
  );
}

export default InformationPage;
