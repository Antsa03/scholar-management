import { NextResponse } from "next/server";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export default withAuth(async function middleware(req: NextRequestWithAuth) {
  try {
    const token = await getToken({ req, secret: process.env.SECRET });
    if (!token) {
      return NextResponse.rewrite(new URL("/", req.url));
    }

    const { pathname } = req.nextUrl;
    const isEtudiant = token.role === "Etudiant";
    const startsWithEtudiant = pathname.startsWith("/etudiant");
    const startsWithApiEtudiant = pathname.startsWith("/api/etudiant");
    const startsWithApi = pathname.startsWith("/api");

    if (
      isEtudiant &&
      !startsWithEtudiant &&
      !startsWithApiEtudiant &&
      (startsWithApi ||
        (pathname !== "/" &&
          pathname !== "/autorisation" &&
          pathname !== "/developpement"))
    ) {
      return NextResponse.rewrite(new URL("/autorisation", req.url));
    }

    if (!isEtudiant && (startsWithEtudiant || startsWithApiEtudiant)) {
      return NextResponse.rewrite(new URL("/autorisation", req.url));
    }
  } catch (error) {
    console.error(error);
  }
});

export const config = {
  matcher: [
    "/accueil",
    "/modifier-mdp",
    "/modifier-pdp",
    "/utilisateur/:path*",
    "/enseignement/:path*",
    "/pedagogie/:path*",
    "/absence/:path*",
    "/composition/:path*",
    "/demande_absence/:path*",
    "/excel/:path*",
    "/excel-etudiant/:path*",
    "/excel-information/:path*",
    "/excel-note/:path*",
    "/matiere/:path*",
    "/note/:path*",
    "/note-from-excel/:path*",
    "/unite_enseignement/:path*",
    "/etudiant/:path*",
    "/autorisation",
    "/developpement",
  ],
};
