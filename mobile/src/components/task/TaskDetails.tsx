import { Feather } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult } from 'expo-image-picker';
import { format } from 'date-fns'
import React, { ComponentPropsWithoutRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthContext } from '../../auth/AuthProvider';
import * as Api from '../../axios/api';
import { ApiResponse, TasksWithMetadata } from '../../axios/types';
import { AppCoreStackParamList } from '../../navigation/navigators/AppCoreNavigator/AppCoreNavigator';
import { TaskStatus } from '../../navigation/navigators/AppCoreNavigator/TasksNavigator/types';
import { Colors } from '../../theme/Colors';
import { radiusMap } from '../../theme/Constants';
import { ScreenWrapper } from '../shared';

const IMAGE_SIDE = 140;

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

export const TaskDetails = ({ taskId } : { taskId: number }) => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const { goBack } = useNavigation();
  const { top } = useSafeAreaInsets();

  const route = useRoute<Route>();
  const { user } = useAuthContext();

  const { data, isLoading } = useQuery(
    ['getTaskCompletions', { id: taskId }], // query key
    () => Api.getTasksWithCompletions(user?.id || 0)
  );

  console.warn('ROUTE ', route.params.taskId);
  const selectedTask = data?.data.filter((task) => task.id === route.params.taskId)[0];
  const { iconText, ...iconProps } = selectedTask
    ? statusToImageStyle[getStatus(selectedTask)]
    : { iconText: '' };

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

  let formattedDate = ''

  if(selectedTask?.attributes?.date_finished != null) {
    const date = new Date(selectedTask?.attributes?.date_finished || '')
     formattedDate =  format(date, 'do MMMM y')

  }
  if (!isLoading && !selectedTask) {
    return null;
  }

  const addCompletedTask = async () => {
    console.log(image);
  };

  return (
    <ScreenWrapper style={{ backgroundColor: Colors.White1 }}>
      <ScrollView bounces={false}>
        <StatusBar barStyle="light-content" />
        <View style={{ position: 'absolute', top: top, left: 12, zIndex: 30 }}>
          <TouchableOpacity
            onPress={() => goBack()}
            style={{ flexDirection: 'row', alignItems: 'center', marginRight: 4 }}
          >
            <Feather name={'chevron-left'} size={32} color={Colors.White1} />
          </TouchableOpacity>
        </View>

        <View style={styles.topWrapper} />
        <View style={styles.bottomWrapper}>
          <View style={{ zIndex: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={styles.avatar}
                source={{
                  uri: 'http://188.68.236.47' + selectedTask?.attributes.media.data?.attributes.url,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  flex: 1,
                  flexDirection: 'row',
                  top: 30,
                  right: 30,
                  alignItems: 'center',
                }}
              >
                <Text style={{ paddingRight: 10 }}>In progress</Text>
                <Feather name="loader" size={24} color="orange" />
              </View>
            </View>
            <View style={{ paddingHorizontal: 24 }}>
              <View
                style={{
                  marginTop: 32,
                  marginBottom: 12,
                }}
              >
                <Text>{formattedDate}</Text>
              </View>

              <View
                style={{
                  marginTop: 10,
                  marginBottom: 4,
                }}
              >
                <Text style={styles.taskNameText}>{selectedTask?.attributes?.title}</Text>
              </View>
              <View style={styles.taskDescription}>
                <Text
                  style={[
                    {
                      color: Colors.Dark2,
                      fontSize: 14,
                      fontWeight: '400',
                      marginRight: 4,
                    },
                  ]}
                >
                  {selectedTask?.attributes?.description}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.header}></View>
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
              <View style={[styles.button, !image && { backgroundColor: Colors.Secondary3 }]}>
                <Text style={[styles.buttonTitle, !image && { color: '#B5B5B5' }]}>
                  Zatwierdź zadanie
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 500,
  },
  list: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    paddingBottom: 100,
    width: '100%',
    backgroundColor: Colors.White1,
  },
  mainTopBar: {
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexShrink: 1,
    paddingVertical: 12,
    backgroundColor: Colors.PrimaryDark,
  },
  topWrapper: {
    backgroundColor: Colors.PrimaryDark,
    width: '100%',
    height: 215,
  },
  bottomWrapper: {
    backgroundColor: Colors.White1,
    // width: '100%',
    // height: 120,
    borderTopRightRadius: radiusMap.XXLarge,
    borderTopLeftRadius: radiusMap.XXLarge,
    marginTop: -50,
  },
  avatar: {
    width: IMAGE_SIDE,
    height: IMAGE_SIDE,
    borderRadius: radiusMap.Circle,
    borderColor: Colors.White1,
    borderWidth: 4,
    marginTop: -IMAGE_SIDE / 3,
    marginLeft: 24,
    // backgroundColor: '#86efac',
    resizeMode: 'cover',
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
  header: {
    width: '100%',
    backgroundColor: '#991B1B',
    overflow: 'hidden',
  },
  uploadedImage: {
    backgroundColor: Colors.White1,
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
    backgroundColor: '#FDFDFD',
    borderRadius: 25,
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.Primary1,
    borderRadius: 40,
    height: 42,
    width: 180,
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
