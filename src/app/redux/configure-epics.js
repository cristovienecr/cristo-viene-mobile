import 'rxjs';
import { combineEpics } from 'redux-observable';
import { epic as soundcloudEpic } from '../../soundcloud';
import { epic as catalogEpic } from '../../audio-catalog';

const configureEpics = () => combineEpics(soundcloudEpic, catalogEpic);

export default configureEpics;
