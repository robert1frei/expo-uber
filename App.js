import React from 'react';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { util } from './src/api/lib';

import preloadFonts from './src/api/preloadFonts';
import preloadImages from './src/api/preloadImages';

import Stack from './src/navigation/Stack';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };

    this.loadAssetsAsync = this.loadAssetsAsync.bind(this);
  }

  async loadAssetsAsync() {
    const fontAssets = util.cacheFonts(preloadFonts);
    const imageAssets = util.cacheImages(preloadImages);

    await Promise.all([...fontAssets, ...imageAssets]).then(() => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <AppLoading
          onFinish={() => this.setState({ isLoading: false })}
          startAsync={this.loadAssetsAsync}
        />
      );
    }

    return (
      <React.Fragment>
        <StatusBar barStyle="dark-content" />
        <Stack />
      </React.Fragment>
    );
  }
}
