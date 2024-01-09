-- CreateTable
CREATE TABLE "Utilisateur" (
    "id_utilisateur" VARCHAR(10) NOT NULL,
    "photo_profil" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenoms" TEXT NOT NULL,
    "sexe" VARCHAR(10) NOT NULL,
    "adresse" TEXT NOT NULL,
    "telephone" VARCHAR(14) NOT NULL,
    "email" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id_utilisateur")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id_admin" VARCHAR(10) NOT NULL,
    "fonction" TEXT NOT NULL,
    "id_utilisateur" VARCHAR(10) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id_admin")
);

-- CreateTable
CREATE TABLE "Responsable_legal" (
    "id_responsable_legal" VARCHAR(10) NOT NULL,
    "profession" TEXT NOT NULL,
    "id_utilisateur" VARCHAR(10) NOT NULL,

    CONSTRAINT "Responsable_legal_pkey" PRIMARY KEY ("id_responsable_legal","id_utilisateur")
);

-- CreateTable
CREATE TABLE "Relation" (
    "id_relation" VARCHAR(10) NOT NULL,
    "id_responsable_legal" VARCHAR(10) NOT NULL,
    "num_matricule" TEXT NOT NULL,

    CONSTRAINT "Relation_pkey" PRIMARY KEY ("id_relation","id_responsable_legal","num_matricule")
);

-- CreateTable
CREATE TABLE "Etudiant" (
    "num_matricule" TEXT NOT NULL,
    "id_utilisateur" VARCHAR(10) NOT NULL,
    "date_naissance" DATE NOT NULL,
    "lieu_naissance" TEXT NOT NULL,
    "nationalite" TEXT NOT NULL,
    "civilite" CHAR(12) NOT NULL,

    CONSTRAINT "Etudiant_pkey" PRIMARY KEY ("num_matricule","id_utilisateur")
);

-- CreateTable
CREATE TABLE "Enseignant" (
    "id_enseignant" VARCHAR(10) NOT NULL,
    "diplome" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "specialite" TEXT NOT NULL,
    "date_recrutement" DATE NOT NULL,
    "date_arret_ens" DATE,
    "id_utilisateur" VARCHAR(10) NOT NULL,

    CONSTRAINT "Enseignant_pkey" PRIMARY KEY ("id_enseignant","id_utilisateur")
);

-- CreateTable
CREATE TABLE "Niveau" (
    "id_niveau" VARCHAR(10) NOT NULL,
    "designation_niveau" VARCHAR(15) NOT NULL,

    CONSTRAINT "Niveau_pkey" PRIMARY KEY ("id_niveau")
);

-- CreateTable
CREATE TABLE "Parcours" (
    "id_parcours" VARCHAR(10) NOT NULL,
    "designation_parcours" TEXT NOT NULL,

    CONSTRAINT "Parcours_pkey" PRIMARY KEY ("id_parcours")
);

-- CreateTable
CREATE TABLE "Composer_3" (
    "id_composer_3" VARCHAR(10) NOT NULL,
    "id_niveau" VARCHAR(10) NOT NULL,
    "id_parcours" VARCHAR(10) NOT NULL,

    CONSTRAINT "Composer_3_pkey" PRIMARY KEY ("id_composer_3","id_niveau","id_parcours")
);

-- CreateTable
CREATE TABLE "Unite_Enseignement" (
    "id_ue" VARCHAR(10) NOT NULL,
    "designation_ue" TEXT NOT NULL,
    "credit" REAL NOT NULL,
    "semestre_ue" VARCHAR(3) NOT NULL,
    "description_ue" TEXT NOT NULL,

    CONSTRAINT "Unite_Enseignement_pkey" PRIMARY KEY ("id_ue")
);

-- CreateTable
CREATE TABLE "Composer_2" (
    "id_composer_2" VARCHAR(10) NOT NULL,
    "id_parcours" VARCHAR(10) NOT NULL,
    "id_ue" VARCHAR(10) NOT NULL,

    CONSTRAINT "Composer_2_pkey" PRIMARY KEY ("id_composer_2","id_parcours","id_ue")
);

