const share = document.getElementById('share');
const socialicons = document.getElementById('socialicons');
const socialiconslink = document.getElementById('socialiconslink');
const profile = document.getElementById('profile');

function toggleShare(e) {
  e.currentTarget.parentElement.classList.add('hidden');
  socialicons.classList.remove('hidden');
}

function toggleProfile(e) {
  e.currentTarget.parentElement.classList.add('hidden');
  profile.classList.remove('hidden');
}

share.addEventListener('click', toggleShare);
socialiconslink.addEventListener('click', toggleProfile);
