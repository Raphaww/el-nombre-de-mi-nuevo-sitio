import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import { useStore } from '../store';
import resources from '../resources';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/booker.scss';

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialState);
  addLocaleData([...en, ...es]);
  const allResources = {
    'es-mx': {
       ...resources['es-mx']
    },
    'en-us': {
       ...resources['en-us']
    }
 };
 const messages = allResources['es-mx'];

  return (
    <Provider store={store}>
      <IntlProvider locale={'es-mx'} messages={messages}>
        <Component {...pageProps} />
      </IntlProvider>
    </Provider>
  );
};