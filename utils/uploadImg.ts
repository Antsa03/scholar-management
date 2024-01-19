"use server";

import { put } from "@vercel/blob";

export const uploadImg = async (formData: FormData) => {
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
  const file = formData.get("file") as File;
  const filename = file.name;

  // Vérifiez si le type de fichier est dans le tableau
  if (!fileType.includes(file.type)) {
    throw new Error("Le type de fichier n'est pas pris en charge.");
  }

  // Vérifiez si la taille du fichier est inférieure à 4 Mo
  if (file.size > 4 * 1024 * 1024) {
    throw new Error("La taille du fichier ne doit pas dépasser 4 Mo.");
  }

  const blob = await put(filename, file, {
    access: "public",
  });
  console.log(blob.url);
  return blob.url;
};
