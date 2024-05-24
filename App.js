import React from 'react';
import Routes from './src/routes';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

export default function MainApp() {
  return (
    <Routes/>
  );
}

AppRegistry.registerComponent(appName, () => MainApp);
