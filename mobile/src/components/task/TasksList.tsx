import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { ComponentPropsWithoutRef, useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ApiResponse, TasksWithMetadata } from '../../axios/types';
import { AppCoreStackParamList } from '../../navigation/navigators/AppCoreNavigator/AppCoreNavigator';
import { TaskStatus } from '../../navigation/navigators/AppCoreNavigator/TasksNavigator/types';
import { Colors } from '../../theme/Colors';
import { sizeMap } from '../../theme/Iconography';
import { Typography } from '../../theme/Typography/Typography';
import { ScreenWrapper } from '../shared';

interface MockImage {
  url: string;
  status: TaskStatus;
}

const mockImages: MockImage[] = [
  {
    url: 'https://pics.freeicons.io/uploads/icons/png/16793418481660787373-512.png',
    status: 'completed',
  },
  {
    url: 'https://pics.freeicons.io/uploads/icons/png/19834518941660787373-512.png',
    status: 'inProgress',
  },
  {
    url: 'https://pics.freeicons.io/uploads/icons/png/3158397191660787374-512.png',
    status: 'inProgress',
  },
  {
    url: 'https://pics.freeicons.io/uploads/icons/png/2208061731660787373-512.png',
    status: 'failed',
  },
  {
    url: 'https://pics.freeicons.io/uploads/icons/png/6598119471660787374-512.png',
    status: 'failed',
  },
  {
    url: 'https://pics.freeicons.io/uploads/icons/png/19834518941660787373-512.png',
    status: 'completed',
  },
];

type Navigation = StackNavigationProp<AppCoreStackParamList>;

type IconName = Pick<ComponentPropsWithoutRef<typeof Feather>, 'name'>;

const statusToImageStyle: Record<
  TaskStatus,
  IconName & { color: string; backgroundColor: string }
> = {
  failed: {
    name: 'slash',
    color: Colors.Primary1,
    backgroundColor: '#fca5a566',
  },
  inProgress: {
    name: 'loader',
    color: '#eab308',
    backgroundColor: '#fed7aa66',
  },
  completed: {
    name: 'check-circle',
    color: Colors.Success1,
    backgroundColor: '#86efac66',
  },
};

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

const getStatus = (
  item: ArrayElement<ApiResponse<TasksWithMetadata>['data']>
): MockImage['status'] => {
  if (item.attributes.task_completions.data.length !== 0) return 'completed';
  const unixTimeZero = Date.parse(item.attributes.date_finished);
  if (unixTimeZero < Date.now()) {
    return 'failed';
  }
  return 'inProgress';
};

const Card = ({
  index,
  ...item
}: { index: number } & ArrayElement<ApiResponse<TasksWithMetadata>['data']>) => {
  const { url } = mockImages[index % mockImages.length];

  const { backgroundColor, ...iconProps } = statusToImageStyle[getStatus(item)];
  const { navigate } = useNavigation<Navigation>();

  const imageUrl = item.attributes.media.data?.attributes.url
    ? 'http://188.68.236.47' + item.attributes.media.data?.attributes.url
    : url;

  return (
    <TouchableOpacity onPress={() => navigate('TaskDetailsRoute', { taskId: item.id })}>
      <View
        style={[
          styles.card,
          { backgroundColor },
          index % 2 === 0
            ? {
                marginRight: 20,
              }
            : {
                marginLeft: 20,
              },
        ]}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={styles.image}
            source={{
              uri: imageUrl,
            }}
          />
          <Feather
            style={{ position: 'absolute', top: 5, right: 5 }}
            size={sizeMap.Regular}
            {...iconProps}
          />
        </View>
        <View style={styles.thumbnailContainer}>
          <View style={styles.thumbnail}>
            <Text style={styles.thumbnailText}>{item.attributes.title}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TasksList = ({ tasks }: { tasks: ApiResponse<TasksWithMetadata>['data'] }) => {
  const animationProgress = useSharedValue(0);

  useEffect(() => {
    animationProgress.value = withTiming(1, { duration: 1000 });
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: animationProgress.value,
    };
  }, []);

  return (
    <ScreenWrapper style={styles.screenWraper}>
      <Animated.View style={animatedStyles}>
        <Text style={Typography.text1}>Your ongoing tasks</Text>
        <FlatList
          style={styles.flatList}
          data={tasks}
          numColumns={2}
          renderItem={({ item, index }) => <Card index={index} {...item} />}
          columnWrapperStyle={styles.flatListColumn}
          contentContainerStyle={styles.flatListContainer}
        />
      </Animated.View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 75,
    height: 75,
    margin: 'auto',
  },
  card: {
    width: 130,
    height: 130,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  thumbnailContainer: { marginTop: 'auto', marginBottom: 0 },
  thumbnail: {
    margin: 'auto',
    marginBottom: 0,
    padding: 2,
    alignItems: 'center',
    backgroundColor: Colors.Secondary2,
    borderRadius: 5,
  },
  flatList: { width: '100%' },
  flatListContainer: { paddingBottom: 120, paddingTop: 30 },
  flatListColumn: { justifyContent: 'center' },
  thumbnailText: { textAlignVertical: 'center', textAlign: 'center', color: Colors.White1 },
  screenWraper: { alignItems: 'center', paddingTop: 16 },
});

export default TasksList;
