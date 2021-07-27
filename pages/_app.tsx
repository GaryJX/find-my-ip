import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/theme/theme';
import '@/styles/globals.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Find My IP Address</title>
        <meta
          name="viewport"
          content="height=device-height, width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, viewport-fit=cover, shrink-to-fit=no"
        />
        {[400, 700].map((weight) => (
          <link
            key={weight}
            rel="preload"
            href={`/fonts/nunito-${weight}.woff2`}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default App;
