import { openBigPicture } from './big-pictures.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPictures = (data) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = data.url;
  pictureElement.querySelector('.picture__likes').textContent = data.likes;
  pictureElement.querySelector('.picture__comments').textContent = data.comments.length;

  pictureElement.addEventListener('click', () => {
    openBigPicture(data);
  });

  return pictureElement;
};

const renderPictures = (pictures) => {
  const pictureFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const newPictureElement = createPictures(picture);
    pictureFragment.append(newPictureElement);
  });
  picturesContainer.append(pictureFragment);
};

export {renderPictures};

