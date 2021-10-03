import type {Node} from 'react';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {Entypo} from '@expo/vector-icons';
import * as Font from 'expo-font';
import Login from './components/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './components/Register';
import TimeCardHome from './components/TimeCardHome';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import * as SecureStore from 'expo-secure-store';

const defaultValue = {
  wifiName: ['로드중..'],
  wifiAddr: ['로드중..'],
  btName: ['로드중..'],
  btAddr: ['로드중..'],
  nfcName: ['로드중..'],
  nfcAddr: ['로드중..'],
  gpsName: ['로드중..'],
  gpsLat: ['로드중..'],
  gpsLon: ['로드중..'],
  groupName: '로드중..',
  refreshTrigger: true,
};

function reducer(state = defaultValue, action = {}) {
  switch (action.type) {
    case 'initDB':
      console.log('이닛디비 리듀서 콜');
      return action.payload;
    default:
      return state;
  }
  // if (action.type === "logOut") {
  //   const copy = [...state];
  //   copy[0].isLogin = false;
  //   return copy;
  // } else {
  //   return state;
  // }
}

const store = createStore(reducer);

const App: () => Node = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);

        await SecureStore.getItemAsync('id')
          .then(res => {
            if (res === '' || res === null) {
              setIsLogin(false);
            } else {
              setIsLogin(true);
              console.log('자동 로그인 성공 => ' + res);
            }
          })
          .catch(error => console.log(error));
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView onLayout={onLayoutRootView} style={styles.pagerView}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isLogin ? 'Time Card' : 'Login Page'}>
            <Stack.Screen name="Login Page" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen
              name="Time Card"
              component={TimeCardHome}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    backgroundColor: '#112031',
  },
});

export default App;
