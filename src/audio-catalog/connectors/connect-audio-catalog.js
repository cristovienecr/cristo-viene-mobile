import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Selectors as SoundcloudSelectors } from '../../soundcloud';
import { Selectors as CatalogSelectors, Actions as CatalogActions } from '../redux';

const { loadCatalog } = CatalogActions;
const { getPlaylists } = SoundcloudSelectors;
const { getIsCatalogLoading } = CatalogSelectors;

const mapStateToProps = createStructuredSelector({
  playlists: getPlaylists,
  isCatalogLoading: getIsCatalogLoading,
});

export default connect(mapStateToProps, { loadCatalog });
