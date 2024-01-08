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


  const blob = await put(filename, file, {
    access: "public",
  });
  console.log(blob.url);
  return blob.url;
};