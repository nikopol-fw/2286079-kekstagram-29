import { isEscapeKey } from './util.js';

const ONE_TIME_COMMENTS_LOADING = 5;

const CLASS_HIDDEN = 'hidden';
const CLASS_MODAL_OPEN = 'modal-open';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCountComments = bigPicture.querySelector('.comments-count');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsList = document.querySelector('.social__comments');
const commentItem = commentsList.querySelector('.social__comment');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.social__comments-loader');


let showCommentCount = 0;
let comments = [];

/** Закрывает полноэкр.просмотр фото */
const closeBigPicture = () => {
  bigPicture.classList.add(CLASS_HIDDEN);
  commentCount.classList.remove(CLASS_HIDDEN);
  commentsLoader.classList.remove(CLASS_HIDDEN);
  document.body.classList.remove(CLASS_MODAL_OPEN);
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureCloseButton.removeEventListener('click', onBigPictureCloseClick);
  commentsLoader.removeEventListener('click', onCommentsLoadingClick);
  showCommentCount = 0;
  comments = [];
};

/** Закрытие по кнопке Esc */
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

/** Закрытие по клику */
function onBigPictureCloseClick (evt) {
  evt.preventDefault();
  closeBigPicture();
}

/** Создает элементы-комментарии */
function createComment(data) {
  const comment = commentItem.cloneNode(true);
  comment.querySelector('.social__picture').src = data.avatar;
  comment.querySelector('.social__picture').alt = data.name;
  comment.querySelector('.social__text').textContent = data.message;
  return comment;
}

/** Отрисовывает комментарии */
const renderComments = () => {
  showCommentCount += ONE_TIME_COMMENTS_LOADING;
  if (comments.length <= showCommentCount) {
    commentsLoader.classList.add(CLASS_HIDDEN);
    commentCount.classList.add(CLASS_HIDDEN);
    showCommentCount = comments.length;
  } else {
    commentsLoader.classList.remove(CLASS_HIDDEN);
  }

  const fragment = document.createDocumentFragment();
  const currentCommentsCount = comments.slice(0, showCommentCount);
  currentCommentsCount.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  commentCount.innerHTML = `${showCommentCount} из <span class="comments-count">${comments.length}</span> комментариев</div>`;

  commentsList.innerHTML = '';
  commentsList.append(fragment);
  commentCount.classList.remove(CLASS_HIDDEN);
};

/** Создает элементы полноэкр. фото */
const createBigPictures = (data) => {
  bigPictureImage.src = data.url;
  likesCount.textContent = data.likes;
  bigPictureDescription.textContent = data.description;
  bigPictureCountComments.textContent = data.comments.lingth;
};

/** Загрузка доп.комментариев по клику */
function onCommentsLoadingClick() {
  renderComments();
}

/** Открывает полноэкр.просмотр фото */
const openBigPicture = (data) => {
  bigPicture.classList.remove(CLASS_HIDDEN);
  document.body.classList.add(CLASS_MODAL_OPEN);
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCloseButton.addEventListener('click', onBigPictureCloseClick);
  commentsLoader.addEventListener('click', onCommentsLoadingClick);
  createBigPictures(data);
  commentCount.classList.add(CLASS_HIDDEN);
  commentsLoader.classList.add(CLASS_HIDDEN);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
};

export { openBigPicture, CLASS_HIDDEN, CLASS_MODAL_OPEN };
