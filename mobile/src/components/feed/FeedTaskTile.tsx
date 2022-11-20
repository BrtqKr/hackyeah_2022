import { Feather, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../theme/Colors';
import { radiusMap } from '../../theme/Constants';
import { sizeMap } from '../../theme/Iconography';
import { Typography } from '../../theme/Typography/Typography';
import BlurWrapper from '../shared/BlurWrapper';

const IMAGE_RADIUS = radiusMap.XLarge - 12;

export const FeedTaskTile = (task: any) => {
  return (
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

                    <TouchableOpacity onPress={() => {}}>
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
