/**
 * @format
 */
import React, {Component} from 'react';
import {Alert, AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import configureStore from './src/redux/Store';
import DataHandler from './src/services/dataHandler.service';
import {PersistGate} from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';
const {runSaga, store, persistor} = configureStore();
DataHandler.setStore(store);

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
 
// });

class AppView extends Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </>
    );
  }
}

AppRegistry.registerComponent(appName, () => AppView);
