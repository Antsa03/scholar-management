import Utilisateur from "../Utilisateur"

export default interface Admin extends Utilisateur{
    id_admin: string,
    fonction: string
}