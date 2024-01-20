"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UtilisateurForm from "@/views/utilisateur/UtilisateurForm";
import { uploadImg } from "@/utils/uploadImg";
import RenderedUtilisateurSpecifique from "@/components/utilisateur/ajoutUtilisateur/renderedUtilisateurSpecifique";
import { SubmitHandler, useForm } from "react-hook-form";
import Utilisateur from "@/models/utilisateur/Utilisateur";
import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { showSwal } from "@/utils/swal";

function Inscription() {
  // Fonction pour naviguer
  const router = useRouter();

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

  // Téléversement du fichier image
  const [file, setFile] = useState<File>();
  const { register, watch, setValue, handleSubmit, formState, trigger } =
    utilisateur_form;

  const { errors } = formState;
  const trigger_utilisateur_form = trigger;

  useEffect(() => {
    if (!file) setValue("photo_profil", "user.png");
    else setValue("photo_profil", file.name);
  }, [file, setValue]);

  // Tout ce qui concerne l'utilisateur
  const handleUtilisateur: SubmitHandler<Utilisateur> = async (utilisateur) => {
    try {
      const response = await fetch("/api/utilisateur/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(utilisateur),
      });
      if (response.ok) {
        console.log("Utilisateur créé avec succès");
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
              body: photo_profil,
            }
          );
          if (response.ok) console.log("Image uploader avec succès");
        }
      } else console.error(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-child-container">
      <div className="flex flex-col gap-4  items-center  custom-lg:items-start w-full">
        <h1 className="h1 flex flex-row justify-center gap-2">
          <IonIcon
            icon={add}
            className="-text--text-blue-color  ion-icon-title"
          ></IonIcon>
          Formulaire d'inscription
        </h1>
        <div className="flex flex-col justify-center items-center w-full gap-16 custom-lg:items-start custom-xl:flex-row custom-xl:justify-start">
          <UtilisateurForm
            isUpdate={false}
            register={register}
            file={file}
            setFile={setFile}
            errors={errors}
          />

          <RenderedUtilisateurSpecifique
            handleUtilisateur={handleSubmit(handleUtilisateur)}
            id_utilisateur={watch("id_utilisateur")}
            router={router}
            trigger_utilisateur_form={trigger_utilisateur_form}
          />
        </div>
      </div>
    </div>
  );
}

export default Inscription;
