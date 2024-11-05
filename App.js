import React from 'react';
import { StatusBar } from 'react-native';
import Home from './src/screens/Home';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import Streamer from './src/screens/Streamer';
import 'react-native-udp';
import { Buffer } from 'buffer';

global.Buffer = Buffer;


global.Buffer = Buffer; // Set global Buffer

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <Home/>
      {/* <Streamer/> */}
    </GestureHandlerRootView>
  );
};

export default App;
