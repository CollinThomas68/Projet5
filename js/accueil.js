var teddiesElt = document.getElementById("teddies");
//affichage du panier en haut de page avec la quantité d'articles s'y trouvant
affichageNav();

ajaxGet("http://localhost:3000/api/teddies", function (reponse) {
    // Transforme la réponse en un tableau d'articles
    var teddies = JSON.parse(reponse);
    let selectionTeddies= document.getElementById('teddies');
    console.log(teddies.length);
        for(var i=0;i<teddies.length;i++){
            var teddy=teddies[i];
            let selectionProduits='<article>'+
                                    '<a href="produit.html?id=' + teddy._id+'" class="row">'+
                                        '<div class="col-sm-6">'+
                                            '<img src="'+teddy.imageUrl+'" class="imageListing" alt="Image '+teddy.name+'">'+
                                        '</div>'+
                                        '<div class="col-sm-6">'+
                                            '<h2>'+teddy.name+'</h2>'+
                                            '<p>'+teddy.description+'</p>'+
                                        '</div>'+    
                                    '</a>'+
                                '</article>';

            selectionTeddies.innerHTML+=selectionProduits;


    }

});