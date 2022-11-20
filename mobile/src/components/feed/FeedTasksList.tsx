import React, { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { Colors } from '../../theme/Colors';
import { FeedTasksHeader } from './FeedTasksHeader';
import { FeedTaskTile } from './FeedTaskTile';
import {useQuery} from '@tanstack/react-query';
import * as Api from '../../axios/api';

export const FeedTasksList = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { status, error, data } = useQuery(
      [], // query key
      Api.getTaskCompletions
  );
  ({});

  return (
    <FlatList
      data={data?.data ?? []}
      renderItem={({ item, index }) => <FeedTaskTile tileIndex={index} taskCompletion={item?.attributes} />}
      keyExtractor={(item) => item.id}
      refreshing={isRefreshing}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
            setTimeout(() => {
              setIsRefreshing(false);
            }, 3000);
          }}
          tintColor={Colors.White1}
        />
      }
      ListHeaderComponent={() => <FeedTasksHeader />}
      ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
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
  },
  contentContainer: {
    paddingBottom: 100,
    width: '100%',
    backgroundColor: Colors.White1,
  },
});
