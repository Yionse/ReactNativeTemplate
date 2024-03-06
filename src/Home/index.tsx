import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Button, Text} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Message from './Message';
import Contact from './Contact';

const Tab = createBottomTabNavigator();

export default function Home() {
  const navigation = useNavigation();
  return (
    // <>
    //   <Text>主页</Text>
    //   <Button onPress={() => navigation.navigate('Login' as never)}>
    //     去Login
    //   </Button>
    // </>
    <Tab.Navigator>
      <Tab.Screen name="message" component={Message} />
      <Tab.Screen name="contact" component={Contact} />
    </Tab.Navigator>
  );
}
