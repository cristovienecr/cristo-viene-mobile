export default (reducer, path) => reducers => ({ [path]: reducer, ...reducers });
