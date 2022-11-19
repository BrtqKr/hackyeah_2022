import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { Colors } from '../../theme/Colors';
import { useIsFocused } from '@react-navigation/native';
import LoadingBar, { LoadingBarRef } from './LoadingBar';
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { ReText } from 'react-native-redash';
import { Typography } from '../../theme/Typography/Typography';

export const AnimatedStatistics = () => {
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const missionsCompleted = useSharedValue(0);
  const rankPosition = useSharedValue(0);

  const missionsRef = useRef<LoadingBarRef>(null);
  const rankRef = useRef<LoadingBarRef>(null);

  const missionsText = useDerivedValue(() => {
    return `${Math.floor(missionsCompleted.value)} out of 90`;
  });
  const rankText = useDerivedValue(() => {
    return `${Math.floor(rankPosition.value)} out of x`;
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
      }, 2000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isFocused]);

  return !loading ? (
    <Animatable.View animation="slideInDown" duration={600} style={styles.wrapper}>
      <View>
        <Feather
          name="clipboard"
          size={100}
          style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: 8 }}
          color={Colors.gold1}
        />
        <Text style={[Typography.text2, styles.text]}>Missions finished:</Text>
        <ReText style={[Typography.text2, styles.text]} text={missionsText} numberOfLines={2} />
        <LoadingBar ref={missionsRef} />
      </View>
      <View>
        <Feather
          name="award"
          size={100}
          color={Colors.gold1}
          style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: 8 }}
        />
        <Text style={(Typography.text2, styles.text)}>Position in ranking:</Text>
        <ReText style={[Typography.text2, styles.text]} text={rankText} numberOfLines={2} />
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
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
  },
});
