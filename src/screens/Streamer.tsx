import React, {useEffect, useState} from 'react';
import {VLCPlayer} from 'react-native-vlc-media-player';
import {View, StyleSheet, Text} from 'react-native';
import {  TouchableOpacity} from 'react-native-gesture-handler'
import ResponsiveText from '../components/RnText';
import { colors } from '../constants/colorsPallet';

const Streamer = () => {
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false)
  const rtspServerUrl = 'rtsp://192.168.0.106:8554/stream'


  const handleError = (e: any,s : any) => {
    console.log(s,e)
  setError(true);
  };
  
  
  
  const handlePlaying = (e : any) => {
    console.log(e)
  setError(false);
  };

  const reloadComponent=()=>{
    setReload(true)
    setTimeout(() => {
      setReload(false)
    }, 2000);
  }
  



  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>Not Connected / No Video</Text>}
      {/* <TouchableOpacity onPress={()=>reloadComponent()}><ResponsiveText color={colors.white}>HI</ResponsiveText></TouchableOpacity> */}
        {!reload && <VLCPlayer
  source={{
    uri: rtspServerUrl,
    initOptions: [
      '--rtsp-tcp',              // Use TCP for RTSP
      '--network-caching=50',    // Reduce network caching to 50ms
      '--rtsp-caching=50',       // Reduce RTSP caching to 50ms
      '--live-caching=50',       // Reduce live caching to 50ms
      '--clock-jitter=0',        // Disable clock jitter correction
      '--drop-late-frames',      // Drop frames if they are late
      '--skip-frames',           // Skip frames if decoding can't keep up
    ]
  }}
  style={styles.video}
  autoAspectRatio={true}
  // resizeMode="contain"
  onError={(e) => handleError(e, "onError")}
  onStopped={(e) => handleError(e, "onStopped")}
  onPaused={(e) => handleError(e, "onPaused")}
  onEnd={(e) => handleError(e, "onEnd")}
  onBuffering={(e) => handleError(e, "onBuffering")}
  onProgress={(e) => handleError(e, "onProgress")}
  onPlaying={(e) => handlePlaying(e)}
  onLoad={(e) => handlePlaying(e)}
/>

}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    width:'100%',
    height:"100%"
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

export default Streamer;





// import React, {useState} from 'react';
// import {VLCPlayer} from 'react-native-vlc-media-player';
// import {View, StyleSheet, Text} from 'react-native';

// const App = () => {
//   const [error, setError] = useState(false);



//   const handleError = () => {
//   setError(true);
//   };
  
  
  
//   const handlePlaying = () => {
//   setError(false);
//   };
  




//   return (
//     <View style={styles.container}>
//       {error && <Text style={styles.errorText}>Not Connected / No Video</Text>}



//       {!error && (
//         <VLCPlayer
//           source={{
//             uri: 'rtsp://192.168.0.106:8554/stream',
//             // initType: 2,
//             hwDecoderEnabled: 0,
//             hwDecoderForced: 0,
//             initOptions: [
//             '--rtsp-tcp',
//             '--network-caching=300',
//             '--rtsp-caching=300',
//             '--tcp-caching=300',
//             '--realrtsp-caching=300',
//             '--no-stats',
//             "--live-caching=300",
//             ],
//           }}
//           style={styles.video}
//             autoAspectRatio={true}
//             resizeMode="contain"
//             onError={handleError}
//             onPlaying={handlePlaying}
//           />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000',
//   },
//   video: {
//     width: '100%',
//     height: '100%',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
//     },
// });

// export default App;




// // import React, {useState} from 'react';
// // import {VLCPlayer} from 'react-native-vlc-media-player';
// // import {View, StyleSheet, Text} from 'react-native';



// // const App = () => {
// // const [error, setError] = useState(false);



// // const handleError = () => {
// // setError(true);
// // };



// // const handlePlaying = () => {
// // setError(false);
// // };



// // return (
// // <View style={styles.container}>
// // {error && <Text style={styles.errorText}>Not Connected / No Video</Text>}



// {!error && (
// <VLCPlayer
// source={{
// uri: 'rtsp://192.168.0.105:8554/stream',
// // initType: 2,
// hwDecoderEnabled: 0,
// hwDecoderForced: 0,
// initOptions: [
// '--rtsp-tcp',
// '--network-caching=300',
// '--rtsp-caching=300',
// '--tcp-caching=300',
// '--realrtsp-caching=300',
// '--no-stats',
// "--live-caching=300",
// ],
// }}
// style={styles.video}
// autoAspectRatio={true}
// resizeMode="contain"
// onError={handleError}
// onPlaying={handlePlaying}
// />
// )}
// </View>
// );
// };



// const styles = StyleSheet.create({
// container: {
// flex: 1,
// justifyContent: 'center',
// alignItems: 'center',
// backgroundColor: '#000',
// },
// video: {
// width: '100%',
// height: '100%',
// },
// errorText: {
// color: 'red',
// fontSize: 16,
// textAlign: 'center',
// },
// });



// export default App;


