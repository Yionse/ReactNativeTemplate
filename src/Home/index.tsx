import React, {useCallback, useRef, useState} from 'react';
import {Dimensions, PanResponder} from 'react-native';
import {Text, View} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Message from './Message';
import Contact from './Contact';

const Tab = createBottomTabNavigator();

export default function Home() {
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
    <>
      <View
        flex={1}
        {...panResponder.panHandlers}
        position={'relative'}
        // 奇怪-必须要设置background才可以覆盖住下面的Tab
        background={'blue.100'}>
        <Tab.Navigator>
          <Tab.Screen name="Message" component={Message} />
          <Tab.Screen name="Contact" component={Contact} />
        </Tab.Navigator>
      </View>
      <View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transform: [
            {translateX: -Dimensions.get('window').width + drawerLeftDistance},
          ],
          width: '100%',
          height: Dimensions.get('window').height,
          backgroundColor: 'skyblue',
        }}></View>
    </>
  );
}
