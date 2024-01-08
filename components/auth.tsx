"use client";
import { signIn, signOut } from "next-auth/react";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const LoginButton = () => {
  return (
    <button className="" onClick={() => signIn()}>
      Sign in
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button
      className="flex text-sm tracking-wider flex-row items-center justify-center gap-2 h-[40px] w-[160px] -text--text-ruby-color dark:-text--text-dark-ruby-color -bg--bg-ui-color-ruby hover:-bg--bg-ui-color-ruby-hover active:-bg--bg-ui-color-ruby-press dark:-bg--bg-dark-ui-color-ruby dark:hover:-bg--bg-dark-ui-color-ruby-hover dark:active:-bg--bg-ui-color-ruby-press rounded-md text-center "
      onClick={() => signOut()}
    >
      <div>
        <FontAwesomeIcon
          fontSize={14}
          icon={faSignOut}
          fontWeight={16}
        ></FontAwesomeIcon>
      </div>
      Se déconnecter
    </button>
  );
};
