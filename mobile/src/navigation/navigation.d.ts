import { RootStackParamList } from './navigators/RootNavigator/RootNavigator';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
