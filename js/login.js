document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;

    if (usuario === "" || contraseña === "") {
      alert("Por favor, completa todos los campos.");
    } else {
      iniciarSesion(usuario);
      window.location.href = "index.html";
    }
  });

function iniciarSesion(usuario) {
  localStorage.setItem("usuarioAutenticado", "true");
  localStorage.setItem("nombreUsuario", usuario);
}
