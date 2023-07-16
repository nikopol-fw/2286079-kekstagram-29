import { classHidden, classModalOpen } from './big-pictures.js';
import {isEscapeKey} from './util.js';

const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_AMOUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const body = document.body;
const form = document.querySelector('.img-upload__form');
const fileField = form.querySelector('#upload-file');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const hashtag = form.querySelector('.text__hashtags');
const comment = form.querySelector('.text__description');


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

/** Валидация длины комментария */
const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;
pristine.addValidator(comment, validateComment);

/** Валидация хэштега */
const isValidHashtag = (tag) => HASHTAG_REGEXP.test(tag);
const isValidHashtagCount = (tags) => tags.length <= MAX_HASHTAG_AMOUNT;
const isValidHashtagUnique = (tags) => tags.include(hashtag);

pristine.addValidator(hashtag, isValidHashtag, 'Содержит недопустимые символы');
pristine.addValidator(hashtag, isValidHashtagCount, `Допустимо не более ${MAX_HASHTAG_AMOUNT} хэштегов`);
pristine.addValidator(hashtag, isValidHashtagUnique, 'Хэштег не должен повторяться');

/** Закрывает форму редактирования изображения */
const closeForm = () => {
  overlay.classList.add(classHidden);
  body.classList.remove(classModalOpen);
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButton.removeEventListener('click', onCancelButtonClick);
  form.reset();
  pristine.reset();
};

/** Закрытие по кнопке Esc */
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

/** Закрытие по клику на кнопку*/
function onCancelButtonClick (evt) {
  evt.preventDefault();
  closeForm();
}

/** Валидация при отправке формы */
function onFormSubmit (evt) {
  evt.preventDefault();
  pristine.validate();
}

/** Показывает форму редактирования изображения */
const openForm = () => {
  overlay.classList.remove(classHidden);
  body.classList.add(classModalOpen);
  document.addEventListener('keydown', onDocumentKeydown);
  cancelButton.addEventListener('click', onCancelButtonClick);
};

const onFormChange = () => openForm();


const getFormActive = () => {
  form.addEventListener('submit', onFormSubmit);
  fileField.addEventListener('change', onFormChange);
};

export {getFormActive};
