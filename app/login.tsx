"use client";
import { useState } from "react";
import LoginView from "@/views/login/LoginView";
import { signIn } from "next-auth/react";
import { showSwal } from "@/utils/swal";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const estEmailESTI = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9.]+@esti\.mg$/;
    return regex.test(email);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (estEmailESTI(user.email) === false) {
        return showSwal("Pour information", "Adresse email invalide", "error");
      }
      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (res?.error) {
        showSwal("Information invalide", "", "error");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigationResetPassword = () => {
    if (user.email === "") {
      return showSwal(
        "Pour information",
        "Le champs de l'email est vide",
        "error"
      );
    }
    if (estEmailESTI(user.email) === false) {
      return showSwal("Pour information", "Adresse email invalide", "error");
    }
    router.push(`/password-reset/${user.email}`);
  };

  return (
    <LoginView
      user={user}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      handleNavigationResetPassword={handleNavigationResetPassword}
    />
  );
}
