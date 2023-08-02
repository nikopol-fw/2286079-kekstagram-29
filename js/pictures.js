import { openBigPicture } from './big-pictures.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPictures = (data) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImgElement = pictureElement.querySelector('.picture__img');
  pictureImgElement.src = data.url;
  pictureImgElement.alt = data.description;
  pictureElement.querySelector('.picture__likes').textContent = data.likes;
  pictureElement.querySelector('.picture__comments').textContent = data.comments.length;

  pictureElement.addEventListener('click', () => {
    openBigPicture(data);
  });

  return pictureElement;
};

const deletePictures = () => document.querySelectorAll('.picture').forEach((photo) => photo.remove());

const renderPictures = (data) => {
  const pictureFragment = document.createDocumentFragment();
  data.forEach((picture) => {
    const newPictureElement = createPictures(picture);
    pictureFragment.append(newPictureElement);
  });
  picturesContainer.append(pictureFragment);
};

export { renderPictures, deletePictures };

