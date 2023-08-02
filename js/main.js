import { renderPictures } from './pictures.js';
import { closeForm} from './form.js';
import { getData, sendData } from './api.js';
import { showAlert } from './util.js';
import { setFormSubmit } from './form.js';
import { showErrorMessage, showSuccessMessage } from './send-message.js';
import { initFilter, showFilters } from './sort.js';

//Отправляем данные на сервер
setFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

// Получаем данные с сервера
try {
  const data = await getData();
  renderPictures(data);
  showFilters();
  initFilter(data);
} catch (err) {
  showAlert(err.message);
}
