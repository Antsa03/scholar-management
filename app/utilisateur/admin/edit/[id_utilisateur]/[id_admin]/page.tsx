"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import UtilisateurForm from "@/views/utilisateur/UtilisateurForm";
import AdminForm from "@/views/utilisateur/admin/AdminForm";
import { uploadImg } from "@/utils/uploadImg";
import { ChevronsRight } from "react-feather";
import { SubmitHandler, useForm } from "react-hook-form";
import Utilisateur from "@/models/utilisateur/Utilisateur";
import Admin from "@/models/utilisateur/Admin";
import { showSwal, showSwalWithoutConfirm } from "@/utils/swal";

function AdminEdit() {
  const params = useParams();
  const router = useRouter();
  const handleNavigation = () => {
    router.push("/utilisateur/admin");
  };

  // Téléversement du fichier
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
      if (response.ok) console.log("Utilisateur créé avec succès");
      else console.error(response);
    } catch (error) {
      console.error(error);
    }
  };

  // Tout ce qui concerne l'admin
  const admin_form = useForm<Admin>({
    defaultValues: {
      id_admin: "",
      fonction: "",
      id_utilisateur: "",
    },
  });

  const fetchAdmin = async () => {
    try {
      const response = await fetch(
        `/api/utilisateur/admin/${params?.id_admin}`
      );
      const data = await response.json();
      admin_form.reset(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, [params?.id_admin]);

  const handleAdmin: SubmitHandler<Admin> = async (admin) => {
    try {
      await utilisateur_form.handleSubmit(handleUtilisateur)();

      // Vérifier si utilisateur_form est valide
      if (!utilisateur_form.formState.isValid) {
        return;
      }

      admin_form.setValue(
        "id_utilisateur",
        utilisateur_form.watch("id_utilisateur").toString()
      );
      const response = await fetch(
        `/api/utilisateur/admin/update/${params?.id_admin}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(admin),
        }
      );
      if (response.ok) {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
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
        showSwalWithoutConfirm(
          "Modifié",
          "L'administrateur a été modifié.",
          "success"
        );
        handleNavigation();
      } else {
        showSwal("Annulé", "Echec de la modification!", "error");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main-child-container">
      <div className="flex flex-col gap-4  items-center  custom-lg:items-start w-full">
        <h1 className="h1 flex flex-row justify-center gap-2">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Modifier l'administrateur
        </h1>
        <div className="flex flex-col justify-center items-center w-full gap-16 custom-xl:items-start custom-xl:flex-row custom-xl:justify-start">
          <UtilisateurForm
            isUpdate
            file={file}
            register={utilisateur_form.register}
            setFile={setFile}
            errors={utilisateur_form.formState.errors}
          />

          <div className="w-fit self-center">
            <AdminForm
              isUpdate
              register={admin_form.register}
              handleSubmit={admin_form.handleSubmit(handleAdmin)}
              errors={admin_form.formState.errors}
              trigger_utilisateur_form={utilisateur_form.trigger}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminEdit;
