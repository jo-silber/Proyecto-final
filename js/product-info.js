

document.addEventListener('DOMContentLoaded', function (e){
    let productID = localStorage.getItem("productID");
    let productsArray = [];

    let url =  PRODUCT_INFO_URL + productID + EXT_TYPE //url para obetener la informacion del producto

    getJSONData(url).then(function (resultObj) {
        if(resultObj.status === "ok"){
            products = resultObj.data;
        

            showInfoProducto(productsArray);
        } else {
            console.error("No se encontró ningún catID en el almacenamiento local.");
        }

        function showInfoProducto(productsArray){
            console.log(products);

            let htmlContentToAppend = "";
            
         

                htmlContentToAppend += `
                <p><strong>Categoria:</strong> ${products.category}</p> 
            <div class="col-md-6">
           <div class="product-images">`;

            for (let i = 0; i < products.images.length; i++) {
                let imageSrc = products.images[i]; 
                htmlContentToAppend += `
                    <img src="${imageSrc}" alt="Imagen del producto" class="img-thumbnail"/ >  `;
            }

           


             htmlContentToAppend += `
                <h1>${products.name}</h1>
                <p> <strong id="sold-count"> ${products.soldCount} Vendidos </strong> </p>
                <p><strong id="product-price">${products.currency} ${products.cost}</strong> </p>
                <p> ${products.description}</p>
            </div> </div> </div>`;
            

            document.getElementById('product-info').innerHTML = htmlContentToAppend;
            
        }
    })
})
