import React, { ComponentPropsWithoutRef, useState } from 'react';
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
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppCoreStackParamList } from '../../navigation/navigators/AppCoreNavigator/AppCoreNavigator';
import { useAuthContext } from '../../auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import * as Api from '../../axios/api';
import { ApiResponse, TasksWithMetadata } from '../../axios/types';
import { TaskStatus } from '../../navigation/navigators/AppCoreNavigator/TasksNavigator/types';
import { Typography } from '../../theme/Typography/Typography';
import { sizeMap } from '../../theme/Iconography';

const IMAGE_SIDE = 100;
const IMAGE_RADIUS = 9999;

type Route = RouteProp<AppCoreStackParamList, 'TaskDetailsRoute'>;

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type IconName = Pick<ComponentPropsWithoutRef<typeof Feather>, 'name'>;

const statusToImageStyle: Record<TaskStatus, IconName & { color: string; iconText: string }> = {
  failed: {
    name: 'slash',
    color: Colors.Primary1,
    iconText: 'Overdue',
  },
  inProgress: {
    name: 'loader',
    color: '#eab308',
    iconText: 'In progress',
  },
  completed: {
    name: 'check-circle',
    color: Colors.Success1,
    iconText: 'Done',
  },
};

const getStatus = (item: ArrayElement<ApiResponse<TasksWithMetadata>['data']>): TaskStatus => {
  if (item.attributes.task_completions.data.length !== 0) return 'completed';
  const unixTimeZero = Date.parse(item.attributes.date_finished);
  if (unixTimeZero < Date.now()) {
    return 'failed';
  }
  return 'inProgress';
};

export const TaskDetails = () => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const route = useRoute<Route>();
  const { user } = useAuthContext();

  const { data, isLoading } = useQuery(
    ['getTaskCompletions', { id: 1 }], // query key
    () => Api.getTasksWithCompletions(user?.id || 0)
  );

  const selectedTask = data?.data.filter((task) => task.id === route.params.taskId)[0];
  const { iconText, ...iconProps } = selectedTask
    ? statusToImageStyle[getStatus(selectedTask)]
    : { iconText: '' };

  if (!isLoading && !selectedTask) {
    return null;
  }

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
                style={{ height: IMAGE_SIDE, width: IMAGE_SIDE, resizeMode: 'stretch' }}
                source={{
                  uri: 'http://188.68.236.47' + selectedTask?.attributes.media.data?.attributes.url,
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
              <Text style={Typography.text2}>{iconText}</Text>
              <Feather style={{ marginLeft: 4 }} size={sizeMap.Regular} {...iconProps} />
            </View>
            <View
              style={{
                marginTop: 80,
              }}
            >
              <Text>{selectedTask?.attributes.date_started.substring(0, 10)}</Text>
            </View>

            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text style={styles.taskNameText}>{selectedTask?.attributes.title}</Text>
            </View>
            <View style={styles.taskDescription}>
              <Text style={styles.taskDescriptionText}>{selectedTask?.attributes.description}</Text>
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
                  <Text style={{ color: '#B5B5B5', fontSize: 12, paddingTop: 6 }}>Add photo</Text>
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
              <Text style={[styles.buttonTitle, !image && { color: '#B5B5B5' }]}>Check task</Text>
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
