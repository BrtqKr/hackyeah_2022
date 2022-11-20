import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../../theme/Colors';
import { radiusMap } from '../../../../theme/Constants';
import { Feather } from '@expo/vector-icons';
import { sizeMap } from '../../../../theme/Iconography';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Typography } from '../../../../theme/Typography/Typography';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TaskNavigatorStackParamList } from './TaskNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

type Navigation = StackNavigationProp<TaskNavigatorStackParamList>;

export default function TaskNavigatorHeader() {
  const { top } = useSafeAreaInsets();
  const { navigate } = useNavigation<Navigation>();
  const [currentRoute, setCurrentRoute] = useState<'AllTasksRoute' | 'StoryTasksRoute'>(
    'AllTasksRoute'
  );

  useEffect(() => {
    navigate(currentRoute);
  }, [currentRoute]);

  const HEADER_HEIGHT = top + 275;
  const TOP_OFFSET = top + 16;

  return (
    <View style={styles.container}>
      <View style={[styles.mainTopBar, { paddingTop: TOP_OFFSET }]}>
        <TouchableOpacity
          onPress={() => {
            return;
          }}
        >
          <Feather name={'bell'} size={sizeMap.Regular} color={Colors.White1} />
        </TouchableOpacity>
      </View>
      <View style={styles.calendar}>
        <Feather name="clipboard" size={sizeMap.XLarge * 4} color="#fff" />
        <View>
          <Text style={styles.counter}>12/25</Text>
          <Text style={styles.subtitle}>Tasks done</Text>
        </View>
        <View style={styles.switchTasksPanel}>
          <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => setCurrentRoute('AllTasksRoute')}>
              <View
                style={[
                  { alignItems: 'center', flexGrow: 1 },
                  styles.taskKindButton,
                  currentRoute === 'AllTasksRoute' && { backgroundColor: 'rgba(255,255,255, 0.3)' },
                ]}
              >
                <Text style={[Typography.text2, { color: Colors.White1 }]}>
                  <Feather
                    style={{ marginRight: 5 }}
                    name="calendar"
                    size={sizeMap.XSmall}
                    color="#fff"
                  ></Feather>
                  <Text style={styles.switchTasksPanelText}>Daily</Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => setCurrentRoute('StoryTasksRoute')}>
              <View
                style={[
                  { alignItems: 'center', flexGrow: 1 },
                  styles.taskKindButton,
                  currentRoute === 'StoryTasksRoute' && {
                    backgroundColor: 'rgba(255,255,255, 0.3)',
                  },
                ]}
              >
                <Text style={[Typography.text2, { color: Colors.White1 }]}>
                  <Feather
                    style={{ marginRight: 5 }}
                    name="star"
                    size={sizeMap.XSmall}
                    color="#fff"
                  ></Feather>
                  <Text style={styles.switchTasksPanelText}>Special</Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: radiusMap.XLarge,
    borderBottomRightRadius: radiusMap.XLarge,
    backgroundColor: Colors.PrimaryDark,
    height: 345,
  },
  taskKindButton: {
    paddingLeft: 6,
    paddingRight: 8,
    paddingVertical: 4,
    borderRadius: radiusMap.Circle,
    flexDirection: 'row',
    alignItems: 'center',
  },
  counter: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    color: '#fff',
    textAlign: 'center',
  },
  calendar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 22,
    color: '#fff',
    textAlign: 'center',
  },
  switchTasksPanel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchTasksPanelText: {
    color: '#fff',
    textAlign: 'center',
  },
  switchTaskPanelButton: { padding: 10, flex: 1, flexDirection: 'row' },
  mainTopBar: {
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexShrink: 1,
    paddingVertical: 12,
  },
});
