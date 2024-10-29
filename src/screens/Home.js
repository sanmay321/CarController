
import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  // TouchableOpacity,
  Modal,
  ImageBackground,
} from 'react-native';
import {  TouchableOpacity} from 'react-native-gesture-handler'
import {hp, wp} from '../helpers/Responsiveness';
import ResponsiveText from '../components/RnText';
import {colors} from '../constants/colorsPallet';
import CustomAxisPad from '../components/CustomAxisPad';
import LeftJoystick from '../components/LeftJoystick';
import RightJoystick from '../components/RightJoystick';
import CustomSlider from '../components/Slider';
import {globalPath} from '../constants/globalPath';
import Icon from '../components/Icon';
import RightIcons from '../components/RightIcons';
import App from '../screens/Streamer';
import RobotController from './wifi';

const Home = () => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleValueChange = (value) => {
    const scaledValue = Math.round(value * 100);
    console.log('Slider Value:', scaledValue);
    setSliderValue(scaledValue);
  };



  const [isFullScreen, setFullScreen] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [iconStates, setIconStates] = useState({
    rectangle: false,
    group: false,
    polygon: false,
    circle: false,
  });

  // Function to toggle the pressed state of each icon
  const handleIconPress = iconName => {
    setIconStates(prevState => ({
      ...prevState,
      [iconName]: !prevState[iconName], // Toggle the state of the icon
    }));
  };

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'space-between'}}>
        {/* Status */}
        <View style={styles.statusItem}>
          <View style={styles.statusIndicator} />
          <ResponsiveText color={colors.grey1}>Bluetooth Car</ResponsiveText>
        </View>
        {/* Left Pannel */}
        <LeftJoystick />
        <View />
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <View style={styles.screenContainer}>
          {/* <Image source={globalPath.image1} style={styles.screenImage} /> */}
          <App/>
          <TouchableOpacity
            onPress={() => setFullScreen(true)}
            style={styles.iconStyle}>
            <Icon size={wp(3)} source={globalPath.fullscreen} />
          </TouchableOpacity>
        </View>

        {/* Joy Sticks Container */}

        <View style={styles.joystickContainer}>
          <View style={{left: wp(-7)}}>
            <CustomAxisPad />
          </View>
          <View style={{justifyContent: 'center', left: wp(-3)}}>
            <CustomSlider Value={sliderValue}OnValueChange={handleValueChange}/>
          </View>
          <View style={{right: wp(-2)}}>
            {/* <CustomAxisPad /> */}
            {/* <RobotController/> */}
          </View>
        </View>

        {/* Slider */}
      </View>

      {/* Right Panel */}
      <View style={{justifyContent: 'center', zIndex: -1}}>
        <View style={{height: hp(10)}} />
        <Image
          style={{position: 'absolute', right: 0, top: 0,marginEnd:30}}
          source={globalPath.logo}
        />
        <RightJoystick iconStates={iconStates} handleIconPress={handleIconPress} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFullScreen}
        onRequestClose={() => setFullScreen(false)}>
        <ImageBackground
          source={globalPath.image1} // Replace with your image URL or import a local image
          style={styles.backgroundImage}>
          <TouchableOpacity
            onPress={() => setFullScreen(false)}
            style={styles.iconStyle}>
            <Icon size={wp(3)} source={globalPath.fullscreen} />
          </TouchableOpacity>
          <View
            style={[
              styles.joystickContainer,
              {
                width: wp(90),
                alignSelf: 'center',
                top: 0,
              },
            ]}>
            <CustomAxisPad opacity={0.5} />
            <CustomAxisPad opacity={0.5} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              bottom: hp(10),
              zIndex:1
            }}>
            {/* <RightIcons
              source={globalPath.Rectangle}
              defaultColor={'#ebc5e6'}
              isPressed={iconStates.rectangle} // Pass the state
              onPress={() => handleIconPress('rectangle')}
            /> */}
            {/* <RightIcons
              source={globalPath.Group}
              defaultColor={'#cdf2f2'}
              isPressed={iconStates.group}
              onPress={() => handleIconPress('group')}
            /> */}
            <View style={{marginHorizontal: wp(3), justifyContent: 'center'}}>
              <CustomSlider Value={sliderValue} OnValueChange={handleValueChange}/>
            </View>
            {/* <RightIcons
              source={globalPath.Polygon}
              defaultColor={'#dff2c7'}
              isPressed={iconStates.polygon}
              onPress={() => handleIconPress('polygon')}
            /> */}

            {/* <RightIcons
              source={globalPath.Circle}
              defaultColor={'#ebc5c5'}
              isPressed={iconStates.circle}
              onPress={() => handleIconPress('circle')}
            /> */}
          </View>
        </ImageBackground>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(3),
    backgroundColor: '#27282d',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 10,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.black2,
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 7,
    width: wp(18),
    // top: hp(-8),
    // marginBottom:hp(5)
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: colors.green1,
  },

  screenContainer: {
    width: wp(35),
    height: hp(45),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#222',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.white,
    // marginHorizontal: 20,
  },
  screenImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  joystickContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(45),
    top: hp(5),
    zIndex: 1,
    // flex: 1,
  },
  backgroundImage: {
    width: wp(100),
    height: hp(100),
    justifyContent: 'flex-end',
  },
  iconStyle: {position: 'absolute', top: wp(2), right: wp(2)},
});

export default Home;
