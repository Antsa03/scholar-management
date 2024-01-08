import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { off } from "process";

interface PasswordProps {
  password: string;
  handleInputChange: Function;
}

const Password = ({ password, handleInputChange }: PasswordProps) => {
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
          name="password"
          value={password}
          onChange={(event) => handleInputChange(event)}
          className="input-login"
          autoComplete="off"
        />
        <FontAwesomeIcon
          onClick={handleShowPassword}
          icon={showPassword ? faEyeSlash : faEye}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black"
        />
      </div>
    </div>
  );
};

export default Password;
