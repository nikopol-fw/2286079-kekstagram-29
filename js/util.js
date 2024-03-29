const ALERT_SHOW_TIME = 5000;

/** Показать сообщение */
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

/** Устранение дребезга */
const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

/** Сортировка "Случайные" */
const shuffleArray = (array) => {
  let j = array.length, k, i;
  while (j) {
    i = Math.floor(Math.random() * j--);
    k = array[j];
    array[j] = array[i];
    array[i] = k;
  }
  return array;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { isEscapeKey, showAlert, debounce, shuffleArray };
