import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { ComponentPropsWithoutRef, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ApiResponse, TasksWithMetadata } from '../../axios/types';
import { AppCoreStackParamList } from '../../navigation/navigators/AppCoreNavigator/AppCoreNavigator';
import { TaskNavigatorStackParamList } from '../../navigation/navigators/AppCoreNavigator/TasksNavigator/TaskNavigator';
import { Colors } from '../../theme/Colors';
import { Typography } from '../../theme/Typography/Typography';
import { ScreenWrapper } from '../shared';
import { TaskStatus } from '../../navigation/navigators/AppCoreNavigator/TasksNavigator/types';
import { Feather } from '@expo/vector-icons';
import { sizeMap } from '../../theme/Iconography';

type Navigation = StackNavigationProp<AppCoreStackParamList>;

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

const Card = ({ ...task }: ArrayElement<ApiResponse<TasksWithMetadata>['data']>) => {
  const { navigate } = useNavigation<Navigation>();

  const { iconText, ...iconProps } = statusToImageStyle[getStatus(task)];

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigate('TaskDetailsRoute', { taskId: task.id })}>
        <View style={[styles.row, { marginBottom: 16 }]}>
          <Text style={Typography.text2}>{task.attributes.date_started.substring(0, 10)}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={Typography.text2}>{iconText}</Text>
            <Feather style={{ marginLeft: 4 }} size={sizeMap.Regular} {...iconProps} />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.description}>
            <Text style={[Typography.text1, { marginBottom: 8 }]}>{task.attributes.title}</Text>
            <Text style={[Typography.text3]}>{task.attributes.description}</Text>
          </View>
          <Image
            style={styles.image}
            source={{
              uri: 'http://188.68.236.47' + task.attributes.media.data?.attributes.url,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const StoryList = ({ tasks }: { tasks: ApiResponse<TasksWithMetadata>['data'] }) => {
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
        <Text style={[Typography.text1, styles.headerText]}>Your stories</Text>
        <FlatList
          style={styles.flatList}
          data={tasks}
          renderItem={({ item }) => <Card {...item} />}
        />
      </Animated.View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenWraper: {
    padding: 16,
    paddingBottom: 130,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  flatList: {},
  headerText: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: Colors.White1,
    borderRadius: 24,
    padding: 16,
    width: '100%',
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
  },
  description: {
    flexShrink: 1,
  },
});
