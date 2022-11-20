import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../theme/Colors';
import { radiusMap } from '../../theme/Constants';
import { Typography } from '../../theme/Typography/Typography';

const AVATAR_SIZE = 140;

const USER = { name: 'Patrick Bateman', role: 'CEO' };

export const ProfileDetails = () => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Image
        style={styles.avatar}
        source={{
          uri: 'https://i1.sndcdn.com/avatars-000529882611-ht5r1v-t500x500.jpg',
        }}
      />
      <View>
        <Text
          style={[
            Typography.text1,
            {
              color: Colors.Dark1,
              fontWeight: '500',
              marginTop: 16,
              marginLeft: 8,
            },
          ]}
        >
          {USER.name}
        </Text>
        <Text
          style={[
            Typography.text2,
            {
              color: Colors.Dark1,
              fontWeight: '300',
              marginLeft: 8,
            },
          ]}
        >
          {USER.role}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: radiusMap.Circle,
    borderColor: Colors.White1,
    borderWidth: 4,
    marginTop: -AVATAR_SIZE / 3,
    marginLeft: 24,
  },
});
