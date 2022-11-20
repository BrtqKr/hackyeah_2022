import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Colors } from '../../theme/Colors';
import { CommentTile } from './CommentTile';

const POST = {
  title: 'Run 100km',
  imageUrl:
    'https://cdn.sanity.io/images/y346iw48/production/a59cbb8951fa663a7ffeef5324e1cf7037a70b57-4000x2250.jpg',
  id: '1',
  author: {
    name: 'Patrick Bateman',
    avatarUrl: 'https://i1.sndcdn.com/avatars-000529882611-ht5r1v-t500x500.jpg',
  },
  likedByYou: false,
  description:
    'Lorem ipsum anifqworjqw werij qwrio jwqio rjqweio rqwji roqwjir wqeji rweqji rqewijreiwqrjworjwq weqj rowiq jqwio jrioqwe jriqweo rjqiwoerj qwoijrqweiorjq woirqjwrioqwej roiqw',
  comments: [
    {
      author: {
        name: 'Patrick Bateman',
        avatarUrl: 'https://i1.sndcdn.com/avatars-000529882611-ht5r1v-t500x500.jpg',
      },
      date: '20-11-2022',
      content:
        'Lorem ipsum anifqworjqw werij qwrio jwqio rjqweio rqwji roqwjir wqeji rweqji rqewijreiwqrjworjwq weqj rowiq ',
    },
    {
      author: {
        name: 'Patrick Bateman',
        avatarUrl: 'https://i1.sndcdn.com/avatars-000529882611-ht5r1v-t500x500.jpg',
      },
      date: '20-11-2022',
      content:
        'Lorem ipsum anifqworjqw werij qwrio jwqio rjqweio rqwji roqwjir wqeji rweqji rqewijreiwqrjworjwq weqj rowiq ',
    },
  ],
};

export const CommentsList = () => {
  return (
    <FlatList
      data={POST.comments}
      renderItem={({ item }) => <CommentTile comment={item} />}
      keyExtractor={(item) => item.id}
      // refreshing={isRefreshing}
      // refreshControl={
      //   <RefreshControl
      //     refreshing={isRefreshing}
      //     onRefresh={() => {
      //       setIsRefreshing(true);
      //       setTimeout(() => {
      //         setIsRefreshing(false);
      //       }, 3000);
      //     }}
      //     tintColor={Colors.Dark1}
      //   />
      // }
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
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
    backgroundColor: Colors.White1,
  },
  contentContainer: {
    // paddingBottom: 100,
    width: '100%',
    flex: 1,
    backgroundColor: Colors.White1,
    paddingTop: 12,
  },
});
