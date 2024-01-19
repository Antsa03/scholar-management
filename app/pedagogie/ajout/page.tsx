"use client";
import { useRouter } from "next/navigation";
import NiveauForm from "@/views/pedagogie/niveau/NiveauForm";
import ParcoursForm from "@/views/pedagogie/parcours/ParcoursForm";
import { SubmitHandler, useForm } from "react-hook-form";
import Niveau from "@/models/pedagogie/Niveau";
import Parcours from "@/models/pedagogie/Parcours";
import { showSwal } from "@/utils/swal";

function PedagogieAjout() {
  const router = useRouter();

  // Tout ce qui concerne le niveau
  const niveau_form = useForm<Niveau>({
    defaultValues: {
      id_niveau: "",
      designation_niveau: "",
    },
  });

  const handleSubmitNiveau: SubmitHandler<Niveau> = async (niveau) => {
    try {
      const response = await fetch("/api/pedagogie/niveau/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(niveau),
      });
      if (response.ok) {
        showSwal("Niveau créé avec succès", "", "success");
        router.push("/pedagogie");
      }
    } catch (error) {
      console.error(error);
      showSwal(
        "Erreur",
        "Échec de la création, veuillez vérifier les champs!",
        "error"
      );
    }
  };

  // Tout ce qui concerne parcours
  const parcours_form = useForm<Parcours>({
    defaultValues: {
      id_parcours: "",
      designation_parcours: "",
    },
  });

  const handleSubmitParcours: SubmitHandler<Parcours> = async (parcours) => {
    try {
      const response = await fetch("/api/pedagogie/parcours/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parcours),
      });
      if (response.ok) {
        showSwal("Pour information", "Parcours créé avec succès", "success");
        router.push("/pedagogie");
      } else {
        showSwal("Pour information", "Echec de créaction de parcours", "error");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="ml-4 px-28 flex flex-row gap-28">
      <NiveauForm
        isUpdate={false}
        register={niveau_form.register}
        handleSubmit={niveau_form.handleSubmit(handleSubmitNiveau)}
        errors={niveau_form.formState.errors}
      />

      <ParcoursForm
        isUpdate={false}
        register={parcours_form.register}
        handleSubmit={parcours_form.handleSubmit(handleSubmitParcours)}
        errors={parcours_form.formState.errors}
      />
    </div>
  );
}

export default PedagogieAjout;
