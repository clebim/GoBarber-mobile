import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import './config/ReactotronConfig';

import { store, persistor } from './store';
import App from './app';

// import { Container } from './styles';

const src = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
          <App />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default src;