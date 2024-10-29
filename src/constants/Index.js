import {Platform, ToastAndroid, PermissionsAndroid, Alert} from 'react-native';

const _permissions = async () => {
  if (Platform.OS == 'ios') {
    return true;
  }
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    {
      title: 'Camera Permission',
      message: 'This app needs access to your camera.',
      buttonPositive: 'OK',
      buttonNegative: 'Cancel',
    },
  );
  console.log('=== grandted ==== ', granted);
};

function _toast(string) {
  if (typeof string == 'string') {
    if (Platform.OS == 'ios') {
      Alert.alert(string);
    } else {
      ToastAndroid.showWithGravity(
        string,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  }
}

function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

module.exports = {
  _toast: _toast,
  isImage: isImage,
  _permissions: _permissions,
};
