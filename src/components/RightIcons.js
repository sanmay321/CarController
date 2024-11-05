import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {globalPath} from '../constants/globalPath';
import {wp} from '../helpers/Responsiveness';
import Icon from './Icon';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const RightIcons = ({source, position, defaultColor, isPressed, onPress}) => {
  return (
    <View
      onTouchStart={onPress}
      style={({pressed}) => [pressed && styles.pressedStyle]}>
      <ImageBackground
        style={[
          styles.icon,
          {
            bottom: position == 'top' ? -6 : undefined,
            top: position == 'bottom' ? -10 : undefined,
          },
        ]}
        source={globalPath.Ellipse7}>
        <Icon
          margin={[-3, 0, 0, 0]}
          size={wp(2.3)}
          source={source}
          tintColor={isPressed ? defaultColor : undefined} // Change to the specific color when pressed
        />
      </ImageBackground>
    </View>
  );
};

export default RightIcons;

const styles = StyleSheet.create({
  icon: {
    width: wp(6.5),
    height: wp(6.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressedStyle: {
    opacity: 0.8, // Optional visual feedback
  },
});
