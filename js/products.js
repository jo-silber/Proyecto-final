document.addEventListener("DOMContentLoaded", function(e){
    let catID = localStorage.getItem("catID");
  
    if (catID) {
        let productsURL = `https://japceibal.github.io/emercado-api/products/${catID}.json`;
  
        getJSONData(productsURL).then(function(resultObj){
            if (resultObj.status === "ok"){
                let productsArray = resultObj.data;
                showProductsList(productsArray);
            }
        });
    } else {
        console.error("No se encontró ningún catID en el almacenamiento local.");
    }
  });
  
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