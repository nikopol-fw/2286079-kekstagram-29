import { renderPictures } from './pictures.js';

const RANDOM_PICTURE_COUNT = 10;
const RERENDER_DELAY = 500;

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');
const filterRandom = imgFilters.querySelector('#filter-random');
const filterDiscussed = imgFilters.querySelector('#filter-discussed');

/** Показать кнопки сортировки */
const showFilters = () => imgFilters.classList.remove('img-filters--inactive');

/** Сортировка "Обсуждаемые" */
const sortComments = (a, b) => b.comments.length - a.comments.length;

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

/** Устранение дребезга */
const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

/** Получить отфильтрованные изображения */
const getFilteredImg = (photos, sortButton) => {
  if (sortButton === filterRandom) {
    return shuffleArray(photos.slice()).slice(0, RANDOM_PICTURE_COUNT);
  }
  if (sortButton === filterDiscussed) {
    return photos.slice().sort(sortComments);
  }
  return photos;
};

/** Обработчик кнопки сортировки */
const onFilterButtonClick = (evt, photos) => {
  document.querySelectorAll('.img-filters__button').forEach((button) => button.classList.remove('img-filters__button--active'));
  const filterButton = evt.target;
  filterButton.classList.add('img-filters__button--active');
  document.querySelectorAll('.picture').forEach((photo) => photo.remove());
  renderPictures(getFilteredImg(photos, filterButton));
};

/** Инциализирует сортировку */
const initFilter = (photos) => {
  imgFiltersForm.addEventListener('click', debounce((evt) => {
    onFilterButtonClick(evt, photos);
  }, RERENDER_DELAY));
};

export { initFilter, showFilters };
