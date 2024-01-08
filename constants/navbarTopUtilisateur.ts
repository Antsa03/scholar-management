interface NavbarTopUtilisateurData {
  route: string;
  label: string;
}

export const NavbarTopUtilisateurDatas: NavbarTopUtilisateurData[] = [
  {
    route: "/utilisateur/ajout",
    label: "Ajouter utilisateur",
  },
  {
    route: "/utilisateur/relation/ajout",
    label: "Ajouter relation",
  },
  {
    route: "/utilisateur/admin",
    label: "Liste des administrateurs",
  },
  {
    route: "/utilisateur/enseignant",
    label: "Liste des enseignants",
  },
  {
    route: "/utilisateur/etudiant",
    label: "Liste des étudiants",
  },
  {
    route: "/utilisateur/responsable_legal",
    label: "Liste des responsables légaux",
  },
  {
    route: "/utilisateur/relation",
    label: "Listes des relations",
  },
];
