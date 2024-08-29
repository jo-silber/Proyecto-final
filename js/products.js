document.addEventListener('DOMContentLoaded', function (e) {

    let categoryId = 101;
    let urlWithCategory = PRODUCTS_URL + categoryId + EXT_TYPE; // declaramos estas variables ya que el URL esta incompleto, y hay que llenarlo con la categoria que necesitamos.


    getJSONData(urlWithCategory).then(function (resultObj) {
        if (resultObj.status === "ok") {
            let productsArray = resultObj.data.products;
            console.log(productsArray);
            showProductsList(productsArray);
        } else { console.log("Error de productos"); }

    });
});

function showProductsList(array) {
    let htmlContentToAppend = "";
    for (let products of array) {

        htmlContentToAppend += `
         <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <img src="${products.image}" class="bd-placeholder-img card-img-top" alt="${products.name}">
                    <div class="card-body">
                        <h5 class="card-title">${products.name}</h5>
                        <p class="card-text">${products.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">${products.currency} ${products.cost}</small>
                            <small class="text-muted">Vendidos: ${products.soldCount}</small>
                        </div>
                    </div>
                </div>
            </div>`;
        container.innerHTML = htmlContentToAppend;
    }
}
