import React from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { radiusMap } from '../../theme/Constants';

const IMAGE_SIDE = 100;
const IMAGE_RADIUS = 9999;

export const TaskDetails = (task: any) => {
  return (
    <ScrollView>
      <View style={{ paddingBottom: 110 }}>
        <View style={styles.header}>
          <View style={{ padding: 50 }}></View>
          <View style={styles.taskDetails}>
            <View style={styles.taskAvatar}>
              <Image
                style={{ height: IMAGE_SIDE, width: IMAGE_SIDE }}
                source={{
                  uri: 'https://pics.freeicons.io/uploads/icons/png/3158397191660787374-512.png',
                }}
              />
            </View>
            <View style={styles.taskName}>
              <Text style={styles.taskNameText}>Lorem impsum doloret sit amet</Text>
            </View>
            <View style={styles.taskDescription}>
              <Text style={styles.taskDescriptionText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.uploadedImage}>
          <View style={styles.uploadedImageTitle}>
            <Text style={styles.taskNameText}>Your uploaded image:</Text>
          </View>
          <Image
            source={{
              uri: 'https://cdn.sanity.io/images/y346iw48/production/a59cbb8951fa663a7ffeef5324e1cf7037a70b57-4000x2250.jpg',
            }}
            style={{ width: 400, height: 200 }}
          ></Image>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#991B1B',
    overflow: 'hidden',
  },
  taskDetails: {
    borderTopRightRadius: radiusMap.XLarge,
    borderTopLeftRadius: radiusMap.XLarge,
    backgroundColor: '#fff',
    padding: 20,
  },
  taskAvatar: {
    overflow: 'hidden',
    borderRadius: IMAGE_RADIUS,
    borderWidth: 6,
    borderColor: '#fff',
    backgroundColor: '#86efac',
    padding: 10,
    position: 'absolute',
    top: -50,
    left: 25,
  },
  taskName: {
    marginTop: 80,
  },
  taskNameText: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
  },
  taskDescription: {
    marginTop: 15,
    marginRight: 40,
  },
  taskDescriptionText: {
    fontSize: 16,
  },
  uploadedImage: {
    backgroundColor: '#fff',
  },
  uploadedImageTitle: {
    padding: 20,
  },
});

export default TaskDetails;
