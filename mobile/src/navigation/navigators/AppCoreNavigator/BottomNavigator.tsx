import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ComponentProps } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '../../../theme/Colors';
import { sizeMap } from '../../../theme/Iconography';
import { Typography } from '../../../theme/Typography/Typography';
import FeedScreen from './FeedScreen';
import ProfileScreen from './ProfileScreen';
import TasksScreen from './TasksScreen';

const TabIcon = ({
  icon,
  focused,
}: {
  icon: ComponentProps<typeof Feather>['name'];
  focused: boolean;
}) => <Feather name={icon} size={sizeMap.Large} color={Colors[focused ? 'Primary1' : 'Dark2']} />;

const TabLabel = ({ label, focused }: { label: string; focused: boolean }) => (
  <Text
    style={[
      Typography.text3,
      {
        color: focused ? Colors.Primary1 : Colors.Dark2,
        paddingBottom: 8,
        paddingTop: 4,
      },
    ]}
  >
    {label}
  </Text>
);

export type BottomNavigatorParamList = {
  FeedRoute: undefined;
  TasksRoute: undefined;
  ProfileRoute: undefined;
};

const BottomNavigator = () => {
  const Tab = createBottomTabNavigator<BottomNavigatorParamList>();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.Primary1,
        tabBarStyle: { ...styles.navigatorContainer, ...styles.shadow },
        headerShown: true,
      }}
    >
      <Tab.Screen
        name="FeedRoute"
        component={FeedScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabLabel label="Feed" focused={focused} />,
          tabBarIcon: ({ focused }) => <TabIcon icon="compass" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="TasksRoute"
        component={TasksScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabLabel label="Tasks" focused={focused} />,
          tabBarIcon: ({ focused }) => <TabIcon icon="clipboard" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="ProfileRoute"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabLabel label="Profile" focused={focused} />,
          tabBarIcon: ({ focused }) => <TabIcon icon="user" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  navigatorContainer: {
    position: 'absolute',
    bottom: 25,
    marginHorizontal: 20,
    borderRadius: 48,
    elevation: 0,
    backgroundColor: 'white',
    height: 60,
    flex: 1,
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 0,
  },
  shadow: {
    shadowColor: Colors.Dark2,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default BottomNavigator;
