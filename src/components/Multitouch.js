import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const Multitouch = ({children, onPress, onTouchStart, onTouchEnd}) => {
  const tap = Gesture.Tap()
    .onTouchesDown(() => {
      if (onTouchStart) {
        onTouchStart();
      }
      // console.log('Touch start');
    })
    .onTouchesUp(() => {
      if (onTouchEnd) {
        onTouchEnd();
      }
      // console.log('Touch end');
    })
    .onEnd(() => {
      if (onPress) {
        onPress();
      }
      // console.log('Short tap');
    });

  const longPress = Gesture.LongPress()
    .onTouchesDown(() => {
      // console.log('Long press start')
    })
    .onTouchesUp(() => {
      // console.log('Long press end')
    })
    .onEnd(() => {
      // console.log('Long tap')
    });

  const composed = Gesture.Simultaneous(tap, longPress);

  return <GestureDetector gesture={composed}>{children}</GestureDetector>;
};

export default Multitouch;

const styles = StyleSheet.create({});
