import { useEffect, useState } from "react";
import ResponsableLegalForm from "@/views/utilisateur/responsable_legal/ResponsableLegalForm";
import deleteUser from "@/utils/deleteUser";
import { SubmitHandler, UseFormTrigger, useForm } from "react-hook-form";
import Responsable_legal from "@/models/utilisateur/Responsable_legal";
import Utilisateur from "@/models/utilisateur/Utilisateur";
import Swal from "sweetalert2";
import { showSwal, showToast } from "@/utils/swal";

interface ResponsableLegalFormulaireProps {
  handleUtilisateur: Function;
  id_utilisateur: string;
  router: any;
  trigger_utilisateur_form: UseFormTrigger<Utilisateur>;
}

function ResponsableLegalFormulaire({
  handleUtilisateur,
  id_utilisateur,
  router,
  trigger_utilisateur_form,
}: ResponsableLegalFormulaireProps) {
  //Tout ce qui concerne le responsable légal
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Responsable_legal>({
    defaultValues: {
      id_responsable_legal: "",
      profession: "",
      id_utilisateur: "",
    },
  });

  useEffect(() => {
    setValue("id_utilisateur", id_utilisateur);
  }, [id_utilisateur, setValue]);

  const handleResponsableLegal: SubmitHandler<Responsable_legal> = async (
    responsable_legal
  ) => {
    try {
      await handleUtilisateur();
      const response = await fetch(
        "/api/utilisateur/responsable_legal/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responsable_legal),
        }
      );
      if (response.ok) {
        //show dialogue alerte
        showToast(
          "Utilisateur de type responsable légale crée avec succès",
          "",
          "success"
        );

        router.push("/utilisateur/responsable_legal");
      } else {
        await deleteUser(id_utilisateur);
        showSwal(
          "Erreur",
          "Echec de l'ajout de l'administrateur, veuillez vérifier les champs!",
          "error"
        );

        console.error(response);
      }
    } catch (error) {
      await deleteUser(id_utilisateur);
      showSwal(
        "Erreur",
        "Echec de l'ajout de l'administrateur, veuillez vérifier les champs!",
        "error"
      );
      console.error(error);
    }
  };

  return (
    <ResponsableLegalForm
      isUpdate={false}
      register={register}
      handleSubmit={handleSubmit(handleResponsableLegal)}
      errors={errors}
      trigger_utilisateur_form={trigger_utilisateur_form}
    />
  );
}

export default ResponsableLegalFormulaire;
