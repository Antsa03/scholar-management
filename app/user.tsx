"use client";
import { useSession } from "next-auth/react";
import { LogoutButton } from "@/components/auth";

export const User = () => {
  const { data: session }: any = useSession();

  if (session) {
    return (
      <div>
        <p className="text-[10px] text-blue-800">{session?.user.name}</p>
        <p className="text-[10px]">{session?.user.role}</p>
        <p className="text-[10px]">{session.user.userName}</p>
        <img
          src={`/img/photo_profil/${session.user.image}`}
          width={48}
          height={48}
        />
        <LogoutButton />
      </div>
    );
  }
};
