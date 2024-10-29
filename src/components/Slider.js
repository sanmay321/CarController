import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../constants/colorsPallet';
import {hp, wp} from '../helpers/Responsiveness';
import Slider from '@react-native-community/slider';
import {globalPath} from '../constants/globalPath';

const CustomSlider = ({bottom}) => {
  return (
    <View style={[styles.sliderContainer,]}>
      <LinearGradient
        colors={['#befda2', '#fbeba1', '#f19c9a']} // Gradient colors
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradientTrack}
      />
      {/* Dots on the track */}
      <View style={styles.dotsContainer}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="transparent" // Hide default track color
        maximumTrackTintColor={colors.transparent} // Hide default track color
        thumbTintColor={colors.grey1} // Customize thumb color
        trackImage={globalPath.Ellipse4}
        // maximumTrackImage={globalPath.Ellipse4}
        // step={3}
      />
    </View>
  );
};

export default CustomSlider;

const styles = StyleSheet.create({
  sliderContainer: {
    width: wp(20),
    height: hp(6),
    justifyContent: 'center',
    alignSelf: 'center',
    // bottom: hp(20),
    backgroundColor: colors.grey2,
    borderRadius: 20,
    paddingHorizontal: 5,
    alignItems: 'center',
    zIndex: 1,
    // position: 'absolute',
  },
  gradientTrack: {
    position: 'absolute',
    width: '95%',
    height: 10, // Adjust height based on your preference
    borderRadius: 5, // Rounded edges
  },
  slider: {
    width: '100%',
    height: 10,
    // backgroundColor:'red'
  },
  dotsContainer: {
    position: 'absolute',
    width: '100%',
    height: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.grey1,
  },
});
