import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {AxisPad} from '@fustaro/react-native-axis-pad';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {hp, wp} from '../helpers/Responsiveness';
import {colors} from '../constants/colorsPallet';
import {globalPath} from '../constants/globalPath';
import Icon from './Icon';

const CustomAxisPad = ({
  id,
  size,
  onTouchEvent,
  padBackgroundStyle,
  stickStyle,
  controlStyle,
  children,
  opacity,
}) => {
  return (
    <ImageBackground
      style={[
        styles.ellipse,
        opacity && {opacity},
        // size && {width: size, height: size},
      ]}
      source={globalPath.Ellipse4}>
      <GestureHandlerRootView>
        <AxisPad
          id={id}
          size={wp(15)}
          padBackgroundStyle={padBackgroundStyle || styles.padBackgroundStyle}
          stickStyle={stickStyle || styles.stickStyle}
          controlStyle={controlStyle || styles.controlStyle}
          ignoreTouchDownInPadArea={false}
          initialTouchType={'no-snap'}
          onTouchEvent={event => {
            console.log('event', event);
          }}>
          <ImageBackground
            style={[
              styles.innerellipse,
              //   size && {width: size / 1.5, height: size / 1.5},
            ]}
            source={globalPath.Ellipse7}>
            <Icon size={wp(6)} source={globalPath.Ellipse8} />
          </ImageBackground>
        </AxisPad>
      </GestureHandlerRootView>
    </ImageBackground>
  );
};

// Default styles for the AxisPad
const styles = StyleSheet.create({
  ellipse: {
    width: wp(15),
    height: wp(15),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  innerellipse: {
    width: wp(10),
    height: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  padBackgroundStyle: {
    backgroundColor: colors.transparent,
    borderRadius: wp(8),
    width: wp(15),
    height: wp(15),
    zIndex: 1,
  },
  stickStyle: {
    // backgroundColor: '#4f46e5',
    backgroundColor: colors.transparent,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    // borderColor: '#ec4899',
    borderColor: colors.transparent,
  },
  controlStyle: {
    // backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 125,
    backgroundColor: colors.transparent,
  },
});

export default CustomAxisPad;
