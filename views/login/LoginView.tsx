import Password from "@/components/password";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "@/public/img/logo.png";
import User from "@/models/login/User";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface LoginViewProps {
  user: User;
  handleInputChange: Function;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function Login({ user, handleInputChange, handleSubmit }: LoginViewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className="login">
      <div className="login-transparent">
        <div className="w-full h-full max-w-fit md:max-h-[540px] -bg--bg-primary-color  z-30 sm:shadow-custom flex flex-col items-center  justify-center  mb-4 sm:gap-2  sm:px-8 md:px-12 pb-8 md:pb-10 pt-6  md:pt-8  sm:pb-16 sm:pt-12  border-2  border-none ">
          <Image
            src={Logo}
            alt="logo de l'ESTI"
            width={180}
            height={180}
            className="w-12 h-10 sm:w-[100px] sm:h-[70px] my-2"
          ></Image>
          <h1 className="font-poppins text-[22px] sm:text-[32px]  -text--text-blue-color tracking-wide  pb-8  dark:-text--text-dark-primary-color">
            Scholar management
          </h1>
          <h3 className=" text-base -text--text-secondary-color sm:text-xl font-bold mb-4 sm:mb-0">
            Se connecter à votre compte
          </h3>
          <form
            className="w-fit flex flex-col gap-4 custom-mobile:gap-2 justify-center items-center sm:gap-0 sm:flex sm:flex-col"
            onSubmit={async (event) => {
              setIsSubmitting(true);
              await handleSubmit(event);
              setIsSubmitting(false);
            }}
            autoComplete="off"
          >
            <div className="flex flex-col align-baseline sm:w-[400px] sm:mb-4 p-0">
              <label className="label">Email *</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={(event) => handleInputChange(event)}
                className="input-login"
                required
                placeholder="example@esti.mg"
              />
            </div>
            <Password
              password={user.password}
              handleInputChange={handleInputChange}
            />{" "}
            <button
              type="submit"
              className="w-[280px] h-[40px] flex flex-row gap-2 justify-center items-center  sm:w-[400px] -bg--bg-solid-blue hover:-bg--bg-solid-blue/95 hover:shadow-md text-white text-center   tracking-wide text-base sm:text-xl  rounded-md border-0 inset-2  transition-all ease-in-out delay-75 hover:scale-105 sm:mb-4"
            >
              {isSubmitting ? (
                <>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="animate-spin  text-xl mr-2 block"
                  />
                  <p className="block"> Connexion</p>
                </>
              ) : (
                "Se connecter"
              )}
            </button>
            <Link
              href={`/password-reset/${user.email}`}
              className="hover:-text--text-blue-color"
            >
              Mot de passe oublié ?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
