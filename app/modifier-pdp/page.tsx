"use client";
import { uploadImg } from "@/utils/uploadImg";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";

function UpdateProfilePicture() {
  const router = useRouter();
  const { data: session, status, update }: any = useSession();
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
    console.log({ file });
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
        alert("Image uploader avec succès");
        await update({ photo_profil });
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
    <div>
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
          width={90}
          height={90}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
}

export default UpdateProfilePicture;
