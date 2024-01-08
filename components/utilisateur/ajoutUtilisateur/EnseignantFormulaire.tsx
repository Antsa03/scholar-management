"use client";
import { useEffect } from "react";
import deleteUser from "@/utils/deleteUser";
import EnseignantForm from "@/views/utilisateur/enseignant/EnseignantForm";
import { SubmitHandler, UseFormTrigger, useForm } from "react-hook-form";
import Enseignant from "@/models/utilisateur/Enseignant";
import Utilisateur from "@/models/utilisateur/Utilisateur";
import Swal from "sweetalert2";
import { showSwal, showToast } from "@/utils/swal";

interface EnseignantFormProps {
  handleUtilisateur: Function;
  id_utilisateur: string;
  router: any;
  trigger_utilisateur_form: UseFormTrigger<Utilisateur>;
}

function EnseignantFormulaire({
  handleUtilisateur,
  id_utilisateur,
  router,
  trigger_utilisateur_form,
}: EnseignantFormProps) {
  //Tout ce qui concernant l'enseignant
  const { register, setValue, handleSubmit, formState } = useForm<Enseignant>({
    defaultValues: {
      id_enseignant: "",
      diplome: "",
      grade: "",
      specialite: "",
      date_recrutement: "",
      date_arret_ens: "",
      id_utilisateur: "",
    },
  });

  //Gérer l'erreur de la formulaire enseignant
  const { errors } = formState;

  useEffect(() => {
    setValue("id_utilisateur", id_utilisateur);
  }, [id_utilisateur, setValue]);

  const handleEnseignant: SubmitHandler<Enseignant> = async (enseignant) => {
    try {
      await handleUtilisateur();
      const response = await fetch("/api/utilisateur/enseignant/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enseignant),
      });
      if (response.ok) {
        //show dialogue alertr
        showToast(
          "Utilisateur de type enseignant crée avec succès",
          "",
          "success"
        );

        router.push("/utilisateur/enseignant");
      } else {
        await deleteUser(id_utilisateur);
        showSwal(
          "Erreur",
          "Echec de la création, veuillez vérifier les champs!",
          "error"
        );

        console.error(response);
      }
    } catch (error) {
      await deleteUser(id_utilisateur);
      showSwal(
        "Erreur",
        "Echec de la création, veuillez vérifier les champs!",
        "error"
      );
      console.error(error);
    }
  };
  return (
    <EnseignantForm
      isUpdate={false}
      register={register}
      handleSubmit={handleSubmit(handleEnseignant)}
      errors={errors}
      trigger_utilisateur_form={trigger_utilisateur_form}
    />
  );
}

export default EnseignantFormulaire;
