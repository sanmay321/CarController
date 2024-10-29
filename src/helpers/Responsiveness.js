import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
// Determine actual dimensions based on orientation
const actualDimensions = {
    height: (height < width) ? width : height,
    width: (width > height) ? height/1.8 : width
    // height: (height < width) ? 700 : height,
    // width: (width > height) ? 500 : width
  };

// Utility functions to get percentage of width and height
export const wp = (p) => width * (p / 100);
export const hp = (p) => height * (p / 100);



