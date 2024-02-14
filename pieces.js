//Import de la fonction ajoutListenerAvis
import { ajoutListenersAvis } from "./avis.js";

//Récupération des pièces depuis le fichier JSON
const reponse = await fetch ("http://localhost:8081/pieces");
const pieces = await reponse.json();

//FONCTION DE GENERATION DU DOM
function genererPieces(pieces){
    for (let i=0; i<pieces.length; i++){

    //on crée une div pour chaque pièce
    const zonePiece = document.createElement("div");
    
    //on récupère et affiche le nom de l'élément
    const nomElement = document.createElement("h2");
    nomElement.innerText = pieces[i].nom; 
    zonePiece.appendChild(nomElement); 

    //idem avec le prix
    const prixElement = document.createElement("p");
    prixElement.innerText = pieces[i].prix + " € " ; 
    zonePiece.appendChild(prixElement); 

    //idem avec la desc.
    const descriptionElement = document.createElement("p");
    if (pieces[i].description===undefined){
        descriptionElement.innerText ="Pas de description produit :( ";
    } else {
        descriptionElement.innerText = pieces[i].description;
    }
    zonePiece.appendChild(descriptionElement)

    //idem avec image
    const imageElement = document.createElement("img");
    imageElement.src = pieces[i].image; 
    zonePiece.appendChild(imageElement); 
    
    //////////////////////ajout <button> pour les avis//////////////////////////////
    const avisBouton = document.createElement("button");
    avisBouton.dataset.id = pieces[i].id;
    avisBouton.innerText = "Afficher les avis";
    zonePiece.appendChild(avisBouton);

    //on récupère la section des fiches
    const zoneAffichageDesPieces = document.querySelector(".fiches");

    //on y insère les div des pièces
    zoneAffichageDesPieces.appendChild(zonePiece);
    }

    ajoutListenersAvis();

}



genererPieces(pieces);




 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////// EVENT LISTENERS/////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////



//TRI DES PRODUITS prix Croissants
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click",()=>{

    document.querySelector(".fiches").innerHTML = ``;
    genererPieces(pieces);

    const listePiecesOrdoCroi = pieces.sort(function(a,b){
        return a.prix - b.prix;
    });

    document.querySelector(".fiches").innerHTML = ``;
    console.log("Page effacée !");

    genererPieces(listePiecesOrdoCroi);
    console.log("Page générée !");

})



//TRI DES PRODUITS prix Décroissants 
const boutonTrierDec = document.querySelector(".btn-trier-decroissant");
boutonTrierDec.addEventListener("click",()=>{

    document.querySelector(".fiches").innerHTML = ``;
    genererPieces(pieces);

    const listePiecesOrdoDecroi = pieces.sort(function(a,b){
        return b.prix - a.prix;
    });

    document.querySelector(".fiches").innerHTML = ``;
    console.log("Page effacée !");

    genererPieces(listePiecesOrdoDecroi);
    console.log("Page générée !");


})



// FILTRAGE DES PRODUITS sans descritpion
const boutonFiltrerDesc = document.querySelector(".btn-filtrer-descriptions");
boutonFiltrerDesc.addEventListener("click", ()=>{

    document.querySelector(".fiches").innerHTML = ``;
    genererPieces(pieces);

    const nomsPieces = pieces.map(piece=>piece.nom);
    const prixPieces = pieces.map(piece=>piece.prix);
    const imagePieces = pieces.map(piece=>piece.image);
    const listePiecesSansDesc = pieces.map(piece=>piece);

    for (let i=pieces.length - 1; i>=0; i--){
        if(pieces[i].description===undefined){
            nomsPieces.splice(i,1);
            prixPieces.splice(i,1);
            imagePieces.splice(i,1);
            listePiecesSansDesc.splice(i,1);

            document.querySelector(".fiches").innerHTML=``;
            console.log("Page effacée !");
        
            genererPieces(listePiecesSansDesc);
            console.log("Page générée !");       
        }
    }
    
    
});

 


