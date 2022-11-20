import React from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { Colors } from '../../theme/Colors';
import { FeedTaskTile } from './FeedTaskTile';

export const FeedTasksList = () => {
  const FEED_TASKS = [
    {
      title: 'Run 100km',
      imageUrl:
        'https://cdn.sanity.io/images/y346iw48/production/a59cbb8951fa663a7ffeef5324e1cf7037a70b57-4000x2250.jpg',
      id: '1',
      author: {
        name: 'Patrick Bateman',
        avatarUrl: 'https://i1.sndcdn.com/avatars-000529882611-ht5r1v-t500x500.jpg',
      },
      likedByYou: false,
    },
    {
      title: 'Plant a tree',
      imageUrl:
        'https://cdn.sanity.io/images/y346iw48/production/a59cbb8951fa663a7ffeef5324e1cf7037a70b57-4000x2250.jpg',
      id: '2',
      author: {
        name: 'Patrick Bateman',
        avatarUrl: 'https://i1.sndcdn.com/avatars-000529882611-ht5r1v-t500x500.jpg',
      },
      likedByYou: true,
    },
    {
      title: 'Plant a tree',
      imageUrl:
        'https://cdn.sanity.io/images/y346iw48/production/a59cbb8951fa663a7ffeef5324e1cf7037a70b57-4000x2250.jpg',
      id: '3',
      author: {
        name: 'Patrick Bateman',
        avatarUrl: 'https://i1.sndcdn.com/avatars-000529882611-ht5r1v-t500x500.jpg',
      },
    },
    { title: 'Plant a tree', id: '4' },
    { title: 'Plant a tree', id: '5' },
    { title: 'Plant a tree', id: '6' },
    { title: 'Plant a tree', id: '7' },
    { title: 'Plant a tree', id: '8' },
  ];

  return (
    <FlatList
      data={FEED_TASKS}
      renderItem={({ item, index }) => <FeedTaskTile tileIndex={index} {...item} />}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => {
            console.warn('ON REFRESH');
          }}
          tintColor={Colors.Dark2}
        />
      }
      ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      //   onEndReached={() => {
      //     characters?.pageInfo.hasNextPage && fetchMore();
      //   }}
    />
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
    paddingTop: 28,
    paddingBottom: 100,
    width: '100%',
  },
});