-- CreateTable
CREATE TABLE "Calendrier_1" (
    "annee_universitaire_1" VARCHAR(12) NOT NULL,

    CONSTRAINT "Calendrier_1_pkey" PRIMARY KEY ("annee_universitaire_1")
);

-- CreateTable
CREATE TABLE "Matiere" (
    "code_matiere" VARCHAR(10) NOT NULL,
    "designation_matiere" TEXT NOT NULL,
    "coeff" REAL NOT NULL,
    "credit_matiere" REAL NOT NULL,
    "v_horaire_matiere" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "id_enseignant" VARCHAR(10) NOT NULL,

    CONSTRAINT "Matiere_pkey" PRIMARY KEY ("code_matiere","id_enseignant")
);

-- CreateTable
CREATE TABLE "Composer_1" (
    "id_composer_1" VARCHAR(10) NOT NULL,
    "code_matiere" VARCHAR(10) NOT NULL,
    "id_ue" VARCHAR(10) NOT NULL,
    "annee_universitaire_1" VARCHAR(12) NOT NULL,

    CONSTRAINT "Composer_1_pkey" PRIMARY KEY ("id_composer_1","code_matiere","annee_universitaire_1")
);

-- CreateTable
CREATE TABLE "Calendrier_2" (
    "id_calendrier_2" VARCHAR(10) NOT NULL,
    "annee_universitaire_2" VARCHAR(12) NOT NULL,
    "semestre" VARCHAR(3) NOT NULL,
    "session" VARCHAR(2) NOT NULL,

    CONSTRAINT "Calendrier_2_pkey" PRIMARY KEY ("id_calendrier_2","annee_universitaire_2","semestre","session")
);

-- CreateTable
CREATE TABLE "Noter_1" (
    "id_noter_1" TEXT NOT NULL,
    "id_calendrier_2" VARCHAR(10) NOT NULL,
    "num_matricule" TEXT NOT NULL,
    "code_matiere" VARCHAR(10) NOT NULL,
    "note_matiere" REAL NOT NULL,

    CONSTRAINT "Noter_1_pkey" PRIMARY KEY ("id_noter_1","id_calendrier_2","num_matricule","code_matiere")
);

-- CreateTable
CREATE TABLE "Calendrier_3" (
    "id_calendrier_3" VARCHAR(10) NOT NULL,
    "date_deb_abs" DATE NOT NULL,
    "heure_deb_abs" TIME NOT NULL,

    CONSTRAINT "Calendrier_3_pkey" PRIMARY KEY ("id_calendrier_3","date_deb_abs","heure_deb_abs")
);

-- CreateTable
CREATE TABLE "Absence" (
    "id_absence" VARCHAR(10) NOT NULL,
    "num_matricule" TEXT NOT NULL,
    "code_matiere" VARCHAR(10) NOT NULL,
    "id_calendrier_3" VARCHAR(10) NOT NULL,
    "type_absence" VARCHAR(6) NOT NULL,
    "date_fin_abs" DATE NOT NULL,
    "heure_fin_abs" TIME NOT NULL,
    "justifiee" BOOLEAN NOT NULL,

    CONSTRAINT "Absence_pkey" PRIMARY KEY ("id_absence","num_matricule","code_matiere","id_calendrier_3")
);

-- CreateTable
CREATE TABLE "Demande_absence" (
    "id_demande_absence" VARCHAR(10) NOT NULL,
    "motif" TEXT NOT NULL,
    "date_demandee" DATE NOT NULL,
    "num_matricule" TEXT NOT NULL,

    CONSTRAINT "Demande_absence_pkey" PRIMARY KEY ("id_demande_absence","num_matricule")
);

-- CreateTable
CREATE TABLE "Calendrier_4" (
    "id_calendrier_4" VARCHAR(10) NOT NULL,
    "date_deb_abs_ens" DATE NOT NULL,
    "heure_deb_abs_ens" TIME NOT NULL,

    CONSTRAINT "Calendrier_4_pkey" PRIMARY KEY ("id_calendrier_4","date_deb_abs_ens","heure_deb_abs_ens")
);

