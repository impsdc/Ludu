import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import bookingRoute from './appRoutes/bookingRoutes';
import { toggleStatusFilter } from '../store/actions/filterBookingsByStatusAction';
import { primaryColor } from '../utils/const';
import BookingTabsScreen from '../screens/booking/BookingScreen';
import RentAction from '../screens/booking/BookingAction';
import { useDispatch } from 'react-redux';

const Stack = createNativeStackNavigator();

const BookingStack = () => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator initialRouteName={bookingRoute.BOOKING_SCREEN}>
      <Stack.Screen
        name={bookingRoute.BOOKING_SCREEN}
        component={BookingTabsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => dispatch(toggleStatusFilter())}>
              <Ionicons name="funnel" size={24} color={primaryColor} style={{ marginRight: 10 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name={bookingRoute.BOOKING_ACTION_SCREEN}
        component={RentAction}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
};

export default BookingStack;
