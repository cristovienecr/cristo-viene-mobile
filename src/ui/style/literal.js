import { compose, toPairs, map, defaultTo } from 'ramda';
import cssRuleName from './css-rule-name';

const asLiteral = ([name, value]) => `${cssRuleName(name)}: ${value};`;

export default compose(map(asLiteral), toPairs, defaultTo({}));
