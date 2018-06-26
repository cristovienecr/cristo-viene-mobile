import { isNil, isEmpty, either, compose, not, is } from 'ramda';

const { isNaN } = Number;

export { isEmpty };
export const isNull = isNil;
export const isNullOrEmpty = either(isNull, isEmpty);

export const isNotNull = compose(not, isNull);
export const isNotEmpty = compose(not, isEmpty);
export const isNotNullOrEmpty = compose(not, isNullOrEmpty);

export const isString = is(String);
export const isNotString = compose(not, isString);

export { isNaN };
export const isNotNaN = compose(not, isNaN);

export const isNumber = is(Number);
export const isNotNumber = compose(not, isNumber);

export const isDate = is(Date);
export const isNotDate = compose(not, isDate);
export const isValidDate = (date) => {
  if (isNotDate(date)) return false;
  return isNotNaN(date.getTime());
};
