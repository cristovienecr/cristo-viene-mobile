import { batchedSubscribe } from 'redux-batched-subscribe';
import rafBatch from './raf-batch';

export default () => batchedSubscribe(rafBatch());
