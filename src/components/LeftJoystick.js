import {ImageBackground, StyleSheet, View} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {globalPath} from '../constants/globalPath';
import Icon from './Icon';
import {colors} from '../constants/colorsPallet';
import {wp} from '../helpers/Responsiveness';
import Multitouch from './Multitouch';

const LeftIcons = ({source, position}) => {
  const [isPressed, setIsPressed] = useState(false);
  const intervalRef = useRef(null);

  const handlePressIn = () => {
    console.log('Started Pressing:', position);
    setIsPressed(true);

    intervalRef.current = setInterval(() => {
      console.log('Holding:', position);
    }, 500);
  };

  const handlePressOut = () => {
    console.log('Released:', position);
    setIsPressed(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <Multitouch 
      onTouchStart={handlePressIn} 
      onTouchEnd={handlePressOut} 
      onTouchCancel={handlePressOut} // Fallback for unexpected cancel
    >
      <Icon
        margin={[
          position === 'bottom' ? -20 : 0,
          0,
          position === 'top' ? -20 : 0,
          0,
        ]}
        size={wp(6)}
        source={source}
        tintColor={isPressed ? colors.black : undefined}
      />
    </Multitouch>
  );
};


const LeftJoystick = () => {
  return (
    <ImageBackground style={styles.joystick} source={globalPath.Subtract}>
      <Icon margin={[0, 0, 0, 0]} size={wp(2)} source={globalPath.Polygon2} />
      <LeftIcons source={globalPath.Rectangle19} position="top" />
      <View style={styles.row}>
        <View style={styles.iconGroup}>
          <Icon size={wp(2)} source={globalPath.Polygon3} />
          <LeftIcons source={globalPath.Rectangle17} position="left" />
        </View>
        <View style={styles.iconGroup}>
          <LeftIcons source={globalPath.Rectangle18} position="right" />
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: wp(19),
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
