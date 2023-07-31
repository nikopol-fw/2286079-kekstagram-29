import { renderPictures, deletingPictures } from './pictures.js';
import { debounce, shuffleArray } from './util.js';

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const RANDOM_PICTURE_COUNT = 10;
const RERENDER_DELAY = 500;

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');

/** Показать кнопки сортировки */
const showFilters = () => imgFilters.classList.remove('img-filters--inactive');

/** Сортировка "Обсуждаемые" */
const sortComments = (a, b) => b.comments.length - a.comments.length;

/** Получить отфильтрованные изображения */
const getFilteredImg = (sourcePhotos, filterType) => {
  let filteredImage = [];
  switch (filterType) {
    case FilterType.RANDOM: {
      const photos = sourcePhotos.slice();
      filteredImage = shuffleArray(photos).slice(0, RANDOM_PICTURE_COUNT);
      break;
    }
    case FilterType.DISCUSSED: {
      const photos = sourcePhotos.slice();
      filteredImage = photos.sort(sortComments);
      break;
    }
    default: {
      filteredImage = sourcePhotos;
      break;
    }
  }
  return filteredImage;
};

const rerenderTimeout = debounce((photos, id) => {
  deletingPictures();
  renderPictures(getFilteredImg(photos, id));
}, RERENDER_DELAY);

/** Обработчик кнопки сортировки */
const onFilterButtonClick = (evt, photos) => {
  document.querySelectorAll('.img-filters__button').forEach((button) => button.classList.remove('img-filters__button--active'));
  const filterButton = evt.target;
  filterButton.classList.add('img-filters__button--active');
  const id = evt.target.id;
  rerenderTimeout(photos, id);
};

/** Инциализирует сортировку */
const initFilter = (photos) => {
  imgFiltersForm.addEventListener('click', (evt) => onFilterButtonClick(evt, photos));
};

export { initFilter, showFilters };