-- CreateTable
CREATE TABLE "Absence_enseignant" (
    "id_absence_ens" VARCHAR(10) NOT NULL,
    "code_matiere" VARCHAR(10) NOT NULL,
    "id_calendrier_4" VARCHAR(10) NOT NULL,
    "date_fin_abs_ens" DATE NOT NULL,
    "heure_fin_abs_ens" TIME NOT NULL,
    "justifiee_ens" BOOLEAN NOT NULL,

    CONSTRAINT "Absence_enseignant_pkey" PRIMARY KEY ("id_absence_ens","code_matiere","id_calendrier_4")
);

-- CreateTable
CREATE TABLE "Observation" (
    "id_obs" TEXT NOT NULL,
    "admis" BOOLEAN NOT NULL,
    "situation" TEXT NOT NULL,
    "date_insc" DATE NOT NULL,
    "date_arret" DATE,

    CONSTRAINT "Observation_pkey" PRIMARY KEY ("id_obs")
);

-- CreateTable
CREATE TABLE "Calendrier_5" (
    "annee_universitaire_5" VARCHAR(12) NOT NULL,

    CONSTRAINT "Calendrier_5_pkey" PRIMARY KEY ("annee_universitaire_5")
);

-- CreateTable
CREATE TABLE "Information" (
    "id_information" TEXT NOT NULL,
    "num_matricule" TEXT NOT NULL,
    "annee_universitaire_5" VARCHAR(12) NOT NULL,
    "id_obs" TEXT NOT NULL,
    "id_niveau" VARCHAR(10) NOT NULL,
    "groupe" VARCHAR(15) NOT NULL,

    CONSTRAINT "Information_pkey" PRIMARY KEY ("id_information","num_matricule","annee_universitaire_5","id_obs","id_niveau")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Responsable_legal_id_responsable_legal_key" ON "Responsable_legal"("id_responsable_legal");

-- CreateIndex
CREATE UNIQUE INDEX "Relation_id_relation_key" ON "Relation"("id_relation");

-- CreateIndex
CREATE UNIQUE INDEX "Etudiant_num_matricule_key" ON "Etudiant"("num_matricule");

-- CreateIndex
CREATE UNIQUE INDEX "Enseignant_id_enseignant_key" ON "Enseignant"("id_enseignant");

-- CreateIndex
CREATE UNIQUE INDEX "Composer_3_id_composer_3_key" ON "Composer_3"("id_composer_3");

-- CreateIndex
CREATE UNIQUE INDEX "Composer_2_id_composer_2_key" ON "Composer_2"("id_composer_2");

-- CreateIndex
CREATE UNIQUE INDEX "Matiere_code_matiere_key" ON "Matiere"("code_matiere");

-- CreateIndex
CREATE UNIQUE INDEX "Composer_1_id_composer_1_key" ON "Composer_1"("id_composer_1");

-- CreateIndex
CREATE UNIQUE INDEX "Calendrier_2_id_calendrier_2_key" ON "Calendrier_2"("id_calendrier_2");

-- CreateIndex
CREATE UNIQUE INDEX "Noter_1_id_noter_1_key" ON "Noter_1"("id_noter_1");

-- CreateIndex
CREATE UNIQUE INDEX "Calendrier_3_id_calendrier_3_key" ON "Calendrier_3"("id_calendrier_3");

-- CreateIndex
CREATE UNIQUE INDEX "Absence_id_absence_key" ON "Absence"("id_absence");

-- CreateIndex
CREATE UNIQUE INDEX "Demande_absence_id_demande_absence_key" ON "Demande_absence"("id_demande_absence");

-- CreateIndex
CREATE UNIQUE INDEX "Calendrier_4_id_calendrier_4_key" ON "Calendrier_4"("id_calendrier_4");

-- CreateIndex
CREATE UNIQUE INDEX "Absence_enseignant_id_absence_ens_key" ON "Absence_enseignant"("id_absence_ens");

-- CreateIndex
CREATE UNIQUE INDEX "Information_id_information_key" ON "Information"("id_information");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responsable_legal" ADD CONSTRAINT "Responsable_legal_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relation" ADD CONSTRAINT "Relation_id_responsable_legal_fkey" FOREIGN KEY ("id_responsable_legal") REFERENCES "Responsable_legal"("id_responsable_legal") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relation" ADD CONSTRAINT "Relation_num_matricule_fkey" FOREIGN KEY ("num_matricule") REFERENCES "Etudiant"("num_matricule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Etudiant" ADD CONSTRAINT "Etudiant_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enseignant" ADD CONSTRAINT "Enseignant_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Composer_3" ADD CONSTRAINT "Composer_3_id_niveau_fkey" FOREIGN KEY ("id_niveau") REFERENCES "Niveau"("id_niveau") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Composer_3" ADD CONSTRAINT "Composer_3_id_parcours_fkey" FOREIGN KEY ("id_parcours") REFERENCES "Parcours"("id_parcours") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Composer_2" ADD CONSTRAINT "Composer_2_id_parcours_fkey" FOREIGN KEY ("id_parcours") REFERENCES "Parcours"("id_parcours") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Composer_2" ADD CONSTRAINT "Composer_2_id_ue_fkey" FOREIGN KEY ("id_ue") REFERENCES "Unite_Enseignement"("id_ue") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matiere" ADD CONSTRAINT "Matiere_id_enseignant_fkey" FOREIGN KEY ("id_enseignant") REFERENCES "Enseignant"("id_enseignant") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Composer_1" ADD CONSTRAINT "Composer_1_code_matiere_fkey" FOREIGN KEY ("code_matiere") REFERENCES "Matiere"("code_matiere") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Composer_1" ADD CONSTRAINT "Composer_1_id_ue_fkey" FOREIGN KEY ("id_ue") REFERENCES "Unite_Enseignement"("id_ue") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Composer_1" ADD CONSTRAINT "Composer_1_annee_universitaire_1_fkey" FOREIGN KEY ("annee_universitaire_1") REFERENCES "Calendrier_1"("annee_universitaire_1") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noter_1" ADD CONSTRAINT "Noter_1_id_calendrier_2_fkey" FOREIGN KEY ("id_calendrier_2") REFERENCES "Calendrier_2"("id_calendrier_2") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noter_1" ADD CONSTRAINT "Noter_1_num_matricule_fkey" FOREIGN KEY ("num_matricule") REFERENCES "Etudiant"("num_matricule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noter_1" ADD CONSTRAINT "Noter_1_code_matiere_fkey" FOREIGN KEY ("code_matiere") REFERENCES "Matiere"("code_matiere") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_num_matricule_fkey" FOREIGN KEY ("num_matricule") REFERENCES "Etudiant"("num_matricule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_code_matiere_fkey" FOREIGN KEY ("code_matiere") REFERENCES "Matiere"("code_matiere") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_id_calendrier_3_fkey" FOREIGN KEY ("id_calendrier_3") REFERENCES "Calendrier_3"("id_calendrier_3") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demande_absence" ADD CONSTRAINT "Demande_absence_num_matricule_fkey" FOREIGN KEY ("num_matricule") REFERENCES "Etudiant"("num_matricule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence_enseignant" ADD CONSTRAINT "Absence_enseignant_code_matiere_fkey" FOREIGN KEY ("code_matiere") REFERENCES "Matiere"("code_matiere") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence_enseignant" ADD CONSTRAINT "Absence_enseignant_id_calendrier_4_fkey" FOREIGN KEY ("id_calendrier_4") REFERENCES "Calendrier_4"("id_calendrier_4") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Information" ADD CONSTRAINT "Information_num_matricule_fkey" FOREIGN KEY ("num_matricule") REFERENCES "Etudiant"("num_matricule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Information" ADD CONSTRAINT "Information_annee_universitaire_5_fkey" FOREIGN KEY ("annee_universitaire_5") REFERENCES "Calendrier_5"("annee_universitaire_5") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Information" ADD CONSTRAINT "Information_id_obs_fkey" FOREIGN KEY ("id_obs") REFERENCES "Observation"("id_obs") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Information" ADD CONSTRAINT "Information_id_niveau_fkey" FOREIGN KEY ("id_niveau") REFERENCES "Niveau"("id_niveau") ON DELETE CASCADE ON UPDATE CASCADE;
