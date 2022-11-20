import React, { ComponentPropsWithoutRef, useEffect } from 'react';
import { FlatList, Text, View, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TaskNavigatorStackParamList } from '../../navigation/navigators/AppCoreNavigator/TasksNavigator/TaskNavigator';
import { TaskStatus } from '../../navigation/navigators/AppCoreNavigator/TasksNavigator/types';
import { sizeMap } from '../../theme/Iconography';
import { ScreenWrapper } from '../shared';
import { Colors } from '../../theme/Colors';
import { Typography } from '../../theme/Typography/Typography';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

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

type Navigation = StackNavigationProp<TaskNavigatorStackParamList>;

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

const Card = ({ index }: { index: number }) => {
  const { url, status } = mockImages[index % mockImages.length];
  const { backgroundColor, ...iconProps } = statusToImageStyle[status];
  const { navigate } = useNavigation<Navigation>();
  return (
    <TouchableOpacity onPress={() => navigate('TaskDetailsRoute', { taskId: 'lol' })}>
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
              uri: url,
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
            <Text style={styles.thumbnailText}>Lorem ipsum doloret sit amet</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TasksList = () => {
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
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          numColumns={2}
          renderItem={({ index }) => <Card index={index} />}
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
