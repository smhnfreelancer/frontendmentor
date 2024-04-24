const shareButton = document.getElementById('share');
const socialIcons = document.getElementById('socialicons');
const socialIconsLink = document.getElementById('socialiconslink');
const profileSection = document.getElementById('profile');
const socialIconsFloat = document.getElementById('socialiconsfloat');

function toggleShare(e) {
  console.log(window.innerWidth);
  if (window.innerWidth < 768) {
    e.currentTarget.parentElement.parentElement.classList.add('hidden');
    socialIcons.classList.remove('hidden');
  } else {
    if (socialIconsFloat.classList.contains('hidden')) {
      socialIconsFloat.classList.remove('hidden');
      shareButton.querySelector('div').classList.remove('bg-LightGrayishBlue');
      shareButton.querySelector('div').classList.add('bg-DesaturatedDarkBlue');
      shareButton
        .querySelector('div')
        .querySelector('img')
        .setAttribute('src', './images/icon-share2.svg');
    } else {
      socialIconsFloat.classList.add('hidden');
      shareButton
        .querySelector('div')
        .classList.remove('bg-DesaturatedDarkBlue');
      shareButton.querySelector('div').classList.add('bg-LightGrayishBlue');
      shareButton
        .querySelector('div')
        .querySelector('img')
        .setAttribute('src', './images/icon-share.svg');
    }
  }
}

function toggleProfile(e) {
  e.currentTarget.parentElement.classList.add('hidden');
  profileSection.classList.remove('hidden');
}

shareButton.addEventListener('click', toggleShare);
socialIconsLink.addEventListener('click', toggleProfile);
