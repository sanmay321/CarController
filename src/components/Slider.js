import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../constants/colorsPallet';
import { hp, wp } from '../helpers/Responsiveness';
import Slider from '@react-native-community/slider';
import { globalPath } from '../constants/globalPath';
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler';

const CustomSlider = ({ Value,OnValueChange,bottom }) => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TapGestureHandler>
        <View style={styles.sliderContainer}>
          <LinearGradient
            colors={['#befda2', '#fbeba1', '#f19c9a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
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
            value={Value}
            onValueChange={OnValueChange}
            minimumTrackTintColor="transparent"
            maximumTrackTintColor={colors.transparent}
            thumbTintColor={colors.grey1}
            trackImage={globalPath.Ellipse4}
          />
        </View>
      </TapGestureHandler>
    </GestureHandlerRootView>
  );
};

export default CustomSlider;

const styles = StyleSheet.create({
  sliderContainer: {
    width: wp(20),
    height: hp(6),
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.grey2,
    borderRadius: 20,
    paddingHorizontal: 5,
    alignItems: 'center',
    zIndex: 1,
  },
  gradientTrack: {
    position: 'absolute',
    width: '95%',
    height: 10,
    borderRadius: 5,
  },
  slider: {
    width: '100%',
    height: 10,
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
