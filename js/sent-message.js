import { isEscapeKey } from './util.js';

const errorMessageTemplate = document.querySelector('#error')
  .content.querySelector('.error');
const errorMessage = errorMessageTemplate.cloneNode(true);
const error = document.querySelector('.error');
const errorButton = document.querySelector('.error__button');

const successMessageTemplate = document.querySelector('#success')
  .content.querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);
const success = document.querySelector('.success');
const successButton = document.querySelector('.success__button');

/** Закрыть сообщение */
const closeMessage = () => {
  const message = error || success;
  message.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
};

/** Показать сообщение */
const showMessage = (message, buttonMessage) => {
  document.body.append(message);
  buttonMessage.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.addEventListener('click', onBodyClick);
};

/** Закрытие по Escape */
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

/** Закрытие по по клику на произвольную область */
function onBodyClick(evt) {
  if (
    !evt.target.classList.conains('.success__inner') ||
    !evt.target.classList.conains('.error__inner')
  ) {
    return;
  }
  closeMessage();
}

const showSuccessMessage = () => showMessage(successMessage, successButton);
const showErrorMessage = () => showMessage(errorMessage, errorButton);

export { showErrorMessage, showSuccessMessage};
