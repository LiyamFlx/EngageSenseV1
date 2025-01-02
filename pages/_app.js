import App from 'next/app';
import React from 'react';

class MyApp extends App {
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);
    // Fetch data on the server
    const serverData = await fetch('https://api.example.com/data').then(res => res.json());
    return { ...appProps, serverData };
  }

  render() {
    const { Component, pageProps, serverData } = this.props;
    return <Component {...pageProps} serverData={serverData} />;
  }
}

export default MyApp;
