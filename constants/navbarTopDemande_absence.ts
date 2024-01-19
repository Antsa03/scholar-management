interface NavbarTopDemandeAbsenceData {
  route: string;
  label: string;
}

export const NavbarTopDemandeAbsenceDatas: NavbarTopDemandeAbsenceData[] = [
  {
    route: "/demande_absence/ajout",
    label: "Ajouter un démande d'absence",
  },
  {
    route: "/demande_absence",
    label: "Liste des demandes d'absences",
  },
];
