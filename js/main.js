import { renderPictures } from './pictures.js';
import { getFormActive, closeForm} from './form.js';
import { getData, sendData } from './api.js';
import { showAlert } from './decor-message.js';
import { setFormSubmit } from './form.js';
import { showErrorMessage, showSuccessMessage } from './send-message.js';

/** Получаем данные с сервера */
try {
  const data = await getData();
  renderPictures(data);
} catch (err) {
  showAlert(err.message);
}

/** Отправляем данные на сервер */
setFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

getFormActive();

