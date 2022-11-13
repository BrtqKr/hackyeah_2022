import { TextStyle } from 'react-native';

// FONT SIZES

export enum FontSize {
  XXXLarge = 'XXXLarge',
  XXLarge = 'XXLarge',
  XLarge = 'XLarge',
  Large = 'Large',
  Regular = 'Regular',
  Small = 'Small',
  XSmall = 'XSmall',
}

export const fontSize: { [key in FontSize]: TextStyle['fontSize'] } = {
  XXXLarge: 40,
  XXLarge: 32,
  XLarge: 24,
  Large: 20,
  Regular: 16,
  Small: 12,
  XSmall: 10,
};

// FONT WEIGHTS

export enum FontWeight {
  ExtraBold = 'ExtraBold',
  Bold = 'Bold',
  Regular = 'Regular',
  Light = 'Light',
}

export const fontWeight: { [key in FontWeight]: TextStyle['fontWeight'] } = {
  ExtraBold: '700',
  Bold: '600',
  Regular: '400',
  Light: '300',
};
