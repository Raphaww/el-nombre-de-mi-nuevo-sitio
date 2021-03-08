import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify from '@aws-amplify/core';
import awsConfigure from '../awsConfigure';
Amplify.configure(awsConfigure);

export default function App({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  );
};