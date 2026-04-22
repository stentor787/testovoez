const selectField = document.getElementById('contactSelect');
const input = selectField.querySelector('.value');
const options = selectField.querySelectorAll('.popup__select-options li');


selectField.addEventListener('click', (e) => {
  if (!e.target.matches('li')) {
    selectField.classList.toggle('active');
  }
});

options.forEach(option => {
  option.addEventListener('click', (e) => {
    input.value = e.target.textContent;   
    selectField.classList.remove('active'); 
  });
});

document.addEventListener('click', (e) => {
  if (!selectField.contains(e.target)) {
    selectField.classList.remove('active');
  }
});