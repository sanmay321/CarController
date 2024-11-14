import React, {useState, useRef, useEffect} from 'react';
import {View, Image, StyleSheet, Modal, Alert} from 'react-native';
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
import Multitouch from '../components/Multitouch';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import WifiSettings from './WifiSettings';

// import WebSocketExample from './wifi';

const Home = () => {
  const intervalRef = useRef(null);
  const [sliderValue, setSliderValue] = useState(0);
  const ws = useRef(null); // WebSocket reference
  const [messageText, setMessageText] = useState(''); // State for input message
  const [messages, setMessages] = useState([]); // State for received messages
  const [wifiSettingsVisible, setWifiSettingsVisible] = useState(false);
  const [connected, setConnected] = useState(false); // Track WebSocket connection state
  const [recentPosition, setRecentPosition] = useState({x: 0, y: 0}); // Track WebSocket connection state
  // let recentPosition =; // Store the recent joystick position

  useEffect(() => {
    // Create WebSocket connection to the ESP32 server at /ws
    ws.current = new WebSocket('ws://192.168.8.175:8008/ws');

    // WebSocket event handlers
    ws.current.onopen = () => {
      console.log('Connected to the server');
      setConnected(true); // Mark the connection as successful
      // Optionally send a message once connected
      ws.current.send('Hello ESP32!');
    };

    ws.current.onmessage = e => {
      console.log('Message from server:', e.data);
      setMessages(prevMessages => [...prevMessages, e.data]); // Update messages state
    };

    ws.current.onerror = e => {
      console.log('WebSocket error:', e.message);
    };

    ws.current.onclose = e => {
      console.log('WebSocket closed:', e.code, e.reason);
      setConnected(false); // Reset connection state when WebSocket closes
    };

    // Clean up on component unmount
    return () => {
      ws.current.close();
    };
  }, []);

  // Send x0:y0 continuously if WebSocket is not connected or no touch event is triggered
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (connected && ws.current && ws.current.readyState === WebSocket.OPEN) {
  //       ws.current.send(`x${recentPosition.x}:y${recentPosition.y}`);
  //       console.log(`x${recentPosition.x}:y${recentPosition.y}`)
  //     }
  //   }, 200); // Send every 1 second

  //   // Cleanup the interval when component unmounts or WebSocket is connected
  //   return () => clearInterval(interval);
  // }, [connected]);

  const handleValueChange = value => {
    setSliderValue(value);
  };

  const sendData = (x, y) => {
    const dataToSend = `x${x}:y${y}`;
    console.log('dataToSend=====>', dataToSend);

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      // const dataToSend = `x${Math.round(event.ratio.y*100)}y${Math.round(event.ratio.y*100)}`;
      ws.current.send(dataToSend);
    } else {
      // console.log(
      //   'WebSocket is not open. Ready state: ',
      //   ws.current?.readyState,
      // );
    }
  };
  const recentPositionRef = useRef({ x: 0, y: 0 }); // To store the latest position values

  const onTouchEvent = async (event) => {
    if (event.eventType === 'start') {
      // Store the initial position values when touch starts
      recentPositionRef.current = {
        x: Math.round(event.ratio.x * 100),
        y: Math.round(event.ratio.y * 100),
      };
    } else if (event.eventType === 'pan') {
      // Update the position values continuously during pan
      recentPositionRef.current = {
        x: Math.round(event.ratio.x * 100),
        y: Math.round(event.ratio.y * 100),
      };

      // Start continuous sending on "pan" if not already started
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          // Use the latest values directly from the ref
          const { x, y } = recentPositionRef.current;
          sendData(x, y);
        }, 100); // Adjust the interval time as needed
      }
    } else if (event.eventType === 'end') {
      // Stop the continuous sending when touch ends
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
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
        <Multitouch onPress={() => setWifiSettingsVisible(true)}>
          <View style={styles.statusItem}>
            <View style={styles.statusIndicator} />
            <ResponsiveText color={colors.grey1}>Bluetooth Car</ResponsiveText>
          </View>
        </Multitouch>
        {/* Left Pannel */}
        <LeftJoystick ws={ws} />
        <View />
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <View style={styles.screenContainer}>
          {/* <Image source={globalPath.image1} style={styles.screenImage} /> */}
          <HLSPlayer />
          <View style={styles.iconStyle}>
            <Multitouch onPress={() => setFullScreen(true)}>
              <Icon size={wp(3)} source={globalPath.fullscreen} />
            </Multitouch>
          </View>
        </View>

        {/* Joy Sticks Container */}

        <View style={styles.joystickContainer}>
          <View style={{left: wp(-7)}}>
            <CustomAxisPad onTouchEvent={onTouchEvent} />
          </View>
          <View style={{justifyContent: 'center', top: wp(7), left: wp(-3)}}>
            <CustomSlider
              Value={sliderValue}
              OnValueChange={handleValueChange}
            />
          </View>
          <View style={{right: wp(-2)}}>
            <CustomAxisPad onTouchEvent={onTouchEvent} />
            {/* <WebSocketExample/> */}
          </View>
        </View>

        {/* Slider */}
      </View>

      {/* Right Panel */}
      <View style={{justifyContent: 'center', zIndex: -1}}>
        <View style={{height: hp(10)}} />
        <Image
          style={{position: 'absolute', right: 0, top: 0, marginEnd: 30}}
          source={globalPath.logo}
        />
        <RightJoystick
          iconStates={iconStates}
          handleIconPress={handleIconPress}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFullScreen}
        onRequestClose={() => setFullScreen(false)}>
        <GestureHandlerRootView style={{flex: 1}}>
          <View
            // source={globalPath.image1} // Replace with your image URL or import a local image
            style={styles.backgroundImage}>
            <HLSPlayer />
            <Multitouch onPress={() => setFullScreen(false)}>
              <View style={styles.iconStyle}>
                <View>
                  <Icon size={wp(3)} source={globalPath.shortscreen} />
                </View>
              </View>
            </Multitouch>
            <View
              style={[
                styles.joystickContainer,
                {
                  width: wp(90),
                  alignSelf: 'center',
                  top: hp(50),
                  position: 'absolute',
                },
              ]}>
              <CustomAxisPad opacity={0.5} onTouchEvent={onTouchEvent} />
              <CustomAxisPad opacity={0.5} onTouchEvent={onTouchEvent} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                bottom: hp(10),
                zIndex: 1,
                position: 'absolute',
                alignSelf: 'center',
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
                <CustomSlider
                  Value={sliderValue}
                  OnValueChange={handleValueChange}
                />
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
        </GestureHandlerRootView>
      </Modal>

      {/* Wifi settings */}
      {wifiSettingsVisible && (
        <WifiSettings
          isVisible={wifiSettingsVisible}
          onRequestClose={() => setWifiSettingsVisible(false)}
        />
      )}
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
    flex: 1,
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
