const SCALE_DEFAULT = 100;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

const scaleInput = document.querySelector('.scale__control--value');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');

/** Значение маштаба в css */
const scaleImage = (value) => {
  imagePreview.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

/** Уменьшение масштаба */
const onButtonSmallerClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < SCALE_MIN) {
    newValue = SCALE_MIN;
  }
  scaleImage(newValue);
};

buttonSmaller.addEventListener('click', onButtonSmallerClick);

/** Увеличение масштаба */
const onButtonBiggerClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > SCALE_MAX) {
    newValue = SCALE_MAX;
  }
  scaleImage(newValue);
};

buttonBigger.addEventListener('click', onButtonBiggerClick);

/** Сброс настроек масштаба */
const scaleReset = () => scaleImage(SCALE_DEFAULT);

export {scaleReset, imagePreview};
