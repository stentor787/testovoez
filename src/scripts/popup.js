const btnOpen = document.querySelector('.header__btn');
const popup = document.getElementById('popupForm');
const btnClose = popup.querySelector('.popup__close');
const backdrop = popup.querySelector('.popup__backdrop');

btnOpen.addEventListener('click', () => {
  popup.classList.add('popup--active');
});

btnClose.addEventListener('click', () => {
  popup.classList.remove('popup--active');
});

backdrop.addEventListener('click', () => {
  popup.classList.remove('popup--active');
});


