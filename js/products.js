document.addEventListener("DOMContentLoaded", function (e){
    
    function showProductslist(array){
        let htmlContentToAppend = "";
        for (let product of array){
            
            htmlContentToAppend +- `
            <div class = "container">
            <div class = "row">
            <div class = "col-md-4">
            <div class = "card mb-4 box-shadow">
            <h3>` +product.name + `</h3>
            </div>
            </div>
            </div>
            </div>`
            
        }
    }
    getJSONData("https://japceibal.github.io/emercado-api/cats_products/").then (function (resultObj){
        if (resultObj.status === "ok"){
            
            productsArray = resultObj.data;

            console.log (showProductslist(productsArray));
        }else{
            console.log("Error al obtener los productos", resultObj.data);
        }
    })
})

/* document.getElementById("sortCostAsc").addEventListener("click", function () {
    productsArray =sortProducts (ORDER_ASC_BY_COST, productsArray);

    showProductslist(productsArray);
}) */