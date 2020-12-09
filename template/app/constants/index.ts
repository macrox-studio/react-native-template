import {Dimensions} from 'react-native';

export * from './screens';

// UI constants

const {width, height} = Dimensions.get('screen');

export const MIN_SCREEN_SIZE: number = Math.min(width, height);
// export const MAX_TABLE_CONTENT_WIDTH = height / Math.max(1.6, height / width);
export const SHARED_DURATION: number = 320;
