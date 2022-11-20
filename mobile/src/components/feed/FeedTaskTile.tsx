import { Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { AppCoreStackParamList } from '../../navigation/navigators/AppCoreNavigator/AppCoreNavigator';
import { Colors } from '../../theme/Colors';
import { radiusMap } from '../../theme/Constants';
import { sizeMap } from '../../theme/Iconography';
import { Typography } from '../../theme/Typography/Typography';
import BlurWrapper from '../shared/BlurWrapper';

const IMAGE_RADIUS = radiusMap.XLarge - 12;

type Navigation = StackNavigationProp<AppCoreStackParamList>;

export const FeedTaskTile = ({ tileIndex, ...task }: { tileIndex: number; task: any }) => {
  const { navigate } = useNavigation<Navigation>();

  const animationProgress = useSharedValue(1.7);

  const fireAnimation = () => {
    setTimeout(() => {
      animationProgress.value = withTiming(2, { duration: 500, easing: Easing.out(Easing.quad) });
    }, 500);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fireAnimation();
    }, 200 + tileIndex * 500);
    return () => clearTimeout(timeout);
  }, []);

  const animatedRotation = useAnimatedStyle(
    () => ({
      opacity: interpolate(animationProgress.value, [1.8, 2], [0, 1], Extrapolation.CLAMP),
      transform: [
        {
          translateY: -312 * (2 - animationProgress.value),
        },
      ],
    }),
    []
  );

  return (
    <Animated.View style={[styles.container, animatedRotation]}>
      <View style={{ paddingHorizontal: 10 }}>
        <View style={styles.container}>
          <View>
            <View style={{ overflow: 'hidden', borderRadius: IMAGE_RADIUS }}>
              <View
                style={{
                  position: 'absolute',
                  top: 8,
                  left: 12,
                  zIndex: 10,
                }}
              >
                <Image
                  style={styles.avatar}
                  source={{
                    uri: task?.author?.avatarUrl ?? undefined,
                  }}
                />
              </View>
              <Image
                style={{ aspectRatio: 1 }}
                source={{
                  uri: task.imageUrl,
                }}
              />
              <BlurWrapper style={styles.blurWrapper}>
                <View style={styles.userInfoContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <Text style={[Typography.text2, { fontWeight: 'bold', color: Colors.White1 }]}>
                      {task.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}
                    >
                      <TouchableOpacity onPress={() => {}}>
                        <FontAwesome
                          name={task.likedByYou ? 'heart-o' : 'heart'}
                          size={sizeMap.Regular}
                          color={Colors.White1}
                          style={{ marginRight: 8 }}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => navigate('CommentsRoute', { taskId: 'taskID' })}
                      >
                        <Feather
                          name={'message-circle'}
                          size={sizeMap.Regular}
                          color={Colors.White1}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ marginTop: 12 }}>
                    <Text style={[Typography.text3, { color: Colors.White1 }]} ellipsizeMode="clip">
                      {task.description}
                    </Text>
                  </View>
                </View>
              </BlurWrapper>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: radiusMap.XLarge,
    overflow: 'hidden',
  },
  userInfoContainer: {
    paddingBottom: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: radiusMap.Circle,
    borderColor: Colors.White1,
    borderWidth: 1.5,
    marginRight: 10,
  },
  blurWrapper: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%',

    justifyContent: 'space-between',
  },
  userName: { fontWeight: 'bold', color: Colors.Dark1 },
  userRole: { fontWeight: 'bold', color: Colors.White1, opacity: 0.8 },
});
