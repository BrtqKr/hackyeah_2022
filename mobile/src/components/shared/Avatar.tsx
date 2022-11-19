import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { Colors } from '../../theme/Colors';
import { fontSize } from '../../theme/Typography/textProperties';

export type AvatarProps = {
  image?: string;
  name: string;
  size?: 'small' | 'big';
};

export const Avatar = ({ image, name, size = 'small' }: AvatarProps) => {
  const initials = name
    .split(' ')
    .map((word) => word[0].toUpperCase())
    .join('');
  return (
    <View style={[styles.wrapper, size == 'small' ? styles.small : styles.big]}>
      <Text style={[size == 'small' ? styles.textSmall : styles.textBig]}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
  },
  big: {
    width: '50%',
    aspectRatio: 1,
    borderRadius: 100,
  },
  small: {
    width: 40,
    height: 40,
  },
  textSmall: {
    fontSize: fontSize.XSmall,
    color: Colors.White,
  },
  textBig: {
    fontSize: fontSize.XXXLarge,
    color: Colors.White,
  },
});
