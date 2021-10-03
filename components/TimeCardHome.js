import React, {useState} from 'react';
import {Alert, Button, Pressable, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Entypo,
  Ionicons,
  MaterialIcons,
  AntDesign,
  EvilIcons,
} from '@expo/vector-icons';
import Bluetooth from './Bluetooth';
import GPS from './GPS';
import Home from './Home';
import Log from './Log';
import Settings from './Settings';
import WiFi from './WiFi';
import {connect} from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const Drawer = createDrawerNavigator();

function TimeCardHome(props) {
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    await setLoading(true);
    await setLoading(false);
    await Alert.alert('데이터 갱신 완료');
  };

  return (
    loading || (
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#ffbf3f',
          },
        }}>
        <Drawer.Screen
          name="오늘의 출석"
          component={Home}
          options={{
            drawerIcon: props => <Entypo name="home" size={24} color="black" />,
            headerRight: props => (
              <Pressable onPress={refresh}>
                <EvilIcons name="refresh" size={30} color="black" />
              </Pressable>
            ),
            headerStyle: {
              backgroundColor: '#ffbf3f',
            },
            // headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'black',
              fontSize: 20,
            },
            headerTitleAlign: 'center',
          }}
        />
        <Drawer.Screen
          name="LOG"
          component={Log}
          options={{
            drawerIcon: props => (
              <Ionicons name="receipt" size={24} color="black" />
            ),
            headerRight: props => (
                <Pressable onPress={refresh}>
                <EvilIcons name="refresh" size={30} color="black" />
                </Pressable>
            ),
          }}
        />
        <Drawer.Screen
          name="GPS information"
          component={GPS}
          options={{
            drawerIcon: props => (
              <MaterialIcons name="gps-fixed" size={24} color="black" />
            ),
            headerRight: props => (
                <Pressable onPress={refresh}>
                <EvilIcons name="refresh" size={30} color="black" />
                </Pressable>
            ),
          }}
        />
        <Drawer.Screen
          name="WiFi information"
          component={WiFi}
          options={{
            drawerIcon: props => (
              <AntDesign name="wifi" size={24} color="black" />
            ),
            headerRight: props => (
                <Pressable onPress={refresh}>
                <EvilIcons name="refresh" size={30} color="black" />
                </Pressable>
            ),
          }}
        />
        <Drawer.Screen
          name="Bluetooth information"
          component={Bluetooth}
          options={{
            drawerIcon: props => (
              <MaterialIcons
                name="settings-bluetooth"
                size={24}
                color="black"
              />
            ),
            headerRight: props => (
                <Pressable onPress={refresh}>
                <EvilIcons name="refresh" size={30} color="black" />
                </Pressable>
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{
            drawerIcon: props => (
              <MaterialIcons name="settings" size={24} color="black" />
            ),
            headerRight: props => (
              <MaterialIcons
                name="admin-panel-settings"
                size={30}
                color="black"
              />
            ),
          }}
        />
      </Drawer.Navigator>
    )
  );
}

function getLoading(state) {
  return {
    state: state,
  };
}

export default connect(getLoading)(TimeCardHome);

// export default TimeCardHome;
