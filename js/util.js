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

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export {getRandomInteger, createIdGenerator, getRandomArrayElement};
