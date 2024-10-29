import React from 'react';
import Home from './src/screens/Home';
import { Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Streamer from './src/screens/Streamer';
const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Home/>
      {/* <Streamer/> */}
    </GestureHandlerRootView>
  );
};

export default App;









