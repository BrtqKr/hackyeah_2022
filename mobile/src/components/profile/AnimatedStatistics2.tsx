import { Feather, FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { ReText } from 'react-native-redash';
import { Colors } from '../../theme/Colors';
import { radiusMap } from '../../theme/Constants';
import { Typography } from '../../theme/Typography/Typography';
import LoadingBar, { LoadingBarRef } from './LoadingBar';

export const AnimatedStatistics2 = () => {
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const commentsCompleted = useSharedValue(0);
  const likesPosition = useSharedValue(0);

  const commentsRef = useRef<LoadingBarRef>(null);
  const likesRef = useRef<LoadingBarRef>(null);

  const commentsText = useDerivedValue(() => {
    return `${Math.floor(commentsCompleted.value)} comments`;
  });
  const likesText = useDerivedValue(() => {
    return `${Math.floor(likesPosition.value)} likes`;
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (isFocused) {
      setLoading(true);
      timeout = setTimeout(() => {
        setLoading(false);
        setTimeout(() => {
          commentsRef.current?.animateTo(50);
          commentsCompleted.value = withTiming(45, { duration: 2500 });
          likesRef.current?.animateTo(50);
          likesPosition.value = withTiming(45, { duration: 2500 });
        }, 500);
      }, 1000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isFocused]);

  return !loading ? (
    <Animatable.View animation="slideInDown" duration={600} style={styles.wrapper}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={styles.iconContainer}>
          <Feather
            name="message-circle"
            size={40}
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            color={Colors.Dark3}
          />
        </View>
        <ReText
          style={[Typography.text3, styles.text, { marginTop: 16, fontWeight: '500' }]}
          text={commentsText}
          numberOfLines={1}
        />
        <View style={{ height: 8 }} />

        <LoadingBar ref={commentsRef} />
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={styles.iconContainer}>
          <FontAwesome
            name="heart"
            size={40}
            color={Colors.Dark3}
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          />
        </View>
        <ReText
          style={[Typography.text3, styles.text, { marginTop: 16, fontWeight: '500' }]}
          text={likesText}
          numberOfLines={2}
        />
        <View style={{ height: 8 }} />
        <LoadingBar ref={likesRef} />
      </View>
    </Animatable.View>
  ) : null;
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 200,
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 10,
    borderRadius: radiusMap.Regular,
  },
});
