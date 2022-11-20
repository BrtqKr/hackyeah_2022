import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { radiusMap } from '../../theme/Constants';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult } from 'expo-image-picker/src/ImagePicker.types';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../theme/Colors';

const IMAGE_SIDE = 100;
const IMAGE_RADIUS = 9999;

export const TaskDetails = (task: any) => {
  const [image, setImage] = useState<string | undefined>(undefined);

  const pickImage = async () => {
    const result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const addCompletedTask = async () => {
    console.log(image);
  };

  return (
    <ScrollView>
      <View style={{ paddingBottom: 60, backgroundColor: '#fff' }}>
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
            <View
              style={{
                position: 'absolute',
                flex: 1,
                flexDirection: 'row',
                top: 30,
                right: 30,
              }}
            >
              <Text style={{ paddingRight: 10 }}>In progress</Text>
              <Feather name="loader" size={24} color="orange" />
            </View>
            <View
              style={{
                marginTop: 80,
              }}
            >
              <Text>25th November 2022</Text>
            </View>

            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text style={styles.taskNameText}>Water the plants</Text>
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
          <TouchableOpacity onPress={pickImage} style={styles.uploadedImageTouchable}>
            <ImageBackground
              style={styles.uploadedImageBackground}
              imageStyle={{ borderRadius: 25 }}
              source={{ uri: image }}
            >
              {image == undefined ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Feather name="upload" size={60} color="#B5B5B5" />
                  <Text style={{ color: '#B5B5B5', fontSize: 12, paddingTop: 6 }}>
                    Dodaj zdjęcie
                  </Text>
                </View>
              ) : null}
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonOpacity}
            disabled={image == undefined}
            onPress={addCompletedTask}
          >
            <View style={[styles.button, !image && { backgroundColor: '#EDEDED' }]}>
              <Text style={[styles.buttonTitle, !image && { color: '#B5B5B5' }]}>
                Zatwierdź zadanie
              </Text>
            </View>
          </TouchableOpacity>
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
    flex: 1,
    alignItems: 'center',
  },
  uploadedImageTouchable: {
    marginTop: 40,
    height: 230,
    width: 230,
  },
  uploadedImageBackground: {
    height: 230,
    width: 230,
    backgroundColor: '#EDEDED',
    borderRadius: 25,
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.Primary1,
    borderRadius: 40,
    height: 48,
    width: 140,
    justifyContent: 'center',
  },
  buttonTitle: {
    color: Colors.White1,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
  },
  buttonOpacity: {
    marginTop: 38,
    marginBottom: 60,
    flex: 1,
    alignItems: 'center',
  },
});

export default TaskDetails;
