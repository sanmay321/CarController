import React, {useCallback, useEffect, useState} from 'react';
import {VLCPlayer} from 'react-native-vlc-media-player';
import {View, StyleSheet, Text} from 'react-native';

const App = () => {
  const [error, setError] = useState(false);
  const rtspServerUrl = 'http://192.168.0.105:8554'; // Use the RTSP server URL for checking

  const checkServerStatus = useCallback(async () => {
    console.log('first')
    try {
      const response = await fetch(rtspServerUrl);
      console.log('response', response)
      setError(!response.ok);
    } catch {
      setError(true);
    console.log('error')

    }
  }, [rtspServerUrl]);

  // Periodically check server status
  useEffect(() => {
    const interval = setInterval(checkServerStatus, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [checkServerStatus]);


  const handleError = () => {
    setError(true);
  };



  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>Not Connected / No Video</Text>}

      {!error && (
        <VLCPlayer
          source={{
            uri: 'rtsp://192.168.0.105:8554/stream',
            // initType: 2,
            hwDecoderEnabled: 0,
            hwDecoderForced: 0,
            initOptions: [
              '--rtsp-tcp',
              '--network-caching=300',
              '--rtsp-caching=300',
              '--tcp-caching=300',
              '--realrtsp-caching=300',
              '--no-stats',
              "--live-caching=300",
            ],
          }}
          style={styles.video}
          autoplay={true}
          autoAspectRatio={true}
          // videoAspectRatio={"4:3"}
          isLive={true}
          autoReloadLive={true}
          resizeMode="contain"
          onError={handleError}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default App;
