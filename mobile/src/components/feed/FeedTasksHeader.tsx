import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme/Colors';
import { radiusMap } from '../../theme/Constants';

const IMAGE_HEIGHT = 200;
const IMAGE_RADIUS = radiusMap.XLarge - 12;

export const FeedTasksHeader = (task: any) => {
  const { top } = useSafeAreaInsets();
  const HEADER_HEIGHT = top + 150;

  return (
    <View style={[styles.container, { height: HEADER_HEIGHT }]}>
      <View />
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
