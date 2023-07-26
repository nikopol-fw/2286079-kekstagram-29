import { renderPictures } from './pictures.js';
import { closeForm} from './form.js';
import { getData, sendData } from './network.js';
import { showAlert } from './decor-message.js';
import { setFormSubmit } from './form.js';
import { showErrorMessage, showSuccessMessage } from './send-message.js';
import { initFilter, showFilters } from './sort.js';

/** Получаем данные с сервера */
try {
  const data = await getData();
  renderPictures(data);
  showFilters();
  initFilter(data);
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
