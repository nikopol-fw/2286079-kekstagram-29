//Описывает функции с помощью JS:
//- строка меньше или равна макс.длине

function checkStringLength(string, length) {
  return string.length <= length;
}

checkStringLength('проверяемая строка', 20);

//- является ли строка палиндромом
function isPolindrome(string) {
  return string.toLowerCase().replaceAll(' ', '') === string.toLowerCase().replaceAll(' ', '').split('').reverse('').join('');
}

isPolindrome('Коту скоро сорок суток');

//- извлекает из строки цифры от 0 до 9 и возвращает в виде целого положит. числа

function selectNumber(string) {
  let resultNumber = '';
  for(let i = 0; i < string.length; i++) {
    if(Number(string[i])) {
      resultNumber = resultNumber + string[i];
    }
  }
  return resultNumber;
}

selectNumber('-1');

//- принимает три параметра: исх.строка, мин.длина, строка с доб.символами - возвращает исх.строку, дополненную указанными символами до заданной длины.Добивка обрез.с конца

function returnString(string, minLength, addSimbol) {
  const resultAddSimbol = minLength - string.length;
  if(resultAddSimbol <= 0) {
    return string;
  }
  return addSimbol.slice(0, resultAddSimbol % addSimbol.length) + addSimbol.repeat(resultAddSimbol / addSimbol.length) + string;
}

returnString('qwerty', 4, '0');
