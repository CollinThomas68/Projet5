
     affichageNav();
     
     if (JSON.parse(localStorage.getItem("panier") === "vide")) { //Panier vide 


 


        document.getElementById("detailPanier").innerHTML = 
            '<article class="row">'+
                '<div class="col-12">'+
                    '<p>Le panier est vide </p>'+
                    '<p><a href="orinoco.html"> Retour à l\'accueil </a></p>'+
                '</div>'+
            '</article>';
        document.getElementById("contactClient").innerHTML =
        '<div>'+'</div>';

    } else { // panier NON vide
        var quantitePanier=JSON.parse(localStorage.getItem("messageQtePanier"));
        var contenuPanier = JSON.parse(localStorage.getItem("panier")); // Récupération du  panier
        console.log(contenuPanier);
        var tableauPrixPanier=[];//Déclaration du tableau de calcul des prix

        for (let x in contenuPanier) { //Inspection du panier
            var ligneProduitPanier = contenuPanier[x]; //Recherche  ligneProduitLocal par id

            //Calcul du prix Total
            var lignePrixPanier=contenuPanier[x].prixTtl;
            tableauPrixPanier.push(Number(contenuPanier[x].prixTtl));
            calculPrixPanier(tableauPrixPanier);
            var prixTotal=localStorage.messagePrixPanier;
            console.log('Test affichage final');
            console.log(prixTotal);

            //Calcul du prix total

            // variation quantite - ou suppression a l'affichage
            var boutonMoins = "";

            if (ligneProduitPanier.quantite > 1) {
                boutonMoins = '<button class="boutonMoins" onclick="diminutionQuantite(\'' + ligneProduitPanier.id + '\',\''+ligneProduitPanier.couleur+'\')"><b>-1</b></button>';
            } else {
                boutonMoins = '<button class="boutonMoins" onclick="suppressionArticle(' + x + ')"><b>Suppr.</b></button>';
            }

            // creationligne produit
            let ligne =
                '<article class="row">'+
                    '<div class="col-md-10">'+
                        '<a href="'+ligneProduitPanier.adresseHtml +'">'+
                            '<div class="row">'+
                                '<div class="col-md-6"><img src="'+ ligneProduitPanier.image +'" title="' + ligneProduitPanier.id +'" alt="'+ligneProduitPanier.nom+'" class="detail"></div>'+
                                '<div class="col-md-3">'+
                                    '<div>' + ligneProduitPanier.nom + '</div>'+
                                    '<div><b>Couleur: </b><span id="couleurPanier">' + ligneProduitPanier.couleur + '</span></div>'+
        
                                    '<div>' + ligneProduitPanier.description + '</div>'+
                                '</div>'+
                                '<div class="col-md-3">'+
                                    '<div><b>Prix U:</b><br/>' + ligneProduitPanier.prix / 100 + '€</div>'+
                                    '<div><b>Qté:</b><br/>' + ligneProduitPanier.quantite + '</div>'+
                                    '<div><b>Montant dû</b><br/>' + ligneProduitPanier.prixTtl / 100 + '€</div>'+
                                '</div>'+
                            '</div>'+
                        '</a>'+
                    '</div>'+
                    '<div class="col-md-2">'+
                        '<button class="boutonPlus" onclick="ajoutQuantite(\'' + ligneProduitPanier.id + '\',\''+ligneProduitPanier.couleur+'\')"><b>+1</b></button>' + 
                        boutonMoins + 
                    '</div>'+
                '</article>';


            //affichage du panier sur le html
            document.getElementById("detailPanier").innerHTML += ligne;
            
            
            var quantiteTotale=localStorage.messageQtePanier;
            let recapTTL="";
            if(quantiteTotale>1){
                recapTTL=
                '<article class="row text-center">'+
                '<h2 class="col-12">Récapitulatif de votre commande</h2>'+
                '<div id="qteTotale" class="col-sm-6"><span>Votre panier contient <b>'+quantiteTotale + '</b> articles</span></div>'+
                '<div id="prixTotal" class="col-sm-6"><span>Le montant total de votre commande s\'élève à <b>'+ prixTotal/100 + '€</b></span></div>'+
                '</article>';
            }else{
                recapTTL=
                '<article class="row text-center">'+
                '<h2 class="col-12">Récapitulatif de votre commande</h2>'+
                '<div id="qteTotale" class="col-sm-6"><span>Votre panier contient <b>'+quantiteTotale + '</b> article</span></div>'+
                '<div id="prixTotal" class="col-sm-6"><span>Le montant total de votre commande s\'élève à <b>'+ prixTotal/100 + '€</b></span></div>'+
                '</article>';               
            }
                        
            document.getElementById("totauxPaniers").innerHTML = recapTTL;

        } 

        let partieContact =
        '<article class="row">'+
                    '<form name="formContact" onsubmit="return envoiCommande()" class="col-12">'+
                        '<div class="form-group row"><label class="col-12 col-sm-3">Nom*:</label><input type="text"  class="col-12 col-sm-9" name="nom" id="nom" pattern="^[A-Z\' ]+$" maxlenght="20" placeholder="Tout en MAJUSCULE !" required></div>'+
                        '<div class="form-group row"><label class="col-12 col-sm-3">Prénom*:</label><input type="text"  class="col-12 col-sm-9" name="prenom" id="prenom" pattern="^[A-ZÀÁÂÃÄÅÇÑñÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝ]{1}[a-zçàáâãäåçèéêëìíîïðòóôõöøùúûüýÿ]+$" maxlength="25" placeholder="1 majuscule au début..." required></div>'+
                        '<div class="form-group row"><label class="col-12 col-sm-3">Adresse*:</label><input type="text"  class="col-12 col-sm-9" name="adresse" id="adresse" placeholder="Votre adresse " maxlength="60" required></div>'+
                        '<div class="form-group row"><label class="col-12 col-sm-3">CP*:</label><input type="text"  class="col-12 col-sm-9" name="codePostal" id="codePostal" pattern="[0-9]{5}" maxlength="5" placeholder="5 chiffres !" required></div>'+
                        '<div class="form-group row"><label class="col-12 col-sm-3">Ville*:</label><input type="text"  class="col-12 col-sm-9" name="ville" id="ville" pattern="^[A-ZÀÁÂÃÄÅÇÑñÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝ\' -]+$" maxlength="30" placeholder="Tout en MAJUSCULE !"  required></div>'+
                        '<div class="form-group row"><label class="col-12 col-sm-3">Email*:</label><input type="email"  class="col-12 col-sm-9" name="mail" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" placeholder="Une adresse email !"required></div>'+
                        '<div id="inputContact" class="text-center">'+

                            '<input type="submit" value="Valider la commande">'+
                        '</div>'+
                    '</form>'+
                    '<p>* Tous les champs sont obligatoires!</p>'+
        '</article>';
    document.getElementById("contactClient").innerHTML = partieContact;
    }
