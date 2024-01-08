import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Password = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="input flex flex-col align-baseline w-[500px] mb-8">
      <label
        htmlFor={showPassword ? "text" : "password"}
        className="text-sm block mb-2 font-medium"
      >
        Mot de passe *
      </label>
      <div className="relative m-0 p-0 ">
        <input
          type={showPassword ? "text" : "password"}
          className="h-[56px] px-4 py-2 w-[500px] border-2 border-blue-600 outline-none rounded-lg"
        />
        <FontAwesomeIcon
          onClick={handleShowPassword}
          icon={showPassword ? faEyeSlash : faEye}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600"
        />
      </div>
    </div>
  );
};

export default Password;
