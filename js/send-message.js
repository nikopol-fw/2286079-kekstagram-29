import { isEscapeKey } from './util.js';
import { onFormEsc } from './form.js';

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorMessageTemplate.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);
const successButton = successMessage.querySelector('.success__button');

/** Закрыть сообщение */
const closeMessage = () => {
  const message = document.querySelector('.error') || document.querySelector('.success');
  message.remove();
  document.removeEventListener('click', onBodyClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onFormEsc);
};

/** Показать сообщение */
const showMessage = (message, buttonMessage) => {
  document.body.append(message);
  buttonMessage.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onBodyClick);
  document.removeEventListener('keydown', onFormEsc);
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
    evt.target.closest('.success__inner') ||
    evt.target.closest('.error__inner')
  ) {
    return;
  }
  closeMessage();
}

const showSuccessMessage = () => showMessage(successMessage, successButton);
const showErrorMessage = () => showMessage(errorMessage, errorButton);

export { showErrorMessage, showSuccessMessage };
