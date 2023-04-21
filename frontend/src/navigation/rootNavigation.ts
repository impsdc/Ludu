import { createNavigationContainerRef } from '@react-navigation/native';
type RootStackParamList = {
  name: string;
};
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const navigate = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};
