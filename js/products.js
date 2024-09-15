document.addEventListener("DOMContentLoaded", function(e){
    let catID = localStorage.getItem("catID");
  
    if (catID) {
        let productsURL = `https://japceibal.github.io/emercado-api/products/${catID}.json`;
  
        let productsArray = [];

        getJSONData(productsURL).then(function(resultObj){
            if (resultObj.status === "ok"){
                productsArray = resultObj.data;
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

//boton que limpia el filtro
document.getElementById('limpiarFiltro').addEventListener('click', () =>{
    document.getElementById('precioMin').value = "";
    document.getElementById('precioMax').value = "";
    showProductsList(productsArray); //vuelve a mostrar todos los productos sin el filtro aplicado
});


//buscar productos en tiempo real
            let searchInput = document.getElementById('searchInput');
            searchInput.addEventListener('input', function () {
                let searchTerm = searchInput.value.toLowerCase();
                let productosFiltrados = productsArray.filter(product => {
                    return product.name.toLowerCase().includes(searchTerm) ;
                });
                showProductsList(productosFiltrados);
            });
            }
        });
    } else {
        console.error("No se encontró ningún catID en el almacenamiento local.");
    }
  
  
  function getJSONData(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            return { status: "ok", data: data };
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            return { status: "error", data: error };
        });
  }
  
  function showProductsList(productsArray) {

    let htmlContentToAppend = "";
  
    for (let i = 0; i < productsArray.length; i++) {
        let product = productsArray[i];
  
        htmlContentToAppend += `
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <img src="${product.imgSrc}" alt="${product.description}" class="img-thumbnail">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="text-muted">${product.cost} ${product.currency}</p>
                    </div>
                </div>
            </div>
        `;
    }

    document.getElementById("container").innerHTML = htmlContentToAppend;
  }

});

