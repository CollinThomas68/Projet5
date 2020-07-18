//toute première opération
if (localStorage.getItem("panier") === null) {
    localStorage.setItem("panier", "vide");
    localStorage.setItem("messageQtePanier","vide");
    localStorage.setItem("messagePrixPanier","vide");
}

//
var affichageNav= function Nav(){
if (JSON.parse(localStorage.getItem("panier") === "vide")) { //Panier vide 
    document.getElementById("affichagePanier").innerHTML = '<i class="fas fa-shopping-basket fa-4x"></i>';
} else { // panier NON vide
    var quantitePanier=JSON.parse(localStorage.getItem("messageQtePanier"));
    document.getElementById("affichagePanier").innerHTML = '<i class="fas fa-shopping-basket fa-4x"></i><div class="qtePanier">'+quantitePanier+'</div>' ;
}
}
//Fonction Vider le Panier
var ViderPanier = function ViderPanier(){
    localStorage.getItem("panier");
    localStorage.setItem("panier","vide");
    localStorage.setItem("messageQtePanier", "vide");
    localStorage.setItem("messagePrixPanier","vide");
    window.location.href="orinoco.html";
}

//Fonction Calculer la quantité d'articles du Panier
function calculQtePanier(tableau){
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    localStorage.setItem("messageQtePanier",tableau.reduce(reducer) );
}

//Fonction Calculer le Prix Total du Panier
function calculPrixPanier(tableau){
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    console.log('test fonction calcul prix');
    console.log(tableau.reduce(reducer));
    localStorage.setItem("messagePrixPanier",tableau.reduce(reducer) );
}


// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès/*
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
            var conteneurElt = document.createElement("article"); 
            var descriptionElt = document.createElement("p");
            conteneurElt.textContent="Cette référence n'existe pas !"; 
            teddyElt.appendChild(conteneurElt);  
            conteneurElt.appendChild(descriptionElt);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}




/*Fonction permettant d'ajouter un produit dans le panier depuis la fiche produit*/
function ajoutProduitPanier(produit){
    const id= document.getElementById('id').value;
    const nom=document.getElementById('nom').value;
    const quantite=document.getElementById('quantite').value;
    const couleur=document.getElementById('couleur').value;
    const adresseHtml=document.getElementById('adresseHtml').value;
    const description = document.getElementById('description').value;
    const prix = document.getElementById('prix').value;
    const image = document.getElementById('image').value;
    var prixTtl= prix * quantite;


    class produitPanier{
        constructor(id,nom,quantite,couleur,adresseHtml,description,prix,image,prixTtl){
            this.id=id;
            this.nom=nom;
            this.quantite=quantite;
            this.couleur=couleur;
            this.adresseHtml=adresseHtml;
            this.description=description;
            this.prix=prix;
            this.image=image;
            this.prixTtl=prixTtl;
        }
    }
        if( localStorage.getItem("panier")==="vide"){
            //Création panier + ajout article
            const produit = new produitPanier(id, nom, quantite, couleur,adresseHtml,description,prix,image,prixTtl);
            var Panier=[];
            Panier.push(produit);
            localStorage.setItem("panier",JSON.stringify(Panier));
            //Création tableau gestion qte
            var tableauQtePanier=[]; //Déclaration du tableau de calcul des quantités test
            tableauQtePanier.push(Number(produit.quantite)); //test
            calculQtePanier(tableauQtePanier);
            window.location.href=adresseHtml;
  
        } else{
            /*2 hypothèes : -> le produit existe déjà dans le panier, on ne changera donc que la quantité de celui-ci et le prix rapporté à la quantité.
                            -> le produit est absent des produits déjà présents, il faut rajouter une ligne.
            */
        var contenuPanier=JSON.parse(localStorage.getItem("panier"));

        var tableauquantitePanier=[];
        tableauquantitePanier.push(JSON.parse(localStorage.getItem("messageQtePanier")));
        console.log(tableauquantitePanier);
        var produitExiste=false;
        for (let x in contenuPanier){

            if(contenuPanier[x].id==id && contenuPanier[x].couleur==couleur){//1ere hypothèse

                produitExiste=true;
                let qtePanier=Number(contenuPanier[x].quantite);
                let qteAjoutee=Number(quantite);
                tableauquantitePanier.push(Number(quantite));
                console.log(tableauquantitePanier);
                contenuPanier[x].quantite=qtePanier + qteAjoutee;
                contenuPanier[x].prixTtl=contenuPanier[x].quantite * contenuPanier[x].prix;
            }

        }
        if(!produitExiste){
            const produit = new produitPanier(id, nom,quantite, couleur,adresseHtml,description,prix,image,prixTtl);
            contenuPanier.push(produit);
            tableauquantitePanier.push(Number(produit.quantite));

        }
        localStorage.setItem("panier",JSON.stringify(contenuPanier));
        calculQtePanier(tableauquantitePanier);

        window.location.href=adresseHtml;

    }
    return false;
}

