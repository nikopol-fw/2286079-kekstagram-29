const PHOTO_COUNT = 25;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENTS_COUNT = 5;
const AVATAR_COUNT = 7;
const NAMES = ['Антон', 'Василиса', 'Дана', 'Роман', 'Дима', 'Света', 'Лилия', 'Марк', 'Матвей', 'Тимофей', 'Кирилл', 'Мария', 'Леся', 'Олег'];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DESCRIPTIONS = [
  'Когда проснулся раньше всех',
  'Загар-это туда)',
  'Морюшко',
  'Кто у мамочки фотогроффф',
  'Что на аппетитном',
  'Ласточка',
  'Завтрак аристократа',
  'В баре у бабули',
  'Хаюшки',
  'Расхламление',
  'Навстречу приключениям!!!',
  'Моя любоффф',
  'Что это?',
  'Котэ-маки',
  'Неделя холода',
  'Это только начало...',
  'Культурная жизнь',
  'Раритет',
  'Заказ с Алика',
  'Просто красиво',
  'Что в тарелке?',
  'Слышу этот шум',
  'Добрый вечер!',
  'В отрыв',
  'Опасно'
];

/**Разобрано в 4.12 "Практическая польза замыканий" */
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createIdGenerator = () => {
  let lastGenerateId = 0;

  return function() {
    lastGenerateId += 1;
    return lastGenerateId;
  };
};
const generatorPhotoId = createIdGenerator();
const generatorUrlId = createIdGenerator();
const generatorCommentId = createIdGenerator();

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createMessage = () => Array.from({length: getRandomInteger(1, 2)}, () => getRandomArrayElement(MESSAGES)).join(' ');

const createComment = () => ({
  id: generatorCommentId(),
  avatar: `img/avatar-${ getRandomInteger(1, AVATAR_COUNT) }.svg`,
  massage: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const similarComment = Array.from({length: COMMENTS_COUNT}, createComment);

const createPhoto = () => ({
  id: generatorPhotoId(),
  url: `photos/${ generatorUrlId() }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: similarComment,
});

const similarPhoto = Array.from({length: PHOTO_COUNT}, createPhoto);
similarPhoto();
