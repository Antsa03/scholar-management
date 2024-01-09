import { useEffect } from "react";
import deleteUser from "@/utils/deleteUser";
import EtudiantForm from "@/views/utilisateur/etudiant/EtudiantForm";
import { SubmitHandler, UseFormTrigger, useForm } from "react-hook-form";
import Etudiant from "@/models/utilisateur/Etudiant";
import { Utilisateur } from "@prisma/client";
import { showSwal, showToast } from "@/utils/swal";

interface EtudiantFormulaireProps {
  handleUtilisateur: Function;
  id_utilisateur: string;
  router: any;
  trigger_utilisateur_form: UseFormTrigger<Utilisateur>;
}

function EtudiantFormulaire({
  handleUtilisateur,
  id_utilisateur,
  router,
  trigger_utilisateur_form,
}: EtudiantFormulaireProps) {
  //Tout ce qui concerne l'étudiant
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Etudiant>({
    defaultValues: {
      num_matricule: "",
      date_naissance: "",
      lieu_naissance: "",
      nationalite: "",
      civilite: "",
      id_utilisateur: "",
    },
  });

  useEffect(() => {
    setValue("id_utilisateur", id_utilisateur);
  }, [id_utilisateur, setValue]);

  const handleEtudiant: SubmitHandler<Etudiant> = async (etudiant) => {
    try {
      await handleUtilisateur();
      const response = await fetch("/api/utilisateur/etudiant/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(etudiant),
      });
      if (response.ok) {
        //show dialogue alerte
        showToast(
          "Utilisateur de type étudiant crée avec succès",
          "",
          "success"
        );

        router.push("/utilisateur/etudiant");
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
    <EtudiantForm
      isUpdate={false}
      register={register}
      handleSubmit={handleSubmit(handleEtudiant)}
      errors={errors}
      trigger_utilisateur_form={trigger_utilisateur_form}
    />
  );
}

export default EtudiantFormulaire;
