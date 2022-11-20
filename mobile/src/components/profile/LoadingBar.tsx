import React, { forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Colors } from '../../theme/Colors';
import { radiusMap } from '../../theme/Constants';

export type LoadingBarRef = {
  animateTo: (percent: number) => void;
};
const LoadingBar = forwardRef<LoadingBarRef>((props, ref) => {
  const width = useSharedValue(0);
  const widthFilled = useSharedValue(0);

  useImperativeHandle(ref, () => ({
    animateTo: (percentage: number) =>
      (widthFilled.value = withTiming((percentage / 100) * width.value, { duration: 2500 })),
  }));

  const filledStyles = useAnimatedStyle(() => {
    return {
      opacity: 1,
      transform: [{ translateX: -width.value + widthFilled.value }],
    };
  });
  return (
    <View
      style={styles.emptyBar}
      onLayout={(event) => (width.value = event.nativeEvent.layout.width)}
    >
      <Animated.View style={[styles.fullBar, filledStyles]} />
    </View>
  );
});

LoadingBar.displayName = 'LoadingBar';
export default LoadingBar;

const styles = StyleSheet.create({
  emptyBar: {
    width: '80%',
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    overflow: 'hidden',
    borderRadius: radiusMap.Circle,
  },
  fullBar: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.Dark3,
    opacity: 0,
  },
});
