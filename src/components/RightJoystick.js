import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {globalPath} from '../constants/globalPath';
import {wp} from '../helpers/Responsiveness';
import RightIcons from './RightIcons';

const RightJoystick = ({iconStates, handleIconPress}) => {
  return (
    <ImageBackground style={styles.joystick} source={globalPath.Subtract}>
      <RightIcons
        position={'top'}
        source={globalPath.Polygon}
        defaultColor={'#dff2c7'}
        isPressed={iconStates.polygon}
        onPress={() => handleIconPress('polygon')}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: wp(18),
          top: -3,
          left: 2,
        }}>
        <RightIcons
          source={globalPath.Rectangle}
          defaultColor={'#ebc5e6'}
          isPressed={iconStates.rectangle} // Pass the state
          onPress={() => handleIconPress('rectangle')}
        />
        <RightIcons
          source={globalPath.Circle}
          defaultColor={'#ebc5c5'}
          isPressed={iconStates.circle}
          onPress={() => handleIconPress('circle')}
        />
      </View>
      <RightIcons
        position={'bottom'}
        source={globalPath.Group}
        defaultColor={'#cdf2f2'}
        isPressed={iconStates.group}
        onPress={() => handleIconPress('group')}
      />
    </ImageBackground>
  );
};

export default RightJoystick;

const styles = StyleSheet.create({
  joystick: {
    width: wp(25),
    height: wp(25),
    // borderRadius: 50,
    // backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
