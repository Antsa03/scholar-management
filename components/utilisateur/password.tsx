import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import Utilisateur from "@/models/utilisateur/Utilisateur";

interface PasswordProps {
  register: UseFormRegister<Utilisateur>;
  errors: FieldErrors<Utilisateur>;
}

const Password = ({ register, errors }: PasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col align-baseline w-fit mb-2 sm:mb-8">
      <label htmlFor="password" className="label">
        Mot de passe *
      </label>
      <div className="relative m-0 p-0">
        <input
          type={showPassword ? "text" : "password"}
          {...register("mot_de_passe", {
            required: "Le mot de passe est obligatoire",
            minLength: {
              value: 8,
              message: "Le mot de passe doit contenir au moins 8 caractères",
            },
          })}
          className={`input-form ${
            errors?.mot_de_passe?.message ? "hasError" : ""
          }`}
          maxLength={60}
          autoComplete="off"
        />
        <FontAwesomeIcon
          onClick={handleShowPassword}
          icon={showPassword ? faEyeSlash : faEye}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black"
        />
      </div>
      <p className="p-error">{errors?.mot_de_passe?.message}</p>
    </div>
  );
};

export default Password;
