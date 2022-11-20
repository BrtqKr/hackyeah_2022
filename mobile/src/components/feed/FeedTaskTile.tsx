import { Feather, FontAwesome } from '@expo/vector-icons';
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
import { useAuthContext } from '../../auth/AuthProvider';
import { TaskCompletion } from '../../axios/types';
import { Colors } from '../../theme/Colors';
import { radiusMap } from '../../theme/Constants';
import { sizeMap } from '../../theme/Iconography';
import { Typography } from '../../theme/Typography/Typography';
import { Avatar } from '../shared';
import BlurWrapper from '../shared/BlurWrapper';

const IMAGE_RADIUS = radiusMap.XLarge - 12;

const mockImages: MockImage[] = [
  {
    url: 'https://thispersondoesnotexist.com/image',
    status: 'Jane Morgan',
  },
  {
    url: 'https://i1.sndcdn.com/avatars-000529882611-ht5r1v-t500x500.jpg',
    status: 'Patrick Bateman',
  },
  {
    url: 'https://thispersondoesnotexist.com/image',
    status: 'John Doe',
  },
  {
    url: 'https://thispersondoesnotexist.com/image',
    status: 'Stanley Brave',
  },
  {
    url: 'https://thispersondoesnotexist.com/image',
    status: 'Włodzimierz Biały',
  },
  {
    url: 'https://thispersondoesnotexist.com/image',
    status: 'Szaweł dobry człowiek',
  },
];

export const FeedTaskTile = ({
  tileIndex,
  taskCompletion,
}: {
  tileIndex: number;
  taskCompletion: TaskCompletion;
}) => {
  const animationProgress = useSharedValue(1.7);
  const { user } = useAuthContext();

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
          <BlurWrapper
            style={{
              width: '100%',
              height: 50,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              position: 'absolute',
              zIndex: 100,
            }}
          >
            <View
              style={{
                position: 'absolute',
                top: 8,
                left: 12,
                zIndex: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image
                style={styles.avatar}
                source={{
                  uri: mockImages[tileIndex].url,
                }}
              />
              <Text style={[Typography.text1, { color: Colors.White1 }]}>
                {mockImages[tileIndex].status}
              </Text>
            </View>
          </BlurWrapper>
          <View>
            <View style={{ overflow: 'hidden', borderRadius: IMAGE_RADIUS }}>
              <Image
                style={{ aspectRatio: 1, backgroundColor: Colors.Dark3 }}
                source={{
                  uri: 'http://188.68.236.47' + taskCompletion.media.data?.attributes.url,
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
                      {taskCompletion.task.data?.attributes.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}
                    >
                      <TouchableOpacity onPress={() => {}}>
                        <FontAwesome
                          name={
                            taskCompletion.liked_by.data.some((el) => el.id == user?.id)
                              ? 'heart'
                              : 'heart-o'
                          }
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
                      {taskCompletion.task.data?.attributes.description}
                    </Text>
                  </View>
                </View>
                <View
                  style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.1)' }]}
                />
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
