import { Feather } from '@expo/vector-icons';
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

export const AnimatedStatistics = () => {
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const missionsCompleted = useSharedValue(0);
  const rankPosition = useSharedValue(0);

  const missionsRef = useRef<LoadingBarRef>(null);
  const rankRef = useRef<LoadingBarRef>(null);

  const missionsText = useDerivedValue(() => {
    return `${Math.floor(missionsCompleted.value)} missions out of 90`;
  });
  const rankText = useDerivedValue(() => {
    return `Rank ${Math.floor(rankPosition.value)} out of x`;
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (isFocused) {
      setLoading(true);
      timeout = setTimeout(() => {
        setLoading(false);
        setTimeout(() => {
          missionsRef.current?.animateTo(50);
          missionsCompleted.value = withTiming(45, { duration: 2500 });
          rankRef.current?.animateTo(50);
          rankPosition.value = withTiming(45, { duration: 2500 });
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
            name="clipboard"
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
          text={missionsText}
          numberOfLines={1}
        />
        <View style={{ height: 8 }} />

        <LoadingBar ref={missionsRef} />
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={styles.iconContainer}>
          <Feather
            name="award"
            size={40}
            color={Colors.Dark3}
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          />
        </View>
        <ReText
          style={[Typography.text3, styles.text, { marginTop: 16, fontWeight: '500' }]}
          text={rankText}
          numberOfLines={2}
        />
        <View style={{ height: 8 }} />
        <LoadingBar ref={rankRef} />
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
    paddingTop: 100,
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
