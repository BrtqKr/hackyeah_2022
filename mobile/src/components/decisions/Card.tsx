import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withTiming,
  cancelAnimation,
  interpolate,
  Extrapolate,
  runOnUI,
  runOnJS,
} from 'react-native-reanimated';
import { Colors } from '../../theme/Colors';
import { Typography } from '../../theme/Typography/Typography';

type CardProps = {
  leftText: string;
  rightText: string;
  selectLeftOption: () => void;
  selectRightOption: () => void;
};

export const Card = ({ leftText, rightText, selectLeftOption, selectRightOption }: CardProps) => {
  const xTranslation = useSharedValue<number>(0);
  const yTranslation = useSharedValue<number>(0);
  const flipAnimation = useSharedValue<number>(1);

  const wrapperTranslationStyles = useAnimatedStyle(() => ({
    transform: [
      {
        rotateZ: `${interpolate(
          xTranslation.value,
          [-50, 50],
          [-0.05, 0.05],
          Extrapolate.EXTEND
        )}rad`,
      },
      {
        translateX: xTranslation.value,
      },
      {
        translateY: yTranslation.value,
      },
    ],
  }));

  const animatedRightTextWrapper = useAnimatedStyle(() => ({
    transform: [
      {
        rotateZ: `${interpolate(xTranslation.value, [0, 50], [0, -0.03], Extrapolate.EXTEND)}rad`,
      },
    ],
  }));

  const animatedLeftTextWrapper = useAnimatedStyle(() => ({
    transform: [
      {
        rotateZ: `${interpolate(xTranslation.value, [-50, 0], [-0.03, 0], Extrapolate.EXTEND)}rad`,
      },
    ],
  }));

  const commonFlipValues = useCallback((value: number) => {
    'worklet';
    return {
      transform: [
        { scale: interpolate(value, [1, 1.5, 2], [1, 1.2, 1]) },
        { perspective: value * 180 },
        { rotateY: `${value * 180}deg` },
      ],
    };
  }, []);

  const animatedFlip = useAnimatedStyle(() => ({
    opacity: flipAnimation.value <= 1.5 ? 1 : 0,
    ...commonFlipValues(flipAnimation.value),
  }));

  const animatedBackFlip = useAnimatedStyle(() => ({
    opacity: flipAnimation.value >= 1.5 ? 1 : 0,
    ...commonFlipValues(flipAnimation.value),
  }));

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number; startY: number }
  >({
    onStart: (_, ctx) => {
      cancelAnimation(xTranslation);
      cancelAnimation(yTranslation);
      ctx.startX = xTranslation.value;
      ctx.startY = yTranslation.value;
    },
    onActive: (event, ctx) => {
      xTranslation.value = event.translationX + ctx.startX;
      yTranslation.value = event.translationY + ctx.startY;
    },
    onEnd: (event) => {
      const tossRange = event.translationX + 0.2 * event.velocityX;
      if (tossRange > 150) {
        xTranslation.value = withTiming(400);
        runOnJS(selectLeftOption)();
      } else if (tossRange < -150) {
        xTranslation.value = withTiming(-400);
        runOnJS(selectRightOption)();
      } else {
        xTranslation.value = withTiming(0);
      }
      yTranslation.value = withTiming(0);
    },
  });

  console.log('Card rendered');
  return (
    <>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.container, wrapperTranslationStyles]}>
          <Animated.View style={[styles.flipContainer, animatedFlip]}>
            <Animated.View style={[styles.textWrapper, animatedLeftTextWrapper]}>
              <Text style={styles.text}>{leftText}</Text>
            </Animated.View>
            <Animated.View style={[styles.textWrapper, animatedRightTextWrapper]}>
              <Text style={styles.text}>{rightText}</Text>
            </Animated.View>
          </Animated.View>
          <Animated.View
            style={[styles.flipContainer, animatedBackFlip, { backgroundColor: Colors.Primary2 }]}
          ></Animated.View>
        </Animated.View>
      </PanGestureHandler>
      <Button
        title="Flip"
        onPress={() =>
          (flipAnimation.value = withTiming(flipAnimation.value === 1 ? 2 : 1, { duration: 1000 }))
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 500,
  },
  flipContainer: {
    position: 'absolute',
    padding: 20,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: 'blue',
    overflow: 'hidden',
    borderRadius: 40,
  },
  textWrapper: {
    backgroundColor: Colors.Black3,
    width: '130%',
    left: '-15%',
    top: '-15%',
    paddingTop: '25%',
    padding: 16,
    paddingHorizontal: '15%',
    position: 'absolute',
  },
  text: {
    ...Typography.t1Regular,
  },
});
