import {
  homeOutline,
  homeSharp,
  personOutline,
  personSharp,
  clipboardOutline,
  clipboardSharp,
  closeOutline,
  closeSharp,
  documentOutline,
  documentSharp,
  calendarOutline,
  calendarSharp,
  schoolOutline,
  schoolSharp,
  createOutline,
  createSharp,
  bookOutline,
  bookSharp,
  statsChartOutline,
  statsChartSharp,
  gitBranchOutline,
  gitBranchSharp,
} from "ionicons/icons";

type IconMapping = {
  [key: string]: {
    outline: string;
    sharp: string;
  };
};

export const iconMapping: IconMapping = {
  home: { outline: homeOutline, sharp: homeSharp },
  person: { outline: personOutline, sharp: personSharp },
  clipboard: { outline: clipboardOutline, sharp: clipboardSharp },
  close: { outline: closeOutline, sharp: closeSharp },
  document: { outline: documentOutline, sharp: documentSharp },
  calendar: { outline: calendarOutline, sharp: calendarSharp },
  school: { outline: schoolOutline, sharp: schoolSharp },
  create: { outline: createOutline, sharp: createSharp },
  chatboxEllipses: {
    outline: gitBranchOutline,
    sharp: gitBranchSharp,
  },
  book: { outline: bookOutline, sharp: bookSharp },
  statsChart: { outline: statsChartOutline, sharp: statsChartSharp },
};

export interface Sublink {
  route: string;
  label: string;
}

export interface SidebarItemLink {
  id: number;
  icon: string;
  label: string;
  sublink: Sublink[];
}

export const SidebarItemLinks: SidebarItemLink[] = [
  {
    id: 1,
    icon: "home",
    label: "Accueil",
    sublink: [],
  },

  {
    id: 2,
    icon: "person",
    label: "Utilisateurs",
    sublink: [
      { route: "/utilisateur/ajout", label: "Ajouter un utilisateur" },
      {
        route: "/utilisateur/etudiant/ajout",
        label: "Ajouter des étudiants via Excel",
      },
      { route: "/utilisateur/admin", label: "Liste des administrateurs" },
      { route: "/utilisateur/enseignant", label: "Liste des enseignants" },
      { route: "/utilisateur/etudiant", label: "Liste des étudiants" },
      {
        route: "/utilisateur/responsable_legal",
        label: "Liste des responsables légaux",
      },
      {
        route: "/utilisateur/relation",
        label: "Liste des relations",
      },
    ],
  },
  {
    id: 3,
    icon: "clipboard",
    label: "Notes",
    sublink: [
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
        label: "Note dans un fichier excel vers la base de données",
      },
      {
        route: "/note/note-excel",
        label: "Note dans la BD en fichier excel",
      },
      {
        route: "/note",
        label: "Liste des notes",
      },
      {
        route: "/note/releve_note",
        label: "Liste d'étudiant pour générer un relevé des notes",
      },
      {
        route: "/note/calendrier_2",
        label: "Liste du calendrier 2",
      },
    ],
  },
  {
    id: 4,
    icon: "close",
    label: "Absence",
    sublink: [
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
        label: "Liste des  absences pour enseignant",
      },
    ],
  },
  {
    id: 5,
    icon: "document",
    label: "Compositions",
    sublink: [
      {
        route: "/composition/composition_1/ajout",
        label: "Ajouter une composition 1",
      },
      {
        route: "/composition/composition_2/ajout",
        label: "Ajouter une composition 2",
      },
      {
        route: "/composition/composition_3/ajout",
        label: "Ajouter une composition 3",
      },
      {
        route: "/composition/composition_1",
        label: "Liste des compositions 1",
      },

      {
        route: "/composition/composition_2",
        label: "Liste des compositions 2",
      },

      {
        route: "/composition/composition_3",
        label: "Liste des compositions 3",
      },
    ],
  },
  {
    id: 6,
    icon: "book",
    label: "Matieres",
    sublink: [
      { route: "/matiere/ajout", label: "Ajouter une matière" },
      { route: "/matiere", label: "Liste des matières" },
    ],
  },
  {
    id: 7,
    icon: "school",
    label: "UE",
    sublink: [
      {
        route: "/unite_enseignement/ajout",
        label: "Ajouter une UE",
      },
      {
        route: "/unite_enseignement",
        label: "Liste des UE",
      },
      {
        route: "/unite_enseignement/ue-matiere",
        label: "Liste des UE avec matière",
      },
    ],
  },
  {
    id: 8,
    icon: "create",
    label: "Demandes d'absence",
    sublink: [
      {
        route: "/demande_absence/ajout",
        label: "Ajouter une demande d'absence",
      },
      {
        route: "/demande_absence",
        label: "Liste des demandes d'absences",
      },
    ],
  },
  {
    id: 9,
    icon: "chatboxEllipses",
    label: "Pédagogie",
    sublink: [
      {
        route: "/pedagogie/ajout",
        label: "Ajouter une pédagogie",
      },
      {
        route: "/pedagogie",
        label: "Liste des pédagogies",
      },
    ],
  },
  {
    id: 10,
    icon: "statsChart",
    label: "Statistiques",
    sublink: [],
  },
];
