import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ResponsiveText from '../components/RnText';
import {colors} from '../constants/colorsPallet';
import {hp, wp} from '../helpers/Responsiveness';
import Icon from '../components/Icon';
import {globalPath} from '../constants/globalPath';
import Multitouch from '../components/Multitouch';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NetworkInfo} from 'react-native-network-info';
import TcpSocket from 'react-native-tcp-socket';

const WifiSettings = ({isVisible, onRequestClose}) => {
  const [enableCar, setEnableCar] = useState(true);
  const [enableDrone, setEnableDrone] = useState(false);
  const [forgotPopup, setForgotPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(false);
  const [pairedDevices, setpairedDevices] = useState([
    // {deviceName: 'Wifi Car', address: '00:1b:63:84:45:e6 '},
  ]);
  const [availableDevices, setAvailableDevices] = useState([
    // {deviceName: 'Wifi Car', address: '00:1b:63:84:45:e6 '},
    // {deviceName: 'Wifi Drone', address: '00:1b:63:84:45:e6 '},
    // {deviceName: 'Wifi Spider', address: '00:1b:63:84:45:e6 '},
  ]);
  useEffect(() => {
    setAvailableDevices(availableDevices);
  }, [render]);

  useEffect(() => {
    // Example usage
    setLoading(true);
    scanLANForOpenPort(8008)
      .then(devices => {
        console.log('Devices with server listening on port 8008:', devices);
        setAvailableDevices(devices);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log('Error scanning LAN:', err);
      });
  }, []);

  const scanLANForOpenPort = async port => {
    // Get the device's local IP address
    const deviceIp = await NetworkInfo.getIPV4Address();
    console.log('Device IP:', deviceIp);

    // Determine the IP range based on the device's IP
    const ipPrefix = deviceIp.split('.').slice(0, 3).join('.');
    console.log('IP prefix:', ipPrefix);

    const reachableDevices = [];

    // Check if a port is open on a given IP
    const checkPortOpen = ip => {
      return new Promise(resolve => {
        const client = TcpSocket.createConnection(
          {host: ip, port: port, timeout: 500},
          () => {
            // Port is open; add IP to list of reachable devices
            const newDevice = {deviceName: `Device at ${ip}`, address: ip};
            reachableDevices.push(newDevice);
            setAvailableDevices(reachableDevices);
            setRender(!render);
            console.log('New device found:', newDevice);
            client.destroy(); // Close immediately
            resolve(true);
          },
        );

        client.on('error', () => {
          // Port is not open or connection failed
          client.destroy();
          resolve(false);
        });

        client.on('timeout', () => {
          // Port is not open (timed out)
          client.destroy();
          resolve(false);
        });
      });
    };

    // Scan IP range for open ports
    const scanPromises = [];
    for (let i = 1; i <= 254; i++) {
      const ip = `${ipPrefix}.${i}`;
      console.log('ip====>', ip);

      scanPromises.push(checkPortOpen(ip));
    }

    // Await all scans and return the list of reachable devices
    await Promise.all(scanPromises);
    console.log('Devices with open port:', reachableDevices);
    return reachableDevices;
  };

  useEffect(() => {
    console.log('Paired devices updated:', pairedDevices);
  }, [pairedDevices.length]);

  const pairDevice = item => {
    setpairedDevices(prevDevices => {
      const updatedDevices = [...prevDevices, item];
      console.log('Updated paired devices:', updatedDevices);
      return updatedDevices;
    });
  };
  const Line = () => (
    <View style={{height: 1.5, backgroundColor: colors.white1}} />
  );
  const Line1 = () => (
    <View style={{height: 0.8, backgroundColor: colors.white1}} />
  );
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onRequestClose}>
      <GestureHandlerRootView style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* <ActivityIndicator animating={loading} size={'large'} /> */}
          <ScrollView>
            <View style={styles.row}>
              <Multitouch onPress={onRequestClose}>
                <Icon source={globalPath.back} size={wp(3)} />
              </Multitouch>
              <ResponsiveText color={colors.white1} size={2}>
                Devices
              </ResponsiveText>
              <View style={{width: wp(3)}} />
            </View>
            <Line />
            {pairedDevices.map(device => (
              <>
                <View style={[styles.row, {paddingVertical: 0}]}>
                  <View>
                    <ResponsiveText color={colors.white1}>
                      {device.deviceName}
                    </ResponsiveText>
                    <ResponsiveText size={1.3} color={colors.grey1}>
                      {device.address}
                    </ResponsiveText>
                  </View>
                  <View style={styles.row}>
                    <TouchableOpacity
                      style={styles.forgetBtn}
                      onPress={() => setForgotPopup(true)}>
                      <ResponsiveText>Forget</ResponsiveText>
                    </TouchableOpacity>
                    <Icon source={globalPath.verticalLine} size={wp(3)} />
                    <Icon source={globalPath.Settings} size={wp(3)} />
                    <Multitouch onPress={() => setEnableCar(!enableCar)}>
                      <Icon
                        source={
                          enableCar ? globalPath.toggleOn : globalPath.toggleOff
                        }
                        size={wp(4)}
                        margin={[0, 0, 0, 10]}
                      />
                    </Multitouch>
                  </View>
                </View>
                <Line1 />
              </>
            ))}
            {pairedDevices.length == 0 && (
              <ResponsiveText
                textAlign={'center'}
                margin={[10]}
                color={colors.white1}>
                No paired device found
              </ResponsiveText>
            )}
            {/* <View style={[styles.row, {paddingVertical: 0}]}>
              <View>
                <ResponsiveText color={colors.white1}>
                  Wifi Drone
                </ResponsiveText>
                <ResponsiveText size={1.3} color={colors.grey1}>
                  00:1b:63:84:45:e6
                </ResponsiveText>
              </View>
              <View style={styles.row}>
                <Icon source={globalPath.verticalLine} size={wp(3)} />
                <Icon source={globalPath.Settings} size={wp(3)} />
                <Multitouch onPress={() => setEnableDrone(!enableDrone)}>
                  <Icon
                    source={
                      enableDrone ? globalPath.toggleOn : globalPath.toggleOff
                    }
                    size={wp(4)}
                    margin={[0, 0, 0, 10]}
                  />
                </Multitouch>
              </View>
            </View>
            <Line1 /> */}
            <View style={[styles.row, {marginTop: 10}]}>
              <View style={{width: wp(3)}} />
              <ResponsiveText size={2} color={colors.white1}>
                Available Devices
              </ResponsiveText>
              <Icon source={globalPath.Refresh} size={wp(2.5)} />
            </View>
            <Line />
            {availableDevices.map((item, index) => (
              <>
                <View style={styles.row}>
                  <View>
                    <ResponsiveText color={colors.white1}>
                      {item.deviceName}
                    </ResponsiveText>
                    <ResponsiveText size={1.3} color={colors.grey1}>
                      {item.address}
                    </ResponsiveText>
                  </View>
                  <TouchableOpacity onPress={() => pairDevice(item)}>
                    <ResponsiveText
                      size={1.5}
                      color={colors.white1}
                      weight={'bold'}>
                      Pair
                    </ResponsiveText>
                  </TouchableOpacity>
                </View>
                {index < availableDevices.length - 1 && <Line1 />}
              </>
            ))}
          </ScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={forgotPopup}
            onRequestClose={() => setForgotPopup(false)}>
            <View style={styles.modalBackground}>
              <View
                style={{
                  backgroundColor: colors.white1,
                  width: wp(35),
                  height: hp(40),
                  padding: wp(3),
                  borderRadius: 10,
                  justifyContent: 'space-between',
                }}>
                <ResponsiveText size={1.7} weight={'bold'}>
                  Forget device ?
                </ResponsiveText>
                <ResponsiveText size={1.5} margin={[0, 0, 0, 0]}>
                  Your phone will no longer be paired with Wifi Car
                </ResponsiveText>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    // marginTop:hp(4)
                  }}>
                  <TouchableOpacity onPress={() => setForgotPopup(false)}>
                    <ResponsiveText weight={'bold'}>Cancel</ResponsiveText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setForgotPopup(false)}>
                    <ResponsiveText weight={'bold'}>
                      Forget device
                    </ResponsiveText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: semi-transparent background
  },
  modalContainer: {
    width: wp(80),
    height: hp(90),
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: wp(5),
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  forgetBtn: {
    backgroundColor: colors.white1,
    paddingHorizontal: 7,
    padding: 4,
    borderRadius: 5,
  },
});

export default WifiSettings;
