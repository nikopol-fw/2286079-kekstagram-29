import { renderPictures } from './pictures.js';
import { getFormActive, } from './form.js';
import { getData } from './API.js';
import { showAlert } from './decor-message.js';
import { setFormSubmit } from './form.js';

/** Получаем данные с сервера */
/*getData()
  .then((data) => {
    renderPictures(data);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );*/

try {
  const data = await getData();
  renderPictures(data);
} catch (err) {
  showAlert(err.message);
}

/** Отправляем данные на сервер */
setFormSubmit(async (data) => {
  try {
    //debugger;
    await sendData(data);
    closeForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

getFormActive();

