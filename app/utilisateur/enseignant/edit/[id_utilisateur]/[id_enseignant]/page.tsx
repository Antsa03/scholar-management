"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import UtilisateurForm from "@/views/utilisateur/UtilisateurForm";
import EnseignantForm from "@/views/utilisateur/enseignant/EnseignantForm";
import { uploadImg } from "@/utils/uploadImg";
import { ChevronsRight } from "react-feather";
import { SubmitHandler, useForm } from "react-hook-form";
import Utilisateur from "@/models/utilisateur/Utilisateur";
import Enseignant from "@/models/utilisateur/Enseignant";
import { showSwal } from "@/utils/swal";

function EnseignantEdit() {
  const params = useParams();

  const router = useRouter();

  const handleNavigation = () => {
    router.push("/utilisateur/enseignant");
  };

  // Téléversement du fichier image
  const [file, setFile] = useState<File>();

  // Tout ce qui concerne l'utilisateur
  const utilisateur_form = useForm<Utilisateur>({
    defaultValues: {
      id_utilisateur: "",
      photo_profil: "",
      nom: "",
      prenoms: "",
      sexe: "",
      adresse: "",
      telephone: "",
      email: "",
      mot_de_passe: "",
    },
  });

  const fetchUtilisateur = async () => {
    try {
      const response = await fetch(
        `/api/utilisateur/${params?.id_utilisateur}`
      );
      const data = await response.json();
      utilisateur_form.reset(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUtilisateur();
  }, [params?.id_utilisateur]);

  useEffect(() => {
    if (file) utilisateur_form.setValue("photo_profil", file.name);
  }, [file, utilisateur_form.setValue]);

  const handleUtilisateur: SubmitHandler<Utilisateur> = async (utilisateur) => {
    try {
      const response = await fetch(
        `/api/utilisateur/update/${params?.id_utilisateur}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(utilisateur),
        }
      );
      if (response.ok) console.log("Utilisateur modifié avec succès");
      else console.error(response);
    } catch (error) {
      console.error(error);
    }
  };

  // Tout ce qui concerne l'enseignant
  const enseignant_form = useForm<Enseignant>({
    defaultValues: {
      id_enseignant: "",
      grade: "",
      diplome: "",
      specialite: "",
      date_recrutement: "",
      date_arret_ens: "",
      id_utilisateur: "",
    },
  });

  const fetchEnseignant = async () => {
    try {
      const response = await fetch(
        `/api/utilisateur/enseignant/${params?.id_enseignant}`
      );
      const data = await response.json();
      enseignant_form.reset(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEnseignant();
  }, [params?.id_enseignant]);

  const handleEnseignant: SubmitHandler<Enseignant> = async (enseignant) => {
    try {
      await utilisateur_form.handleSubmit(handleUtilisateur)();
      enseignant_form.setValue(
        "id_utilisateur",
        utilisateur_form.watch("id_utilisateur").toString()
      );
      const response = await fetch(
        `/api/utilisateur/enseignant/update/${params?.id_enseignant}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enseignant),
        }
      );
      if (response.ok) {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          let fileType = [
            "image/jpg",
            "image/jpeg",
            "image/png",
            "image/svg",
            "image/gif",
            "image/webp",
            "image/apng",
            "image/heic",
            "image/heic",
            "image/bmp",
            "image/tiff",
            "image/tif",
            "image/pp2",
          ];
          if (!fileType.includes(file.type)) {
            showSwal(
              "Pour information",
              "Le type de fichier n'est pas pris en charge.",
              "error"
            );
          }

          if (file.size > 4 * 1024 * 1024) {
            showSwal(
              "Pour information",
              "La taille du fichier ne doit pas dépasser 4 Mo.",
              "error"
            );
          }

          if (file.size === 0) {
            showSwal("Pour information", "Pas de fichier choisi", "error");
            return;
          }
          const url = await uploadImg(formData);
          let splitUrl = url.split(
            "https://1s8t6r0ul8oomt8j.public.blob.vercel-storage.com/"
          );
          let photo_profil = splitUrl[1];
          const id_utilisateur = utilisateur_form.watch("id_utilisateur");
          const response = await fetch(
            `/api/upload/photo_profil/${id_utilisateur}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(photo_profil),
            }
          );
          if (response.ok) console.log("Image uploader avec succès");
        }
        alert("Utilisateur de type enseignant modifié avec succès");
        handleNavigation();
      } else console.error(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main-child-container">
      <div className="flex flex-col gap-4  items-center  custom-lg:items-start w-full">
        <h1 className="h1 flex flex-row justify-center gap-2">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Modifier l'enseignant
        </h1>
        <div className="flex flex-col justify-center items-center w-full gap-16 custom-xl:items-start custom-xl:flex-row custom-xl:justify-start">
          <UtilisateurForm
            isUpdate
            register={utilisateur_form.register}
            file={file}
            setFile={setFile}
            errors={utilisateur_form.formState.errors}
          />

          <div className="w-fit self-center">
            <EnseignantForm
              isUpdate
              register={enseignant_form.register}
              handleSubmit={enseignant_form.handleSubmit(handleEnseignant)}
              errors={enseignant_form.formState.errors}
              trigger_utilisateur_form={utilisateur_form.trigger}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnseignantEdit;
