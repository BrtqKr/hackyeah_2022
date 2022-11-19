import { Feather, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../theme/Colors';
import { radiusMap } from '../../theme/Constants';
import { sizeMap } from '../../theme/Iconography';
import { Typography } from '../../theme/Typography/Typography';
import BlurWrapper from '../shared/BlurWrapper';

const IMAGE_HEIGHT = 200;
const IMAGE_RADIUS = radiusMap.XLarge - 12;

export const FeedTaskTile = (task: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: task?.author?.avatarUrl ?? undefined,
          }}
        />
        <View style={{}}>
          <Text style={[Typography.text3, styles.userName]}>{task?.author?.name}</Text>
          <Text style={[Typography.text4, styles.userRole]}>CEO</Text>
        </View>
      </View>

      <View style={{ padding: 12 }}>
        <View style={{ overflow: 'hidden', borderRadius: IMAGE_RADIUS }}>
          <Image
            style={{ height: IMAGE_HEIGHT }}
            source={{
              uri: task.imageUrl,
            }}
          />
          <BlurWrapper style={styles.blurWrapper}>
            <Text style={[Typography.text2, { fontWeight: 'bold', color: Colors.White1 }]}>
              {task.title}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => {}}>
                <FontAwesome
                  name={task.likedByYou ? 'heart-o' : 'heart'}
                  size={sizeMap.Regular}
                  color={Colors.White1}
                  style={{ marginRight: 8 }}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}}>
                <Feather name={'message-circle'} size={sizeMap.Regular} color={Colors.White1} />
              </TouchableOpacity>
            </View>
          </BlurWrapper>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#991B1B',
    borderRadius: radiusMap.XLarge,
    overflow: 'hidden',
  },
  userInfoContainer: { padding: 16, paddingBottom: 4, flexDirection: 'row' },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: radiusMap.Circle,
    borderColor: Colors.White1,
    borderWidth: 1.5,
    marginRight: 10,
  },
  blurWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userName: { fontWeight: 'bold', color: Colors.White1 },
  userRole: { fontWeight: 'bold', color: Colors.White1, opacity: 0.8 },
});
