const form = document.getElementById('subscribeForm');
const validationMessage = document.getElementById('validationMessage');

function submitHandler(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const { email } = Object.fromEntries(formData);

  validationMessage.innerText = validateEmail(email);
  console.log(email);
}

function validateEmail(mail) {
  if (!mail) {
    return 'Email is required';
  }

  if (!/\S+@\S+\.\S+/.test(mail)) {
    return 'Please enter a valid email';
  }
  return '';
}

form.addEventListener('submit', submitHandler);
