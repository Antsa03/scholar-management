import React from "react";
import { UseFormRegister } from "react-hook-form";

interface PasswordForm {
  password: string;
  confirm_password: string;
}

interface Update_passwordProps {
  register: UseFormRegister<PasswordForm>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function Update_password({ register, handleSubmit }: Update_passwordProps) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Nouveau mot de passe</label>
          <input type="text" {...register("password")} />
        </div>
        <div>
          <label htmlFor="confirm_password">Confirmer le mot de passe</label>
          <input type="text" {...register("confirm_password")} />
        </div>
        <button type="submit">Confirmer</button>
      </form>
    </div>
  );
}

export default Update_password;
