"use client";
import { showSwal } from "@/utils/swal";
import Update_password from "@/views/password-reset/Update_password";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonIcon } from "@ionic/react";
import { arrowForward, key } from "ionicons/icons";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface PasswordForm {
  password: string;
  confirm_password: string;
}

function PasswordReset() {
  const params = useParams();
  const [email, setEmail] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [randomString, setRandomString] = useState("");
  const [showSecretCodeForm, setShowSecretCodeForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isSendSecretCode, setIsSendSecretCode] = useState(false);

  useEffect(() => {
    if (params?.email) {
      setEmail(decodeURIComponent(params?.email as string));
    }
  }, [params?.email]);

  const generateRandomString = (length: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const sendSercretCode = async () => {
    try {
      setIsSendSecretCode(true);
      const generatedString: string = generateRandomString(8);
      setRandomString(generatedString);
      const subject = "Réinitialisation de mot de passe";
      const message = `Votre code secret pour réinitialiser votre mot de passe. \nCode: ${generatedString}`;
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          subject: subject,
          message: message,
        }),
      });
      if (response.ok) {
        setIsSendSecretCode(false);
        showSwal(
          "Email envoyé!",
          "Un code a été envoyé à votre adresse email!",
          "success"
        );
        setShowSecretCodeForm(true);
      } else console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();
  const handleReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (randomString === inputValue) {
      setShowPasswordForm(true);
      setShowSecretCodeForm(false);
    }
  };

  const password_form = useForm<PasswordForm>({
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const { formState } = password_form;
  const { errors } = formState;

  const handleUpdatePassword: SubmitHandler<PasswordForm> = async (
    password_props
  ) => {
    try {
      if (password_props.password === password_props.password) {
        const response = await fetch(`/api/reset-password/${email}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(password_props),
        });
        if (response.ok) {
          showSwal("Information", "Mot de passe réinitialisé", "success");
          router.push("/");
        } else {
          showSwal("Information", "Echec de la réinitialisattion", "error");
          console.error(response);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login">
      <div className="login-transparent">
        <div className="flex flex-col justify-center gap-12 w-fit px-4  sm:px-20 py-20 shadow-none md:shadow-custom  rounded-md bg-transparent md:-bg--bg-primary-color ">
          <div className="">
            <h1 className="h1 text-center font-poppins">
              <IonIcon
                icon={key}
                className="text-xs sm:text-lg  -text--text-blue-color"
              ></IonIcon>{" "}
              Réinitialisation de mot de passe
            </h1>
          </div>
          <div className="w-full relative flex flex-col gap-2 items-center">
            <span className="text-sm sm:text-lg tracking-wider text-center">
              Votre email :
            </span>
            <p className="text-sm sm:text-lg w-full text-center block max-w-[400px] -text--text-blue-color tracking-wider  rounded-md">
              {email}
            </p>
            {showSecretCodeForm ? (
              ""
            ) : (
              <>
                {" "}
                {!showPasswordForm && (
                  <>
                    <button
                      onClick={sendSercretCode}
                      className="text-sm sm:text-lg w-full h-[40px] max-w-[400px] -bg--bg-solid-blue hover:-bg--bg-solid-blue/95  text-white tracking-wide rounded-md border-0 mt-3  transition-all ease-in-out delay-75 hover:scale-105"
                    >
                      {isSendSecretCode ? (
                        <div className="flex flex-row gap-2 items-center justify-center">
                          <FontAwesomeIcon
                            icon={faSpinner}
                            className="animate-spin  text-xl mr-2 block"
                          />
                          <p className="block"> Code en cours d'envoie...</p>
                        </div>
                      ) : (
                        "Envoyer le code secret"
                      )}
                    </button>
                    <button
                      onClick={() => router.back()}
                      className="text-sm sm:text-lg p-2 w-fit h-fit align-middle  flex flex-row items-center justify-center gap-2 mt-2 ml-auto"
                    >
                      Retour
                      <IonIcon
                        icon={arrowForward}
                        className="text-md sm:text-lg text-black block"
                      ></IonIcon>
                    </button>
                  </>
                )}
              </>
            )}

            {showSecretCodeForm && !showPasswordForm && (
              <form onSubmit={handleReset} className="w-full mt-12">
                <span className="text-sm sm:text-lg text-center block">
                  Entrez le code secret :{" "}
                </span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Entrer le code secret"
                  className="-border--border-dark-primary-color mt-3 px-4 border-[2px] rounded-md h-[40px] w-full outline-none"
                />
                <button
                  type="submit"
                  className="text-sm sm:text-lg w-full h-[40px] max-w-[400px] -bg--bg-solid-blue hover:-bg--bg-solid-blue/95  text-white tracking-wide rounded-md border-0 mt-4  transition-all ease-in-out delay-75 hover:scale-105"
                >
                  Confirmer
                </button>
                <button
                  onClick={() => router.back()}
                  className="text-sm sm:text-lg p-2 w-fit h-fit align-middle  flex flex-row items-center justify-center gap-2 mt-2 ml-auto"
                >
                  Retour
                  <IonIcon
                    icon={arrowForward}
                    className="text-md sm:text-lg text-black block"
                  ></IonIcon>
                </button>
              </form>
            )}
          </div>
          {showPasswordForm && (
            <Update_password
              register={password_form.register}
              handleSubmit={password_form.handleSubmit(handleUpdatePassword)}
              errors={errors}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
