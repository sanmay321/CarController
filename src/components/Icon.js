import React from 'react';
import {StyleSheet, Image} from 'react-native';
import { colors } from '../constants/colorsPallet';
import {handleMargin, handlePadding} from '../constants/theme';
import {wp} from '../helpers/Responsiveness';
const Icon = ({
  children,
  width,
  height,
  margin,
  style,
  padding,
  resizeMode,
  size,
  position,
  source,
  borderColor,
  borderWidth,
  url,
  borderRadius,
  tintColor,
  defaultSource,
  backgroundColor,
  transform,
  ...props
}) => {
  return (
    <Image
      tintColor={tintColor} //works on android only
      source={source ? source : {uri: url}}
      defaultSource={defaultSource}
      resizeMode={resizeMode ? resizeMode : 'contain'}
      style={[
        margin ? handleMargin(margin) : undefined,
        padding ? handlePadding(padding) : undefined,
        borderWidth ? borderWidth : undefined,
        borderColor ? borderColor : undefined,
        styles.container,
        position && {alignSelf: position},
        style,
        width && height && {width: width, height: height},
        tintColor&&{tintColor},
        borderRadius&&{borderRadius},
        backgroundColor&&{backgroundColor},
        size && {width: size, height: size},
        transform&&{
          transform:[{ rotate: '90deg' }]
        }
      ]}
      
      >
      {children}
    </Image>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: wp(5),
    height: wp(5),
  },
  s1: {width: wp(7), height: wp(7)},
  s2: {width: wp(5.5), height: wp(5.5)},
  s3: {width: wp(5), height: wp(5)},
  s4: {width: wp(4.5), height: wp(4.5)},
  s5: {width: wp(4), height: wp(4)},
  s6: {width: wp(3.5), height: wp(3.5)},
  s7: {width: wp(3), height: wp(3)},
  s8: {width: wp(2.5), height: wp(2.5)},
  header: {width: wp(5), height: wp(5)},
  mc: {width: wp(4), height: wp(4)}, //modal close
});
export default Icon;
