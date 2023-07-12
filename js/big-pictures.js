import {isEscapeKey} from './util.js';

const ONE_TIME_COMMENTS_LOADING = 5;

const bigPicture = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentItem = commentsList.querySelector('.social__comment');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.social__comments-loader');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

let showCommentCount = 0;
let comments = [];

/**Закрывает полноэкр.просмотр фото */
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  commentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureCloseButton.removeEventListener('click', onBigPictureCloseClick);
  commentsLoader.removeEventListener('click', onCommentsLoadingClick);
  showCommentCount = 0;
  comments = [];
};

/**Закрытие по кнопке Esc */
function onDocumentKeydown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

/**Закрытие по клику */
function onBigPictureCloseClick (evt) {
  evt.preventDefault();
  closeBigPicture();
}

/**Создает элементы-комментарии */
function createComment(data) {
  const comment = commentItem.cloneNode(true);
  comment.querySelector('.social__picture').src = data.avatar;
  comment.querySelector('.social__picture').alt = data.name;
  comment.querySelector('.social__text').textContent = data.message;
  return comment;
}

/**Отрисовывает комментарии */
const renderComments = () => {
  showCommentCount += ONE_TIME_COMMENTS_LOADING;
  if(comments.length <= showCommentCount) {
    commentsLoader.classList.add('hidden');
    commentCount.classList.add('hidden');
    showCommentCount = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for(let i = 0; i < showCommentCount; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentCount.innerHTML = `${showCommentCount} из <span class="comments-count">${comments.length}</span> комментариев</div>`;

  commentsList.innerHTML = '';
  commentsList.append(fragment);
  commentCount.classList.remove('hidden');
};

/**Создает элементы полноэкр. фото */
const createBigPictures = (data) => {
  bigPicture.querySelector('.big-picture__img img').src = data.url;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.social__caption').textContent = data.description;
  bigPicture.querySelector('.comments-count').textContent = data.comments.lingth;
};

/**Загрузка доп.комментариев по клику */
function onCommentsLoadingClick() {
  renderComments();
}

/**Открывает полноэкр.просмотр фото */
const openBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCloseButton.addEventListener('click', onBigPictureCloseClick);
  commentsLoader.addEventListener('click', onCommentsLoadingClick);
  createBigPictures(data);
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  comments = data.comments;
  if(comments.length > 0) {
    renderComments();
  }
};

export {openBigPicture};