//FILTRAGE DES PRODUITS ABORDABLES
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", ()=>{

    document.querySelector(".fiches").innerHTML = ``;
    genererPieces(pieces);

    //on récupére le nom, le prix et les images des pieces ABORDABLES
    const nomsPieces = pieces.map(piece=>piece.nom);
    const prixPieces = pieces.map(piece=>piece.prix);
    const imagePieces = pieces.map(piece=>piece.image);
    const listePiecesAbor = pieces.map(piece=>piece);

    for (let i=pieces.length-1; i>=0; i--){
        if(pieces[i].prix >= 35){
            listePiecesAbor.splice(i,1);
            nomsPieces.splice(i,1);
            prixPieces.splice(i,1);
            imagePieces.splice(i,1);

             //on efface la page pour obtenir une page vide
            document.querySelector(".fiches").innerHTML=``;
            console.log("Page effacée!");

            //on crée la nouvelle zone où afficher les pieces ABORDABLES
            genererPieces(listePiecesAbor);
            console.log("Page générée!");
        }
        
    }

    

    
});



//PRODUITS DISPONIBLES
const boutonFiltrerDispo = document.querySelector(".btn-filtrer-disponibilite");
boutonFiltrerDispo.addEventListener("click",()=>{

    document.querySelector(".fiches").innerHTML = ``;
    genererPieces(pieces);

    const nomsPieces = pieces.map(piece=>piece.nom);
    const prixPieces = pieces.map(piece=>piece.prix);
    const imagePieces = pieces.map(piece=>piece.image);
    const listePiecesDispo = pieces.map(piece=>piece);

    for (let i=pieces.length-1 ; i>=0 ; i--){
        if(pieces[i].disponibilité===false){
            nomsPieces.splice(i,1);
            prixPieces.splice(i,1);
            imagePieces.splice(i,1);
            listePiecesDispo.splice(i,1);


            document.querySelector(".fiches").innerHTML=``;
            console.log("Page effacée!");
        
            genererPieces(listePiecesDispo);
            console.log("Page générée !");
        }
    }
})


// GESTION DU INPUT RANGE
const rangePrixMax = document.querySelector("#prix");
const affichageRange = document.querySelector("#affichRang");
rangePrixMax.addEventListener("input", ()=>{
    const listePiecesFiltrees = pieces.filter(function(piece){
        console.log(rangePrixMax.value)
        affichageRange.innerText = `` ;
        affichageRange.innerText = " < " + rangePrixMax.value + " € ";
        return piece.prix <= rangePrixMax.value;
    });
    document.querySelector(".fiches").innerHTML=``;
    genererPieces(listePiecesFiltrees); 
})

 





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 /* Création dES FICHES PRODUITS dans le DOM - VERSION BOURRIN
for (let i=0; i<pieces.length; i++){
const article = pieces[i] //piece[i] = i ème objet du tableau pieces.json

const imageArticle = document.createElement("img");
imageArticle.src = article.image //l'image utilisée est celle indiquée dans la propriété "image" dans pieces.json

const nomArticle = document.createElement("h2");
nomArticle.innerText= article.nom;

const prixArticle = document.createElement("p");
prixArticle.innerText = `Prix : ${article.prix} €   (${article.prix<35 ? "  € ":"   €€€  "})`;

const descriptionArticle = document.createElement("p");
descriptionArticle.innerText = article.description ?? '(Pas de description :/)';

const disponibiliteArticle = document.createElement("p");
disponibiliteArticle.innerText = `Etat : ${article.disponibilité===true ? "En stock":"Rupture de stock"}`;

//Integration dans la page
let divArticle = document.createElement("div")
let parentArticle = document.querySelector(".fiches");


divArticle.appendChild(imageArticle);
divArticle.appendChild(nomArticle);
divArticle.appendChild(prixArticle);
divArticle.appendChild(descriptionArticle);
divArticle.appendChild(disponibiliteArticle);

parentArticle.appendChild(divArticle)
}*/