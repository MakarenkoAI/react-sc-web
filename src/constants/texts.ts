export const yupDefaults = {
  ru: {
    mixed: {
      default: 'Неверный формат',
      required: 'Обязательное поле',
      notType: 'Значение не удовлетворяет типу',
    },
    string: {
      length: 'Поле должно содержать ${length} символов',
      required: 'Обязательное поле',
      min: 'Поле должно содержать не менее ${min} символов',
      max: 'Поле должно содержать не более ${max} символов',
      matches: 'Поле не удовлетворяет проверочному выражению',
      email: 'Не валидный email',
    },
    number: {
      required: 'Обязательное поле',
      positive: 'Число должно быть положительным',
      negative: 'Число должно быть отрицательным',
    },
    date: {
      required: 'Обязательное поле',
      min: 'Дата должна быть позже ${min}',
      max: 'Дата должна быть ранее ${max}',
    },
  },
  en: {
    mixed: {
      default: 'Wrong format',
      required: 'Required field',
      notType: 'Incorrect field type',
    },
    string: {
      length: 'Field should have ${length} symbols',
      required: 'Required field',
      min: 'Field should have more than ${min} symbols',
      max: 'Field should have less than ${max} symbols',
      matches: 'The field does not match the test expression',
      email: 'Email is invalid',
    },
    number: {
      required: 'Required field',
      positive: 'Number should be positive',
      negative: 'Number should be negative',
    },
    date: {
      required: 'Required field',
      min: 'Date should be later ${min}',
      max: 'Date should be earlier ${max}',
    },
  },
};
