
import React, {useState,useRef,useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  StatusBar,
  ImageBackground,
} from 'react-native';
// import {  TouchableOpacity} from 'react-native-gesture-handler'
// import {  TouchableOpacity} from 'react-native-gesture-handler'
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
import HLSPlayer from '../screens/Streamer1';
import WebSocketExample from '../screens/wifi';
// import WebSocketExample from './wifi';

const Home = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const ws = useRef(null); // WebSocket reference
  const [messageText, setMessageText] = useState(''); // State for input message
  const [messages, setMessages] = useState([]); // State for received messages


  useEffect(() => {
      // Create WebSocket connection to the ESP32 server at /ws
      ws.current = new WebSocket('ws://192.168.0.242:8008/ws');

      // WebSocket event handlers
      ws.current.onopen = () => {
          console.log('Connected to the server');
          // Optionally send a message once connected
          ws.current.send('Hello ESP32!');
      };

      ws.current.onmessage = (e) => {
          console.log('Message from server:', e.data);
          setMessages(prevMessages => [...prevMessages, e.data]); // Update messages state
      };

      ws.current.onerror = (e) => {
          console.error('WebSocket error:', e.message);
      };

      ws.current.onclose = (e) => {
          console.log('WebSocket closed:', e.code, e.reason);
      };

      // Clean up on component unmount
      return () => {
          ws.current.close();
      };
  }, []);


  const handleValueChange = (value) => {
    // const scaledValue = Math.round(value * 100);
    // console.log('Slider Value:', scaledValue);
    setSliderValue(value);
  };

  const onTouchEvent = async (event: { eventType: string; ratio: { x: number; y: number } }) => {
    console.log('Custom handler', event.eventType, event.ratio.x, event.ratio.y);
    if (ws.current.readyState === WebSocket.OPEN) {
      const dataToSend = `x:${event.ratio.x},y:${event.ratio.y}`;
      ws.current.send(dataToSend);
    } else {
        console.log('WebSocket is not open. Ready state: ', ws.current.readyState);
    }
    if (connected) {
        const dataToSend = `x:${event.ratio.x},y:${event.ratio.y}`; // Format data
        if (ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(dataToSend);
          setMessageText(''); // Clear input after sending
      } else {
          console.error('WebSocket is not open. Ready state: ', ws.current.readyState);
      }
    } else {
        console.log('Device is not connected');
    }
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
          <HLSPlayer/>
          <View style={styles.iconStyle}>
          <View
            onTouchStart={() => setFullScreen(true)}
            >
            <Icon size={wp(3)} source={globalPath.fullscreen} />
          </View>
          </View>
        </View>

        {/* Joy Sticks Container */}

        <View style={styles.joystickContainer}>
          <View style={{left: wp(-7)}}>
            <CustomAxisPad onTouchEvent={onTouchEvent}/>
          </View>
          <View style={{justifyContent: 'center', top:wp(7),left: wp(-3)}}>
            <CustomSlider Value={sliderValue}OnValueChange={handleValueChange}/>
          </View>
          <View style={{right: wp(-2)}}>
            <CustomAxisPad onTouchEvent={onTouchEvent}/>
            {/* <WebSocketExample/> */}
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
        <View
          // source={globalPath.image1} // Replace with your image URL or import a local image
          style={styles.backgroundImage}>
        <HLSPlayer/>
        <View style={styles.iconStyle}>
          <View
            onTouchStart={() => setFullScreen(false)}>
            <Icon size={wp(3)} source={globalPath.shortscreen} />
          </View>
        </View>
          <View
            style={[
              styles.joystickContainer,
              {
                width: wp(90),
                alignSelf: 'center', top: hp(50),position:'absolute'
              },
            ]}>
            <CustomAxisPad opacity={0.5} onTouchEvent={onTouchEvent}/>
            <CustomAxisPad opacity={0.5} onTouchEvent={onTouchEvent}/>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              bottom: hp(10),
              zIndex:1,
              position:'absolute',
              alignSelf:'center'
            }}>
            <RightIcons
              source={globalPath.Rectangle}
              defaultColor={'#ebc5e6'}
              isPressed={iconStates.rectangle} // Pass the state
              onPress={() => handleIconPress('rectangle')}
            />
            <RightIcons
              source={globalPath.Group}
              defaultColor={'#cdf2f2'}
              isPressed={iconStates.group}
              onPress={() => handleIconPress('group')}
            /> 
            <View style={{marginHorizontal: wp(3), justifyContent: 'center'}}>
              <CustomSlider Value={sliderValue} OnValueChange={handleValueChange}/>
            </View>
            <RightIcons
              source={globalPath.Polygon}
              defaultColor={'#dff2c7'}
              isPressed={iconStates.polygon}
              onPress={() => handleIconPress('polygon')}
            />

            <RightIcons
              source={globalPath.Circle}
              defaultColor={'#ebc5c5'}
              isPressed={iconStates.circle}
              onPress={() => handleIconPress('circle')}
            />
          </View>
        </View>
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
    flex:1,
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
