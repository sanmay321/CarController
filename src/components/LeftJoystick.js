import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {globalPath} from '../constants/globalPath';
import Icon from './Icon';
import {colors} from '../constants/colorsPallet';
import {wp} from '../helpers/Responsiveness';
const LeftIcons = ({source, position}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      onPressIn={() => setIsPressed(true)} 
      onPressOut={() => setIsPressed(false)} 
    >
      <Icon
        margin={[
          position == 'bottom' ? -20 : 0,
          0,
          position == 'top' ? -20 : 0,
          0,
        ]}
        size={wp(6)}
        source={source}
        tintColor={isPressed ? colors.black : undefined}
      />
    </TouchableOpacity>
  );
};
const LeftJoystick = () => {
  return (
    <ImageBackground style={styles.joystick} source={globalPath.Subtract}>
      <Icon margin={[0, 0, 0, 0]} size={wp(2)} source={globalPath.Polygon2} />
      <LeftIcons source={globalPath.Rectangle19} position="top" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: wp(19),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon size={wp(2)} source={globalPath.Polygon3} />
          <LeftIcons source={globalPath.Rectangle17} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <LeftIcons source={globalPath.Rectangle18} />
          <Icon size={wp(2)} source={globalPath.Polygon1} />
        </View>
      </View>

      <LeftIcons source={globalPath.Rectangle20} position="bottom" />

      <Icon size={wp(2)} source={globalPath.Polygon4} />
    </ImageBackground>
  );
};

export default LeftJoystick;

const styles = StyleSheet.create({
  joystick: {
    width: wp(25),
    height: wp(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  joystickInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#555',
  },
});
