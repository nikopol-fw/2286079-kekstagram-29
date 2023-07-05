const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPictures = ({url, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  return pictureElement;
};

const renderPicture = (pictures) => {
  const pictureFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const newPictureElement = createPictures(picture);
    pictureFragment.append(newPictureElement);
  });
  picturesContainer.append(pictureFragment);
};

export {renderPicture};
