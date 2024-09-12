document.addEventListener('DOMContentLoaded', function (e) {

    let categoryId = 101;
    let urlWithCategory = PRODUCTS_URL + categoryId + EXT_TYPE; // declaramos estas variables ya que el URL esta incompleto, y hay que llenarlo con la categoria que necesitamos.

    let productsArray = [];

    getJSONData(urlWithCategory).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data.products;
            console.log(productsArray);
            showProductsList(productsArray);
        
        /* === FILTROS === */
/* por precio */
document.getElementById('filtrarPrecio').addEventListener('click', () =>{
    let precioMin = parseFloat(document.getElementById('precioMin').value);
    let precioMax = parseFloat(document.getElementById('precioMax').value);

    let productosFiltrados = productsArray.filter(product => {
        // verifico si lo que esta ingresando es un numero
    let precioMinEsValido = true;
    if(!isNaN(precioMin)){
       precioMinEsValido = product.cost >= precioMin;
    }

    let precioMaxEsValido = true;
    if(!isNaN(precioMax)){
        precioMaxEsValido = product.cost <= precioMax;
    }

    //devuelve true si cumple con ambos filtros
    return precioMinEsValido && precioMaxEsValido;
    });

    showProductsList(productosFiltrados);

})

//boton que limpia el filtro
document.getElementById('limpiarFiltro').addEventListener('click', () =>{
    document.getElementById('precioMin').value = "";
    document.getElementById('precioMax').value = "";
    showProductsList(productsArray); //vuelve a mostrar todos los productos sin el filtro aplicado
});

//ordenar por precio ascendente
document.getElementById('filtrarPrecioAsc').addEventListener('click', ()=>{
    let filtrarProductos = [...productsArray].sort((a, b) => a.cost - b.cost);
    console.log(filtrarProductos);
    
    showProductsList(filtrarProductos)
})

//ordenar por precio descendiente
document.getElementById('filtrarPrecioDesc').addEventListener('click', () =>{
    let filtrarProductos = [...productsArray].sort((a, b) => b.cost - a.cost);
    console.log(filtrarProductos);
    showProductsList(filtrarProductos);
})

//filtrar por relevancia
document.getElementById('filtrarPorRelevancia').addEventListener('click', ()=>{
    let filtrarProductos = [...productsArray].sort((a, b) => b.soldCount - a.soldCount);
    console.log(filtrarProductos);
    showProductsList(filtrarProductos);
    
})


} else { console.log("Error de productos"); }

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



});
