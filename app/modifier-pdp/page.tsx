"use client";
import { uploadImg } from "@/utils/uploadImg";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEventHandler, useState } from "react";
import { IonIcon } from "@ionic/react";
import { cameraOutline, cloudUpload } from "ionicons/icons";
import { showSwal } from "@/utils/swal";

function UpdateProfilePicture() {
  const router = useRouter();
  const { data: session, status }: any = useSession();
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);
  if (status === "loading") return <h1>Chargement ...</h1>;

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const file = formData.get("file") as File;
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
    if (url) {
      let splitUrl = url.split(
        "https://1s8t6r0ul8oomt8j.public.blob.vercel-storage.com/"
      );
      let photo_profil: string = splitUrl[1];
      const id_utilisateur = session.user.sub as string;
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
      if (response.ok) {
        showSwal("Pour information", "Image modifié avec succès", "success");
        const userRole = session.user?.role as string;
        switch (userRole) {
          case "Administrateur":
            return router.push("/accueil");
          case "Etudiant":
            return router.push("/etudiant/accueil");
          default:
            break;
        }
      }
    }
  };

  return (
    <section className="section-container">
      <main className="main-container">
        <div className="flex m-auto w-[350px] h-[350px] border-[1px] text-center rounded-[5px] items-center justify-center bg-slate-100 border-slate-100">
          <form onSubmit={handleSubmit}>
            <div className="upload">
              {selectedImage ? (
                <img
                  src={selectedImage.toString()}
                  alt="Selected"
                  className=" -border--border-third-color border-2 rounded-full"
                  width={90}
                  height={90}
                />
              ) : (
                <img
                  src={`https://1s8t6r0ul8oomt8j.public.blob.vercel-storage.com/${session?.user.image}`}
                  alt="Image de profil"
                  className=" -border--border-third-color border-2 rounded-full"
                  width={100}
                  height={100}
                />
              )}
              <div className="round">
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <IonIcon
                  icon={cameraOutline}
                  className="text-white ion-icon-title w-7 h-7"
                ></IonIcon>
              </div>
            </div>
            <button type="submit" className="button-upload">
              <IonIcon
                icon={cloudUpload}
                className="text-white ion-icon-title w-7 h-7 mr-2"
              ></IonIcon>{" "}
              Modifier
            </button>
          </form>
        </div>
      </main>
    </section>
  );
}

export default UpdateProfilePicture;
