import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import appRoutes from './appRoutes';
import TabsStack from './TabsStack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/register/RegisterScreen';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentLocation } from '../store/actions/currentLocationAction';
import * as Location from 'expo-location';
import Phone from '../screens/register/Phone';
import Avatar from '../screens/register/Avatar';
import { RegisterContext } from '../utils/registerContext';
import { UserCreate } from '../models/states/User';
import { getZipCode } from '../services/geocodingService';
import { MainAppState } from '../models/states';
import { setUser as setReduxUser } from '../store/actions/userAction';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import { useLazyGetUserByIdQuery } from '../services/LUDU_API/users';
import { DecodedJWT } from '../services/jwtService';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<UserCreate | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [zipc, setZipc] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const userStore = useSelector((state: MainAppState) => state.user);
  const [trigger, resp] = useLazyGetUserByIdQuery();
  useEffect(() => {
    (async () => {
      // If a token is saved in expo-secure-store, we decode it to retrieve the user id
      const token = await SecureStore.getItemAsync('accessToken');
      setToken(token);
      if (token) {
        const decoded: DecodedJWT = jwtDecode(token);
        // We trigger the getUserByIq endpoint with the id from the decoded token
        // Data will be set to resp variable
        trigger({ _id: decoded.id });
      }
      // Before any navigation, get current position of the user and set it in redux
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;
        try {
          const zipCode = await getZipCode(latitude, longitude);
          dispatch(setCurrentLocation({ latitude, longitude, zipCode }));
          setZipc(zipCode);
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (userStore.id) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userStore]);

  useEffect(() => {
    if (resp.data) {
      const user = {
        token: token,
        id: resp.data._id,
        username: resp.data.username,
        role: resp.data.role,
        email: resp.data.credentials.local.email,
        phone: resp.data.phone,
        address: resp.data.address,
        avatar: resp.data.avatar,
      };
      dispatch(setReduxUser(user));
    }
  }, [resp]);

  return (
    <RegisterContext.Provider value={{ user, setUser }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!zipc && <Stack.Screen name={appRoutes.LOADING_SCREEN} component={LoadingScreen} />}
        {!isLoggedIn ? (
          <>
            <Stack.Screen name={appRoutes.LOGIN_SCREEN} component={LoginScreen} />
            <Stack.Screen name={appRoutes.REGISTER_SCREEN} component={RegisterScreen} />
            <Stack.Screen name={appRoutes.REGISTER_PHONE_SCREEN} component={Phone} />
            <Stack.Screen name={appRoutes.REGISTER_AVATAR_SCREEN} component={Avatar} />
          </>
        ) : (
          <>
            <Stack.Screen name={appRoutes.TAB_NAVIGATOR} component={TabsStack} />

            {/* Stack needed in case no games in location */}
            <Stack.Screen name={appRoutes.LOGIN_SCREEN} component={LoginScreen} />
            <Stack.Screen name={appRoutes.REGISTER_SCREEN} component={RegisterScreen} />
            <Stack.Screen name={appRoutes.REGISTER_PHONE_SCREEN} component={Phone} />
            <Stack.Screen name={appRoutes.REGISTER_AVATAR_SCREEN} component={Avatar} />
          </>
        )}
      </Stack.Navigator>
    </RegisterContext.Provider>
  );
};

export default StackNav;
