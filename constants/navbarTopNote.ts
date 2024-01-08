interface NavbarTopNoteData {
  route: string;
  label: string;
}

export const NavbarTopNoteDatas: NavbarTopNoteData[] = [
  {
    route: "/note/ajout",
    label: "Ajouter un note",
  },
  {
    route: "/note/calendrier_2/ajout",
    label: "Ajouter un calendrier 2",
  },

  {
    route: "/note/excel-bd",
    label: "Note excel vers la BD",
  },
  {
    route: "/note/note-excel",
    label: "Note dans la BD en excel",
  },
  {
    route: "/note",
    label: "Liste des notes",
  },
  {
    route: "/note/releve_note",
    label: "Liste d'étudiant pour générer un relevé de note",
  },
  {
    route: "/note/calendrier_2",
    label: "Liste du calendrier 2",
  },
];
