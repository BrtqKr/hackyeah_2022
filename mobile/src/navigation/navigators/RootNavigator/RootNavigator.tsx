import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from './MenuScreen';
import LobbyScreen from './LobbyScreen';
import GameNavigator from '../GameNavigator/GameNavigator';

export type RootStackParamList = {
  MenuRoute: undefined;
  LobbyRoute: undefined;
  GameRoute: undefined;
  CardsRoute: undefined;
};

const RootNavigator = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MenuRoute" component={MenuScreen} />
      <Stack.Screen name="LobbyRoute" component={LobbyScreen} />
      <Stack.Screen name="CardsRoute" component={LobbyScreen} />
      <Stack.Screen name="GameRoute" component={GameNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
