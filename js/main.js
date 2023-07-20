//import { createPhotos } from './data.js';
import { renderPictures } from './pictures.js';
import { getFormActive } from './form.js';

//const photos = createPhotos();

//renderPictures();
getFormActive();

fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((data) => {
    renderPictures(data);
  });
