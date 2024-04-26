const form = document.getElementById('subscribeForm');
const validationMessage = document.getElementById('validationMessage');
const emailInput = document.getElementById('emailInput');
const mainPage = document.getElementById('mainPage');
const thankPage = document.getElementById('thankPage');
const submittedEmail = document.getElementById('submittedEmail');
const dismissBtn = document.getElementById('dismissBtn');

function submitHandler(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const { email } = Object.fromEntries(formData);

  validationMessage.innerText = validateEmail(email);
  if (validationMessage.innerText) {
    emailInput.classList.add('email-error');
  } else {
    emailInput.classList.remove('email-error');
    submittedEmail.innerText = email;
    mainPage.classList.add('hidden');
    thankPage.classList.remove('hidden');
  }
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

function returnMain() {
  thankPage.classList.add('hidden');
  mainPage.classList.remove('hidden');
  emailInput.value = '';
}

form.addEventListener('submit', submitHandler);
dismissBtn.addEventListener('click', returnMain);
