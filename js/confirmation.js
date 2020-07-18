
if (localStorage.confirmationCommande !== "") {


    document.getElementById("confirmation").innerHTML =
        '<article class="text-center">'+
            '<p>Votre commande n° ' + localStorage.confirmationCommande + ' a bien été prise en compte pour un montant total de '+localStorage.messagePrixPanier/100+' €</p>'+

            '<p>Merci encore pour votre commande</p>'+
            '<p><a href="orinoco.html">Retour à l\'accueil</a></p>'+
        '</article>';
} else {
    document.getElementById("confirmation").innerHTML =
        '<article class="text-center">'+
            '<p>Un problème technique vient de survenir, merci de réitérer votre commande dans quelques instants</p>'+
            '<p><a href="orinoco.html">Retour à l\'accueil</a></p>'+
        '</article>';
}
