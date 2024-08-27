document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});
function verificarLoginYMostarAlerta(){
    var usuarioAutenticado = localStorage.getItem("usuarioAutenticado");
    if(usuarioAutenticado !== "true"){
        alert("No has iniciado sesión!!");
        window.location.href = "login.html";
    }
}
window.onload = function(){
    verificarLoginYMostarAlerta();
}