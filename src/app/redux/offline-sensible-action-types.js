import { ActionTypes as SoundcloudActionTypes } from '../../soundcloud';
import { ActionTypes as CatalogActionTypes } from '../../audio-catalog';
import { ActionTypes as PlayerActionTypes } from '../../player';

const OfflineSensibleActionTypes = [
  CatalogActionTypes.LOAD_CATALOG_PENDING,
  CatalogActionTypes.LOAD_PLAYLIST_PENDING,
  SoundcloudActionTypes.FETCH_PLAYLISTS,
  SoundcloudActionTypes.FETCH_PLAYLIST,
  SoundcloudActionTypes.FETCH_TRACK,
  PlayerActionTypes.PLAY_TRACK,
];

export default OfflineSensibleActionTypes;
