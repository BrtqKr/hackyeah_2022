import { TextStyle } from 'react-native';
import { Colors } from '../Colors';
import { fontSize } from './textProperties';

const text1: TextStyle = {
  fontSize: fontSize.XLarge,
  color: Colors.Dark1,
};

const text2: TextStyle = {
  fontSize: fontSize.Regular,
  color: Colors.Dark1,
};

const text3: TextStyle = {
  fontSize: fontSize.Small,
  color: Colors.Dark1,
};

const text4: TextStyle = {
  fontSize: fontSize.XSmall,
  color: Colors.Dark1,
};

export const Typography = {
  text1,
  text2,
  text3,
  text4,
};
