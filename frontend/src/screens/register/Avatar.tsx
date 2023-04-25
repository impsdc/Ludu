import React, { useState, useContext, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  View,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/actions/userAction';
import { Button, Text } from 'react-native-paper';
import { RegisterContext } from '../../utils/registerContext';
import { borderRadius, errorColor, primaryColor, secondaryColor } from '../../utils/const';
import { LinearGradient } from 'expo-linear-gradient';
import { useRegisterMutation } from '../../services/LUDU_API/auth';
const { width: ScreenWidth } = Dimensions.get('screen');
import * as SecureStore from 'expo-secure-store';
import appRoutes from '../../navigation/appRoutes';

export default function Avatar({ navigation }: any) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [register, { data, isLoading, isSuccess, isError, error }] = useRegisterMutation();
  const dispatch = useDispatch();
  const { user } = useContext(RegisterContext);

  const handleRegister = async () => {
    const newUser = { ...user, ...{ avatar: image } };
    await register(newUser);
    navigation.navigate(appRoutes.LOGIN_SCREEN);
  };

  useEffect(() => {
    if (isSuccess && data) {
      const setTokens = async () => {
        await SecureStore.setItemAsync('refreshToken', data.refreshToken);
        await SecureStore.setItemAsync('accessToken', data.token);
      };
      setTokens();
      const user = {
        token: data.token,
        id: data.user._id,
        username: data.user.username,
        role: data.user.role,
        email: data.user.credentials.local.email,
        phone: data.user.phone,
        address: data.user.address,
        avatar: data.user.avatar,
      };
      dispatch(setUser(user));
      // navigation.navigate(appRoutes.LOGIN_SCREEN);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) console.log({ error });
  }, [isError]);

  const HandleImageSelect = () => {
    const pickImage = async () => {
      setPreview(null);
      // No permissions request is necessary for launching the image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled) {
        const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
          encoding: 'base64',
        });
        setImage(base64);
        setPreview(result.assets[0].uri);
      }
    };
    return (
      <View
        style={{
          margin: 4,
          justifyContent: 'center',
          alignItems: 'center',
          height: 250,
        }}
      >
        {!preview && (
          <Button
            onPress={pickImage}
            buttonColor={primaryColor}
            textColor={'white'}
            style={{
              borderRadius: 5,
              paddingHorizontal: 55,
              paddingVertical: 5,
            }}
            icon="camera-plus-outline"
          >
            Pick an image
          </Button>
        )}
        {preview && (
          <>
            <Image source={{ uri: preview }} style={{ width: 200, height: 200, marginBottom: 4 }} />
            <Button
              onPress={pickImage}
              buttonColor={primaryColor}
              textColor={'white'}
              style={{ marginTop: 20 }}
              icon="camera-plus-outline"
            >
              Select an other
            </Button>
          </>
        )}
      </View>
    );
  };
  return (
    <View>
      <StatusBar animated={true} backgroundColor={primaryColor} barStyle={'dark-content'} />
      <LinearGradient colors={[primaryColor, secondaryColor]} style={{ height: '100%' }}>
        <View
          style={{
            paddingTop: 30,
            paddingLeft: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: 'transparent' }}
          >
            <Ionicons size={34} name="arrow-back" color={'white'} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {!isLoading && (
            <>
              <View style={{ marginBottom: 30 }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                >
                  Add an avatar to your profile
                </Text>
              </View>
              <HandleImageSelect />
              <View
                style={[
                  preview ? styles.previewed : styles.notPreviewed,
                  {
                    width: '100%',
                  },
                ]}
              >
                {preview && (
                  <Button
                    onPress={handleRegister}
                    buttonColor={primaryColor}
                    textColor={'white'}
                    style={{
                      marginTop: 50,
                      borderRadius: borderRadius,
                      paddingHorizontal: 15,
                    }}
                  >
                    Valider
                  </Button>
                )}
                {!preview && (
                  <Button
                    onPress={handleRegister}
                    buttonColor={primaryColor}
                    textColor={'white'}
                    style={{
                      borderRadius: 5,
                      paddingHorizontal: 15,
                      marginRight: 15,
                    }}
                  >
                    Later
                  </Button>
                )}
              </View>
            </>
          )}
          {isLoading && (
            <>
              <ActivityIndicator animating={true} size="large" color={'white'} />
            </>
          )}
          {isError && (
            <View style={{ padding: 20 }}>
              <Text style={{ color: errorColor, fontSize: 20 }}>{error.data.error}</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: ScreenWidth * 0.8,
    height: 55,
    marginBottom: 20,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  previewed: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  notPreviewed: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  inputStyle: { fontSize: 16 },
  labelStyle: { fontSize: 14 },
  placeholderStyle: { fontSize: 16 },
  textErrorStyle: { fontSize: 16 },
  registerTextStyle: {
    color: '#acabb0',
  },
});
