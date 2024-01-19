import Utilisateur from "../Utilisateur";

export default interface Responsable_legal extends Utilisateur{
    id_reponsable_legal: string,
    profession: string
}