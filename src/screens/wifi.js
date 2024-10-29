// RobotController.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Button, Text, View, StyleSheet, Alert } from 'react-native';

const RobotController = () => {
  const [status, setStatus] = useState('Connecting...');
  const [isConnected, setIsConnected] = useState(false); // Track connection state
  const ws = useRef<WebSocket | null>(null); // Holds the WebSocket instance

  // Function to initialize the WebSocket connection
  const connectWebSocket = () => {
    const websocket = new WebSocket('ws://192.168.1.32:8000'); // Update with your Raspberry Pi's IP

    ws.current = websocket;

    websocket.onopen = () => {
      console.log('WebSocket connection opened.');
      setStatus('Connected');
      setIsConnected(true); // Update connection state
    };

    websocket.onclose = (e) => {
      console.log(`WebSocket closed: ${e.reason} (code: ${e.code})`);
      setStatus('Disconnected. Reconnecting...');
      setIsConnected(false); // Update connection state
      reconnectWebSocket(); // Attempt to reconnect
    };

    websocket.onerror = (error) => {
      console.error('WebSocket encountered an error:', error);
      Alert.alert('Connection Error', `Failed to connect: ${error.message}`);
      setIsConnected(false); // Update connection state
    };

    // Handle incoming messages (optional)
    websocket.onmessage = (event) => {
      console.log('Received from server:', event.data);
    };
  };

  // Reconnect WebSocket after a small delay
  const reconnectWebSocket = () => {
    setTimeout(() => connectWebSocket(), 3000); // Reconnect every 3 seconds
  };

  // Send command to the server
  const sendCommand = (command: string) => {
    console.log(ws.current,ws.current.readyState)
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(command);
      console.log(`Sent: ${command}`);
    } else {
      console.log('WebSocket is not open.');
      Alert.alert('Connection Error', 'Cannot send command. WebSocket not connected.');
    }
  };

  useEffect(() => {
    connectWebSocket(); // Connect on mount

    // Cleanup function on component unmount
    return () => {
      ws.current?.close();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>Status: {status}</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="Move Forward" 
          onPress={() => sendCommand('MOVE_FORWARD')} 
          disabled={!isConnected} // Disable if not connected
        />
        <Button 
          title="Stop" 
          onPress={() => sendCommand('STOP')} 
          disabled={!isConnected} // Disable if not connected
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  statusText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default RobotController;
