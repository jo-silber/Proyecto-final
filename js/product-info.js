document.addEventListener('DOMContentLoaded', function (e){
    let productID = "50742";
    let productsArray = [];

    let url =  PRODUCT_INFO_URL + productID + EXT_TYPE //url para obetener la informacion del producto

    getJSONData(url).then(function (resultObj) {
        if(resultObj.status === "ok"){
            productsArray = resultObj.data.products;

            showInfoProducto(productsArray);
        } else {
            console.error("No se encontró ningún catID en el almacenamiento local.");
        }

        function showInfoProducto(productsArray){
            let htmlContentToAppend = "";
            for (let products of productsArray) {
        
                htmlContentToAppend += `
                 <div class="col-md-4">
                        <div class="card mb-4 shadow-sm">
                            <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                            <div class="card-body">
                                <h5 class="card-title">${products.name}</h5>
                                <p class="card-text">${products.description}</p>
                                <p class="text-muted">${products.cost} ${products.currency}</p>
                            </div>
                        </div>
                    </div>
                `;
                    }
        
                    document.getElementById("container").innerHTML = htmlContentToAppend;
                }
            })
        
}); 