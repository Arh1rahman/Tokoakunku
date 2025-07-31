// Data user dummy
const akun = {
  email: "rapirapi68@gmail.com",
  password: "annisaSun1"
};

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-login");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (email === akun.email && password === akun.password) {
        alert("Login berhasil!");
        window.location.href = "daftarakun.html"; // Redirect ke halaman akun
      } else {
        alert("Email atau password salah!");
      }
    });
  }
});
