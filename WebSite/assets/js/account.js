/* =====================================================================
   KYRO — account.js
   Manejo del lado cliente del login y registro.
   La autenticación real se conectará luego a un backend; este código
   sólo valida los campos y muestra feedback visual.
   ===================================================================== */

(function () {
  "use strict";

  function setFeedback(el, message, type) {
    el.textContent = message;
    el.classList.remove("is-error", "is-success");
    if (type) el.classList.add("is-" + type);
  }

  function init() {
    var loginForm = document.getElementById("login-form");
    var registerForm = document.getElementById("register-form");

    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var fd = new FormData(loginForm);
        var email = (fd.get("email") || "").toString().trim();
        var password = (fd.get("password") || "").toString();
        var feedback = document.getElementById("login-feedback");

        if (!email || !password) {
          setFeedback(feedback, "Completá todos los campos.", "error");
          return;
        }
        // Punto de integración con backend:
        //   fetch('/api/login', { method: 'POST', body: JSON.stringify({email, password}) })
        //     .then(...).catch(...);
        setFeedback(feedback, "Inicio de sesión simulado correctamente.", "success");
      });
    }

    if (registerForm) {
      registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var fd = new FormData(registerForm);
        var username = (fd.get("username") || "").toString().trim();
        var email = (fd.get("email") || "").toString().trim();
        var password = (fd.get("password") || "").toString();
        var confirm = (fd.get("passwordConfirm") || "").toString();
        var terms = fd.get("terms");
        var feedback = document.getElementById("register-feedback");

        if (!username || !email || !password || !confirm) {
          setFeedback(feedback, "Faltan datos obligatorios.", "error");
          return;
        }
        if (password !== confirm) {
          setFeedback(feedback, "Las contraseñas no coinciden.", "error");
          return;
        }
        if (!terms) {
          setFeedback(feedback, "Tenés que aceptar los términos.", "error");
          return;
        }
        // Punto de integración con backend: POST /api/register
        setFeedback(feedback, "Cuenta creada (simulado). Revisá tu correo.", "success");
      });
    }
  }

  window.KYROAccount = { init: init };
})();
