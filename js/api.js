const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';

const Route = {
  GET_DATA: '/data',
  SENT_DATA: '/',
};
const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SENT_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};


const load = (route, errorText, method = HttpMethod.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

/** Получить данные с сервера */
const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

/** Отправить данные на сервер */
const sendData = (body) => load(Route.SENT_DATA, ErrorText.SENT_DATA, HttpMethod.POST, body);

export { getData, sendData };
