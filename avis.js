export function ajoutListenersAvis() {

    // "piecesElements" = toutes les balises <button> présents sur les .fiches
    const piecesElements = document.querySelectorAll(".fiches button");  

    // on ajoute un écouteur d'évenement sur chaque <button>
    for (let i = 0; i < piecesElements.length; i++) {
      piecesElements[i].addEventListener("click", async function (event) {

        const idPiece = event.target.dataset.id; // on récupère l'ID de la piece grâce à dataset
        const reponse = await fetch(`http://localhost:8081/pieces/${idPiece}/avis`); //requete pour l'avis correspondant à la piece 
        const avis = await reponse.json(); //on extrait de la réponse les avis client sous forme de liste JSON
        console.log(avis)
        const parentElement =  event.target.parentElement

        const avisElement = document.createElement("p");// on ajoute les avis au DOM
         for (let i=0; i<avis.length; i++){
          avisElement.innerHTML += `<b> Client(e) </b> : ${avis[i].utilisateur} <br>  <b> Avis </b> : ${avis[i].commentaire} <br><br>`;
        }
        
        parentElement.appendChild(avisElement);
        

      });
    }
}