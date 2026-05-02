document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      // Stop the form from actually submitting/refreshing the page
      e.preventDefault();
      const btn = document.querySelector('.signin-btn');
      btn.textContent = "Logging in...";
      btn.style.opacity = "0.7";
      btn.style.pointerEvents = "none";

      setTimeout(() => {
        window.location.href = './index.html';
      }, 1200);
    });
  }

  // Password Toggle Logic
  const togglePass = document.getElementById('togglePass');
  const passwordInput = document.getElementById('passwordInput');

  if (togglePass && passwordInput) {
    togglePass.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
    });
  }
});