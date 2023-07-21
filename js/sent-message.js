import { isEscapeKey } from './util.js';

const errorMessageTemplate = document.querySelector('#error')
  .content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success')
  .content.querySelector('.success');

let errorMessage;
let successMessage;

/** Закрыть сообщение об ошибке */
const closeErrorMessage = () => {
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onErrorDocumentClick);
  errorMessage.addEventListener('click', onCloseErrorMessageClick);
};

/** Закрыть сообщение об отправке */
const closeSuccessMessage = () => {
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onSuccessDocumentClick);
  successMessage.addEventListener('click', onCloseSuccessMessageClick);
};

/** Показать сообщение об ошибке */
const showErrorMessage = () => {
  errorMessage = errorMessageTemplate.cloneNode(true);
  document.body.append(errorMessage);
  closeErrorMessage();
};

/** Показать сообщение об отправке */
const showSuccessMessage = () => {
  successMessage = successMessageTemplate.cloneNode(true);
  document.body.append(successMessage);
  closeSuccessMessage();
};

/** Закрытие по Escape */
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (errorMessage) {
      closeErrorMessage();
      return;
    }
    closeSuccessMessage();
  }
}

/** Закрытие по клику */
function onCloseSuccessMessageClick(evt) {
  if (!evt.target.classList.conains('.success__button')) {
    closeSuccessMessage();
  }
}

function onSuccessDocumentClick(evt) {
  if (!evt.target.classList.conains('.success__inner')) {
    closeErrorMessage();
  }
}

/** Закрытие по по клику на произвольную область */
function onCloseErrorMessageClick(evt) {
  if (!evt.target.classList.conains('.error__button')) {
    closeErrorMessage();
  }
}

function onErrorDocumentClick(evt) {
  if (!evt.target.classList.conains('.error__inner')) {
    closeErrorMessage();
  }
}

export { showErrorMessage, showSuccessMessage};