// Les fonctions liées à la gestion du panier sont programmées ici !//
//La première permet de rajouter une quantité de 1 sur le teddy selectionné dans le panier//
var ajoutQuantite = function ajoutQuantitePanier(id,couleur){

    var contenuPanier=JSON.parse(localStorage.getItem("panier"));
    var tableauquantitePanier=[];
    tableauquantitePanier.push(JSON.parse(localStorage.getItem("messageQtePanier")));
    var produitExiste=false;
    for(let x in contenuPanier){
        console.log(contenuPanier[x]);
        if(contenuPanier[x].id==id && contenuPanier[x].couleur==couleur){
            console.log(contenuPanier[x].couleur);
            produitExiste=true;
            contenuPanier[x].quantite++;
            tableauquantitePanier.push(Number(1));
            contenuPanier[x].prixTtl=contenuPanier[x].quantite * contenuPanier[x].prix;
        }    
    }
    localStorage.setItem("panier",JSON.stringify(contenuPanier));
    calculQtePanier(tableauquantitePanier);
    console.log(contenuPanier);
    
    window.location.href="panier.html";
    
}



//La deuxième permet de diminuer la quantité de 1 dans le panier sur le teddy selectionné//
var diminutionQuantite = function diminutionQuantitePanier(id,couleur){
    var contenuPanier=JSON.parse(localStorage.getItem("panier"));
    var tableauquantitePanier=[];
    tableauquantitePanier.push(JSON.parse(localStorage.getItem("messageQtePanier")));
    var produitExiste=false;
    for( let x in contenuPanier){
        if(contenuPanier[x].id==id && contenuPanier[x].couleur==couleur){
            produitExiste=true;
            contenuPanier[x].quantite--;
            tableauquantitePanier.push(Number(-1));
            contenuPanier[x].prixTtl=contenuPanier[x].prix * contenuPanier[x].quantite;
        }
    }
    localStorage.setItem("panier",JSON.stringify(contenuPanier));
    calculQtePanier(tableauquantitePanier);
    window.location.href="panier.html";
}


/*La troisième fonction permet de supprimer un article d'u panier
    Deux possibilités à nouveau :
    - si le panier contient un seul article*/
var suppressionArticle = function suppressionArticlePanier(produit){
    var contenuPanier=JSON.parse(localStorage.getItem("panier"));
    var tableauquantitePanier=[];
    tableauquantitePanier.push(JSON.parse(localStorage.getItem("messageQtePanier")));
    if(contenuPanier.length==1){
        localStorage.removeItem("panier");
        localStorage.setItem("panier","vide");
        localStorage.setItem("messageQtePanier", "vide");
        localStorage.setItem("messagePrixPanier","vide");
        window.location.href="orinoco.html";
    }
    //si le panier contient plusieurs articles
    else{
        contenuPanier.splice(produit,1);
        localStorage.setItem("panier",JSON.stringify(contenuPanier));
        tableauquantitePanier.push(Number(-1));
        calculQtePanier(tableauquantitePanier);
        window.location.href="panier.html";
    }
}

//Envoi de la commande 
var envoiCommande = function () {
    const prenom = document.getElementById('prenom').value; //recupere prenom
    const nom = document.getElementById('nom').value; //recupere nom 
    const mail = document.getElementById('email').value; //recupere email
    const ville = document.getElementById('ville').value; //recupere ville 
    const adresse = document.getElementById('adresse').value; //recupere adresse  


    //On crée une class pour l'envoi de la commande basée sur contact(info formulaire) et products(listing id du panier)
    class Commande {
        constructor(contact, products) {
            this.contact = contact;
            this.products = products;
        }
    }
    //On créé une class pour l'utilisateur
    class Utilisateur {
        constructor(prenom, nom, adresse, ville, mail) {
            this.firstName = prenom;
            this.lastName = nom;
            this.address = adresse;
            this.city = ville;
            this.email = mail;
        }
    }

    //Création du contact en se basant sur la class précédente et les données du formulaire
    const contact = new Utilisateur(prenom, nom, adresse, ville, mail);


    //construction de l'array products avec uniquement les identifiants des produits
    var contenuPanier=JSON.parse(localStorage.getItem("panier"));
    console.log('Affichage contenuPanier')
    console.log(contenuPanier);
    var products = [];
    for (var x = 0; x < contenuPanier.length; x++) {

        var ligneProduit = contenuPanier[x];
            for (var y =0; y < ligneProduit.quantite;y++){//


                products.push(ligneProduit.id);
            }

    }

    const commandecomplete = new Commande(contact, products)

    //Envoi de la commande


    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            var response = JSON.parse(this.responseText);
            localStorage.panier = "vide";
            localStorage.setItem("confirmationCommande", response.orderId);//On enregistre l'Id obtenu en retour
            window.location.href = "remerciement.html"; // Vers la page de confirmation
            
        }
    }; // fin de la fonction
    console.log(commandecomplete);
    req.open("POST", "http://localhost:3000/api/teddies/order");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(commandecomplete));
    return false;
}

