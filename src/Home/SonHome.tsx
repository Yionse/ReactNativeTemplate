import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Message from './Message';
import Contact from './Contact';

const Tab = createBottomTabNavigator();

export default function SonHome() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Message" component={Message} />
      <Tab.Screen name="Contact" component={Contact} />
    </Tab.Navigator>
  );
}
