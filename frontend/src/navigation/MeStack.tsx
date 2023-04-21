import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MeScreen from '../screens/me/MeScreen';
import UpdateMeScreen from '../screens/me/UpdateMe';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import meRoutes from './appRoutes/meRoutes';

const Stack = createNativeStackNavigator();

const MeStack = () => {
  return (
    <Stack.Navigator initialRouteName={meRoutes.ME_SCREEN}>
      <Stack.Screen
        name={meRoutes.ME_SCREEN}
        component={MeScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate(meRoutes.UPDATE_ME)}>
              <Ionicons name="create" size={24} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={meRoutes.UPDATE_ME}
        component={UpdateMeScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
};

export default MeStack;
