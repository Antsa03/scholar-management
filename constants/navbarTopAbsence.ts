interface NavbarTopAbsenceData {
  route: string;
  label: string;
}

export const NavbarTopAbsenceDatas: NavbarTopAbsenceData[] = [
  {
    route: "/absence/etudiant/ajout",
    label: "Ajouter un absence pour étudiant",
  },
  {
    route: "/absence/enseignant/ajout",
    label: "Ajouter un absence pour enseignant",
  },
  {
    route: "/absence/etudiant",
    label: "Liste des absences pour etudiant",
  },
  {
    route: "/absence/enseignant",
    label: "Liste des absences pour enseignant",
  },
];
