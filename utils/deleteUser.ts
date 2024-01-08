export default async function deleteUser(id_utilisateur: string) {
    try {
        const response = await fetch(`/api/utilisateur/delete/${id_utilisateur}`, {
            method: "DELETE"
        });
        if(response.ok) 
            console.log("Utilisateur supprimé avec succès");
        else
            console.error(response);
    } catch (error) {
        console.error(error);
    }
}