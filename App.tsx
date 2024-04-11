import React, {useCallback, useRef, useState} from 'react';
import {NativeBaseProvider, Text, View} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '@/Login';
import Home from '@/Home';
``;
import {Dimensions, PanResponder} from 'react-native';
import DrawerHome from '@/Home/DrawerHome';

const Stack = createNativeStackNavigator();

function Main() {
  const swipeDistance = useRef<number>(0);
  const swipeStartDistance = useRef<number>(0);
  const [drawerLeftDistance, setDrawerLeftDistance] = useState<number>(0);
  const drawerMove = useCallback(
    (x: number) => {
      setDrawerLeftDistance(
        prevDistance => prevDistance + x - swipeDistance.current,
      );
    },
    [drawerLeftDistance],
  );
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return (
          gestureState.dx > 30 &&
          Math.abs(gestureState.dy) < 10 &&
          gestureState.vx > 0
        );
      },
      onPanResponderMove: (evt, gestureState) => {
        if (swipeDistance.current === 0) {
          swipeStartDistance.current = gestureState.dx;
        }
        // 处理右滑动作的逻辑
        drawerMove(gestureState.dx);
        // setDrawerLeftDistance(
        //   () => drawerLeftDistance + (gestureState.dx - swipeDistance.current),
        // );
        swipeDistance.current = gestureState.dx;
      },
      onPanResponderEnd: () => {
        if (swipeDistance.current - swipeStartDistance.current > 200) {
          setDrawerLeftDistance(300);
        } else {
          setDrawerLeftDistance(0);
          swipeDistance.current = 0;
          swipeStartDistance.current = 0;
        }
      },
    }),
  ).current;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      {/* 原生Home，监听右滑事件 */}
      {/* <Stack.Screen name="Home" component={Home} /> */}
      {/* 使用了Drawer导航 */}
      <Stack.Screen name="DrawerHome" component={DrawerHome} />
    </Stack.Navigator>
  );
}
const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default App;
