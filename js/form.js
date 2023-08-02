import { CLASS_HIDDEN, CLASS_MODAL_OPEN } from './big-pictures.js';
import { isEscapeKey } from './util.js';
import { scaleReset, initScale } from './scale.js';
import { effectsReset, initEffect } from './effect.js';

const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_AMOUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const IMAGE_TYPES = ['image/jpeg', 'image/gif', 'image/png'];

const errorText = {
  validTagSymbol: 'Содержит недопустимые символы',
  validTagCount: `Допустимо не более ${MAX_HASHTAG_AMOUNT} хэштегов`,
  validTagUnique: 'Хэштег не должен повторяться',
};

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...',
};

const form = document.querySelector('.img-upload__form');
const fileField = form.querySelector('#upload-file');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const hashtag = form.querySelector('.text__hashtags');
const comment = form.querySelector('.text__description');
const submitButton = form.querySelector('#upload-submit');
const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
const effectsPreview = document.querySelectorAll('.effects__preview');
const fileChooser = document.querySelector('.img-upload__input[type=file]');

let pristine;

/** Валидация длины комментария */
const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

/** Валидация хэштега */
const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => !!tag.length);

const isValidHashtag = (value) => normalizeTags(value).every((tag) => HASHTAG_REGEXP.test(tag));

const isValidHashtagCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_AMOUNT;

const isValidHashtagUnique = (value) => {
  const lowerCaseTag = normalizeTags(value).map((tag) =>
    tag.toLowerCase());
  return lowerCaseTag.length === new Set(lowerCaseTag).size;
};

/** Закрывает форму редактирования изображения */
const closeForm = () => {
  overlay.classList.add(CLASS_HIDDEN);
  document.body.classList.remove(CLASS_MODAL_OPEN);
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButton.removeEventListener('click', onCancelButtonClick);
  form.reset();
  pristine.reset();
  scaleReset();
  effectsReset();
};

/** Закрытие по кнопке Esc */
const isTextFieldFocused = () =>
  document.activeElement === hashtag ||
  document.activeElement === comment;

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && ! isTextFieldFocused()) {
    evt.preventDefault();
    closeForm();
  }
}

/** Закрытие по клику на кнопку*/
function onCancelButtonClick (evt) {
  evt.preventDefault();
  closeForm();
}

/**Блокировка кнопки отправки */
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

/** Показывает форму редактирования изображения */
const openForm = () => {
  overlay.classList.remove(CLASS_HIDDEN);
  document.body.classList.add(CLASS_MODAL_OPEN);
  document.addEventListener('keydown', onDocumentKeydown);
  cancelButton.addEventListener('click', onCancelButtonClick);
};

const onFormChange = () => openForm();

/** Валидация типа файла */
const validateFileImage = () => {
  const file = fileChooser.files[0];

  const matches = IMAGE_TYPES.some((it) => it === file.type);
  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
    effectsPreview.forEach((effect) => {
      effect.style.backgroundImage = `url('${imagePreview.src}')`;
      openForm();
    });
  }
};

const onFileInputChange = () => validateFileImage();

const setFormSubmit = (cb) => {
  pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
  });
  pristine.addValidator(comment, validateComment);
  pristine.addValidator(hashtag, isValidHashtag, errorText.validTagSymbol);
  pristine.addValidator(hashtag, isValidHashtagCount, errorText.validTagCount);
  pristine.addValidator(hashtag, isValidHashtagUnique, errorText.validTagUnique);
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(form));
      unblockSubmitButton();
    }
  });
  fileField.addEventListener('change', onFormChange);
  fileField.addEventListener('change', onFileInputChange);
  initEffect();
  initScale();
};

export { setFormSubmit, closeForm, onDocumentKeydown as onFormEsc };
