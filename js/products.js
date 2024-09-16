document.addEventListener("DOMContentLoaded", function (e) {
    let catID = localStorage.getItem("catID");


    if (catID) {
        let productsURL = PRODUCTS_URL + catID + EXT_TYPE;
        let productsArray = [];
        getJSONData(productsURL).then(function (resultObj) {


            if (resultObj.status === "ok") {
                productsArray = resultObj.data.products; //tenemos que identificar en que parte del array vamos a trabajar ya que es un array de clave


                showProductsList(productsArray);


                // ==== FILTROS ====
                // == por precio ==
                document.getElementById('filtrarPrecio').addEventListener('click', () => {
                    let precioMin = parseInt(document.getElementById('precioMin').value);
                    let precioMax = parseInt(document.getElementById('precioMax').value);

                    filtrar(productsArray, precioMin, precioMax)
                });

                function filtrar(arrayOrdenar, precioMin, precioMax) {
                    let productosFiltrados = arrayOrdenar.filter(product => {

                        //verificar si lo que se ingreso es un numero
                        let precioMinEsValido = true;
                        if (!isNaN(precioMin)) {
                            precioMinEsValido = product.cost >= precioMin; //se vuelve true o false dependiendo de lo que vale el producto
                        }
                        let precioMaxEsValido = true;
                        if (!isNaN(precioMin)) {
                            precioMaxEsValido = product.cost <= precioMax; //se vuelve true o false dependiendo de lo que vale el producto
                        }


                        //si cumple ambos filtros
                        return precioMinEsValido && precioMaxEsValido;
                    });
                
                showProductsList(productosFiltrados)
            };
                // == precio ascendiente ==
                document.getElementById('filtrarPrecioAsc').addEventListener('click', () => {
                    let filtrarProductos = [...productsArray].sort((a, b) => a.cost - b.cost);
                    console.log(filtrarProductos);

                    showProductsList(filtrarProductos)
                })

                // == precios descendiente ==
                document.getElementById('filtrarPrecioDesc').addEventListener('click', () => {
                    let filtrarProductos = [...productsArray].sort((a, b) => b.cost - a.cost);
                    console.log(filtrarProductos);
                    showProductsList(filtrarProductos);
                })
                // == filtrar por relevancia ==
                document.getElementById('filtrarPorRelevancia').addEventListener('click', () => {
                    let filtrarProductos = [...productsArray].sort((a, b) => b.soldCount - a.soldCount);
                    console.log(filtrarProductos);
                    showProductsList(filtrarProductos);
                })
                // == boton de limpiar el filtro ==
                document.getElementById('limpiarFiltro').addEventListener('click', () => {
                    document.getElementById('precioMin').value = "";
                    document.getElementById('precioMax').value = "";
                    showProductsList(productsArray); //vuelve a mostrar todos los productos sin el filtro aplicado
                });
                //buscar productos en tiempo real
                let searchInput = document.getElementById('searchInput');
                searchInput.addEventListener('input', function () {
                    let searchTerm = searchInput.value.toLowerCase();
                    let productosFiltrados = productsArray.filter(product => {
                        return product.name.toLowerCase().includes(searchTerm);
                    });
                    showProductsList(productosFiltrados);
                });

            } else {
                console.error("No se encontró ningún catID en el almacenamiento local.");
            }
        })
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
            console.log(productsArray);

            let htmlContentToAppend = "";
            console.log(htmlContentToAppend);

            for (let i = 0; i < productsArray.length; i++) {
                let product = productsArray[i];


                htmlContentToAppend += `
            <div class="col-md-4">
=======
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

} else { console.log("Error de productos"); }

    });


function showProductsList(array) {
    let htmlContentToAppend = "";
    for (let products of array) {

        htmlContentToAppend += `
         <div class="col-md-4">

                <div class="card mb-4 shadow-sm">
                    <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
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
    }
    }); 
