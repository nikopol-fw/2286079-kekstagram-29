import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentItem = commentsList.querySelector('.social__comment');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.social__comments-loader');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

/**Закрывает полноэкр.просмотр фото */
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  commentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureCloseButton.removeEventListener('click', onBigPictureCloseClick);
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
const createComment = (data) => {
  const comment = commentItem.cloneNode(true);
  comment.querySelector('.social__picture').src = data.avatar;
  comment.querySelector('.social__picture').alt = data.name;
  comment.querySelector('.social__text').textContent = data.message;
  return comment;
};

/**Отрисовывает комментарии */
const renderComments = (comments) => {
  comments.forEach((comment) => {
    commentsList.append(createComment(comment));
  });
};

/**Создает элементы полноэкр. фото */
const createBigPictures = (data) => {
  bigPicture.querySelector('.big-picture__img img').src = data.url;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.social__caption').textContent = data.description;
  bigPicture.querySelector('.comments-count').textContent = data.comments.lingth;
  commentsList.innerHTML = '';
  renderComments(data.comments);
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

/**Открывает полноэкр.просмотр фото */
const openBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCloseButton.addEventListener('click', onBigPictureCloseClick);
  createBigPictures(data);
};

export {openBigPicture};
