document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    //evitar que se envie automaticamente
    event.preventDefault();

    //obtener valores de los campos
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;

    //validar que no esten vacios
    if (usuario === "" || contraseña === "") {
      alert("Por favor, completa todos los campos.");
    } else {
      //guardar inicio de sesion
      iniciarSesion();
      //redirigir a la pagina principal
      window.location.href = "index.html";
    }
  });
function iniciarSesion() {
  localStorage.setItem("usuarioAutenticado", "true");
}