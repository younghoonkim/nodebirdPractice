import type { AppProps } from 'next/app'
import wrapper from '../store/configureStore';
import withRedux from 'next-redux-wrapper';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Component {...pageProps} />
    </>
  );
}

export default withRedux(wrapper)(App);