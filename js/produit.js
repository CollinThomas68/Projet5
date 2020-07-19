// Fonction permettant de récupérer l'id indiqué dans la barre d'adresse
function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}
var id = $_GET('id');

affichageNav();

//Récup des données de l'API basée sur l'id du produit chois sur l'accueil
ajaxGet(`http://localhost:3000/api/teddies/${id}`, function (reponse) {
    // Récupère le contenu en fonction de l'id de la page
    var teddy = JSON.parse(reponse);
    var teddyCouleurs= teddy.colors;


    var choixCouleurs="";
    for (let x in teddyCouleurs) {
        choixCouleurs += '<option value="' + teddyCouleurs[x] + '">' + teddyCouleurs[x] + '</option>';
    }

    
    var qteTeddy="";
    for (q=1;q<10;q++){
        qteTeddy+= '<option value="' + q + '">' + q + '</option>';
    }
    



    if(id==teddy._id){

        let produitChoisi = 
                                '<article>' +
                                    '<div class="text-center">'+
                                    '<h2>Bienvenue sur la page de '+teddy.name+'</h2>'+
                                    '</div>'+
                                    '<div>'+
                                        '<img src="'+teddy.imageUrl+'" alt="photo Teddy" class="detail">'+
                                    '</div>'+
                                    '<div class="affichageProduit">'+
                                        '<div>'+
                                            '<p>'+teddy.description+'</p>'+
                                            '<p>'+teddy.price / 100+'€</p>'+
                                            '<div>'+
                                                '<form onsubmit="return ajoutProduitPanier()">'+
                                                    '<label for="quantite">Quantité : </label><span class="espace"><select name="quantite" id="quantite">'+ qteTeddy + '</select></span>'+
                                                    '<label for="couleur">Couleur : </label><span class="espace"><select name="couleur" id="couleur">'+choixCouleurs+'</select></span>'+
                                                    '<input type="hidden" name="id" id="id" value="'+teddy._id+'">'+
                                                    '<input type="hidden" name="adresseHtml" id="adresseHtml" value="produit.html?id='+teddy._id+'">'+
                                                    '<input type="hidden" name="nom" id="nom" value="'+teddy.name+'">'+

                                                    //'<input type="hidden" name="quantite" id="quantite"value="1">'+
                                                    '<input type="hidden" name="description" id="description" value="'+teddy.description+'">'+
                                                    '<input type="hidden" name="prix" id="prix" value="'+teddy.price+'">'+
                                                    '<input type="hidden" name="image" id="image" value="'+teddy.imageUrl+'">'+
                                                    '<input type="submit" value="Ajout produit au panier"/>'+
                                                '</form>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</article>';
        
        
        let produitAffichage = document.getElementById('teddy');
        produitAffichage.innerHTML= produitChoisi;
    }


});
ajaxGet("http://localhost:3000/api/teddies", function (reponse) {
    // Transforme la réponse en un tableau d'articles
    var teddies = JSON.parse(reponse);
    
    console.log(teddies.length);
    console.log(teddies);
    console.log(id);
        for(var i=0;i<teddies.length;i++){
            if(id!=teddies[i]._id){
                let autresProduits='<div class=" col-8 col-xs-6 col-sm-6 col-md-4 col-lg-3">'+
                                        '<div class="card">'+
                                            '<a href="produit.html?id=' +teddies[i]._id+'">'+
                                                '<img class="card-img-top detail" src='+teddies[i].imageUrl+'  height="150" alt=”Photo Ours”>'+
                                                '<div class="card-body">'+
                                                    '<h3 class="card-title text-center">'+teddies[i].name+'</h3>'+
                                                '</div>'+
                                            '</a>'+
                                        '</div>'+
                                    '</div>';

            let autresTeddies = document.getElementById('lesautres');
            autresTeddies.innerHTML+= autresProduits;
            }

    }

});