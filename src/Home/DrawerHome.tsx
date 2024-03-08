import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SonHome from './SonHome';
import Info from './Info';

const Drawer = createDrawerNavigator();

export default function DrawerHome() {
  return (
    <Drawer.Navigator initialRouteName="DrawerHome">
      <Drawer.Screen name="DrawerHome" component={SonHome} />
      <Drawer.Screen name="Info" component={Info} />
    </Drawer.Navigator>
  );
}
