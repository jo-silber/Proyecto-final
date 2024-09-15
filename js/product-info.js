document.addEventListener('DOMContentLoaded', function (e){
    let productID = localStorage.getItem("catID");
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
            console.log(productsArray);

            let htmlContentToAppend = "";
            
            for(let i = 0; i < productsArray.length; i++){
                let product = productsArray[i];

                htmlContentToAppend += `
                <p><strong>Categoria:</strong> ${product.category}</p> 
            <div class="col-md-6">
                <h1>${product.name}</h1>
                <p> <strong id="sold-count"> ${product.soldCount} Vendidos </strong> </p>
                <p><strong id="product-price">${product.currency} ${product.cost}</strong> </p>
                <p> ${product.description}</p>
            </div>`;
            }

            document.getElementById('product-info').innerHTML = htmlContentToAppend;
            
        }
    })
})