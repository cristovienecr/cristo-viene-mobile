import { flip, curry } from 'ramda';
import oDecamelize from 'decamelize';

export const decamelize = curry(flip(oDecamelize));
