
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

const form = document.getElementById('emailForm');
const emailInput = document.getElementById('emailInput');
const submitButton = document.getElementById('submitButton');
const successMsg = document.getElementById('successMsg');
const errorMsg = document.getElementById('errorMsg');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  if (!email) return;

  successMsg.style.display = 'none';
  errorMsg.style.display = 'none';

  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';

  try {
    const formData = new FormData(form);

    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      form.style.display = 'none';
      successMsg.textContent = "You're in. We'll reach out when NextTouch goes live.";
      successMsg.style.display = 'block';
    } else {
      let message = 'Something went wrong. Please try again.';
      try {
        const data = await response.json();
        if (data && data.errors && data.errors.length) {
          message = data.errors.map(error => error.message).join(', ');
        }
      } catch (_) {}

      errorMsg.textContent = message;
      errorMsg.style.display = 'block';
      submitButton.disabled = false;
      submitButton.textContent = 'Notify me';
    }
  } catch (error) {
    errorMsg.textContent = 'Network error. Please try again.';
    errorMsg.style.display = 'block';
    submitButton.disabled = false;
    submitButton.textContent = 'Notify me';
  }
});