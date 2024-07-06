import React from 'react';
import App_navigation from './config/App_navigation/Index';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import store from './store';

export default App = () => (
  <Provider store={store}>
    <PaperProvider>
      <App_navigation />
    </PaperProvider>
  </Provider>
);
