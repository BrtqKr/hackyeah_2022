import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { TaskNavigatorStackParamList } from '../../navigation/navigators/AppCoreNavigator/TasksNavigator/TaskNavigator';
import { Colors } from '../../theme/Colors';
import { Typography } from '../../theme/Typography/Typography';
import { ScreenWrapper } from '../shared';

type Navigation = StackNavigationProp<TaskNavigatorStackParamList>;

const Card = () => {
  const { navigate } = useNavigation<Navigation>();

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigate('TaskDetailsRoute', { taskId: 'lol' })}>
        <View style={[styles.row, { marginBottom: 16 }]}>
          <Text style={Typography.text2}>{'25th November 2022'}</Text>
          <Text style={Typography.text2}>Overdue</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.description}>
            <Text style={[Typography.text1, { marginBottom: 8 }]}>Water the plants</Text>
            <Text style={[Typography.text3]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>
          <Image
            style={styles.image}
            source={{
              uri: 'https://pics.freeicons.io/uploads/icons/png/6598119471660787374-512.png',
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const StoryList = () => {
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
          data={[1, 2, 3]}
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
  screenWraper: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  flatList: {},
  flatListColumn: {},
  flatListContainer: {},
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
