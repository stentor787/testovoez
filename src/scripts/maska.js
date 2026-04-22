import Inputmask from 'inputmask';

document.addEventListener('DOMContentLoaded', function() {
  const phoneInput = document.querySelector('.popup__field--phone .popup__field-input');
  
  if (phoneInput) {
    Inputmask({
      mask: '+7 (999) 999-99-99',
      showMaskOnHover: false,
      showMaskOnFocus: true,
      placeholder: "_",
      clearIncomplete: false,
      removeMaskOnSubmit: false,
      onBeforePaste: function(pastedValue) {
        return pastedValue.replace(/\D/g, '');
      }
    }).mask(phoneInput);
  }
});