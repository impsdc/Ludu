import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import tabRoutes from './appRoutes/tabRoutes';
import FindScreen from '../screens/tabs/FindScreen';
import MeScreen from '../screens/tabs/MeScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { primaryColor } from '../utils/const';
import BookingTabsScreen from '../screens/tabs/BookingScreen';

type Props = {
  ionIconsName: keyof typeof Ionicons.glyphMap;
};

const Tab = createBottomTabNavigator();

const TabsStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: Props['ionIconsName'];

          switch (route.name) {
            case tabRoutes.FIND_SCREEN:
              iconName = focused ? 'location' : 'location-outline';
              break;

            case tabRoutes.BOOKING_TABS_SCREEN:
              iconName = focused ? 'ios-today' : 'ios-today-outline';
              break;

            case tabRoutes.ME_SCREEN:
              iconName = focused ? 'ios-person' : 'ios-person-outline';
              break;

            default:
              iconName = 'location';
          }

          return <Ionicons name={iconName} size={size} color={primaryColor} />;
        },
        headerShown: true,
        tabBarActiveTintColor: primaryColor,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name={tabRoutes.FIND_SCREEN}
        component={FindScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={tabRoutes.BOOKING_TABS_SCREEN}
        component={BookingTabsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={tabRoutes.ME_SCREEN}
        component={MeScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabsStack;
