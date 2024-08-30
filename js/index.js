document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("catID", 101);
    window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("catID", 102);
    window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("catID", 103);
    window.location = "products.html";
  });
});
function verificarLoginYMostrarAlerta() {
    var usuarioAutenticado = localStorage.getItem("usuarioAutenticado");
    if (usuarioAutenticado !== "true") {
      alert("No has iniciado sesión!!");
      window.location.href = "login.html";
    }
  }
  function mostrarNombreUsuarioEnNav() {
    var nombreUsuario = localStorage.getItem("nombreUsuario");
  
    if (nombreUsuario) {
      var usuarioNavItem = document.createElement("li");
      usuarioNavItem.className = "nav-item";
  
      var usuarioLink = document.createElement("a");
      usuarioLink.className = "nav-link";
      usuarioLink.href = "#";
      usuarioLink.textContent = nombreUsuario;
  
      usuarioNavItem.appendChild(usuarioLink);
      document.querySelector(".navbar-nav").appendChild(usuarioNavItem);
    }
  }
  
  window.onload = function () {
    verificarLoginYMostrarAlerta();
    mostrarNombreUsuarioEnNav();
  };
