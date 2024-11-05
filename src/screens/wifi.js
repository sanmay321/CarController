import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

const WebSocketExample = ({ Value, OnValueChange, bottom }) => {
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

    const sendMessage = () => {
        if (ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(messageText);
            setMessageText(''); // Clear input after sending
        } else {
            console.error('WebSocket is not open. Ready state: ', ws.current.readyState);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {messages.map((msg, index) => (
                    <Text key={index} style={styles.message}>
                        {msg}
                    </Text>
                ))}
            </ScrollView>
            <TextInput
                style={styles.input}
                value={messageText}
                onChangeText={setMessageText}
                placeholder="Type your message"
            />
            <Button title="Send" onPress={sendMessage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    scrollView: {
        marginBottom: 20,
    },
    message: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default WebSocketExample;
