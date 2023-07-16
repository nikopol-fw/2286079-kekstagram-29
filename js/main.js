import {createPhotos} from './data.js';
import {renderPictures} from './pictures.js';
import { getFormActive } from './form.js';

const photos = createPhotos();

renderPictures(photos);
getFormActive();

