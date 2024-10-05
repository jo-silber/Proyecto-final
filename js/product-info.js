function setProductId(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
}

document.addEventListener("DOMContentLoaded", function (e) {
  let productID = localStorage.getItem("productID");
  let products = [];
  let comments = [];

  let url = PRODUCT_INFO_URL + productID + EXT_TYPE; //url para obetener la informacion del producto
  let urlComentarios = PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE; //url para obtener los comentarios del producto



  getJSONData(url).then(function (resultObj) {
    if (resultObj.status === "ok") {
      products = resultObj.data;

      showInfoProducto(products);
    } else {
      console.error(
        "No se encontró ningún productID en el almacenamiento local."
      );
    }

    function showInfoProducto(products) {
      console.log(products);

      let htmlContentToAppend = "";

      htmlContentToAppend += `
                <div class="row">
            <div class="col-md-6" style="margin-top:50px;">
           <div class="product-images">`;

      for (let i = 0; i < products.images.length; i++) {
        let imageSrc = products.images[i];
        htmlContentToAppend += `
                    <img id="imgInfo" src="${imageSrc}" alt="Imagen del producto" / >  `;
      }

      htmlContentToAppend += ` </div> </div><div id="prodDes"class="col-md-6">
                <h1 class="prodName">${products.name}</h1>
                <p><strong>Descripción: </strong> ${products.description}</p>
                <p><strong id="product-price">Precio:</strong>${products.currency} ${products.cost}</p>
                <p> <strong id="sold-count">Vendidos: </strong> ${products.soldCount}  </p>
                <p><strong>Categoria:</strong> ${products.category}</p>
            </div> </div> </div> `;


      // productos relacionados
      htmlContentToAppend += `
        <div class="row mt-5">
            <h2>Productos Relacionados</h2>
        </div>
        <div class="row" id="related-products">`;

      for (let i = 0; i < products.relatedProducts.length; i++) {
        let relatedProduct = products.relatedProducts[i];
        htmlContentToAppend += `
            <div class="col-md-3">
                <div class="card mb-3">
                    <img src="${relatedProduct.image}" ">
                    <div class="card-body">
                        <h5 >${relatedProduct.name}</h5>
                        <button onclick="setProductId(${relatedProduct.id})"  class="btn btn-primary">Ver producto</button>
                    </div>
                </div>
            </div> `;

      }

      htmlContentToAppend += `</div>`;


      document.getElementById("product-info").innerHTML = htmlContentToAppend;
    }
  });

  getJSONData(urlComentarios).then(function (resultObj) {
    if (resultObj.status === "ok") {
      comments = resultObj.data;

      showComments(comments);
    } else {
      console.error(
        "No se encontro el productID"
      );
    }

    function showComments(comments) {
      console.log(comments);

      let htmlCommentsToAppend = `
      <div class="album py-5 bg-light">
      <div class="container">
      <div class="row">`;

      //hay que hacerlo en partes separadas ya que el for crea una linea nueva cada vez que se lee, de esta manera solo se crea la tarjeta
      for (let i = 0; i < comments.length; i++) {
        let comment = comments[i];
        htmlCommentsToAppend += `
        <div class="col-md-4">
        <div class="card mb-4 box-shadow">
        <div class="card-body">
        <img class="rounded-circle shadow-1-strong me-3"
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp" alt="avatar" width="65"
                height="65" />
        <h5 class="card-title">${comment.user}</h5>
        <p class="card-text">${comment.description}</p>
        <p class="card-text text-muted">${comment.dateTime}</p>
        <p>${comment.score}</p>
        </div>
        </div>
        </div>`;
      }
      htmlCommentsToAppend += `
      </div> 
    </div> 
  </div> 
`;
      console.log(htmlCommentsToAppend);

      document.getElementById("comentariosID").innerHTML = htmlCommentsToAppend;

    }
  });
});
