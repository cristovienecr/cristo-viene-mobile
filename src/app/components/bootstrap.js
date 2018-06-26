import { lifecycle } from 'recompose';
import SplashScreen from 'react-native-smart-splash-screen';
import { isNotNullOrEmpty } from '../../helpers/check';
import { Actions } from '../../audio-catalog';

const Bootstrap = lifecycle({
  componentDidMount() {
    const { store } = this.props;
    if (isNotNullOrEmpty(store)) {
      store.dispatch(Actions.loadCatalog());
    }

    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 850,
      delay: 500,
    });
  },
});

export default Bootstrap(({ children }) => children);
