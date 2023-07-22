import { renderPictures } from './pictures.js';
import { getFormActive } from './form.js';
import { getData } from './API.js';
import { showAlert } from './decor-message.js';

try {
  const data = await getData();
  renderPictures(data);
} catch (err) {
  showAlert(err.message);
}

getFormActive();
