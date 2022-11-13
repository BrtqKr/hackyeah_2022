import { createStackNavigator } from '@react-navigation/stack';
import DecisionsScreen from './DecisionsScreen';

export type GameStackParamList = {
  DecisionsRoute: undefined;
};

const GameNavigator = () => {
  const Stack = createStackNavigator<GameStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DecisionsRoute" component={DecisionsScreen} />
    </Stack.Navigator>
  );
};

export default GameNavigator;
