import { imagePreview } from './scale.js';
import { classHidden } from './big-pictures.js';

const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },

  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },

  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },

  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },

  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },

  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
];

const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

const effectInput = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectElements = document.querySelector('.effects');

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

/** Показ слайдера */
const openSlider = () => {
  sliderContainer.classList.remove(classHidden);
};

/** Скрытие слайдера */
const closeSlider = () => {
  sliderContainer.classList.add(classHidden);
};

/** Обновление слайдера для эффекта */
const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    start: chosenEffect.max,
    step: chosenEffect.step,
  });

  if (isDefault()) {
    closeSlider();
  } else {
    openSlider();
  }
};

/** Наложение эффекта */
const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imagePreview.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

/** Обработчик при изменении слайдера */
const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  if (isDefault()) {
    imagePreview.style.filter = DEFAULT_EFFECT.style;
  } else {
    imagePreview.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  }
  effectInput.value = sliderValue;
};

/** Сброс настроек слайдера */
const effectsReset = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

/** Создает слайдер */
noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

closeSlider();

effectElements.addEventListener('change', onEffectsChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export { effectsReset };
