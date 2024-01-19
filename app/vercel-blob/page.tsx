"use client";

import { FormEventHandler, useState } from "react";
import { uploadImg } from "@/utils/uploadImg";

export default function Page() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const file = formData.get("file") as File;
    console.log({ file });
    const url = await uploadImg(formData);
    setImageUrl(url);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files![0])}
        />
        <button type="submit">Upload</button>
      </form>
      {imageUrl ? <img src={imageUrl} alt="Uploaded image" /> : null}
    </div>
  );
}
