import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import {
  borderRadius,
  errorColor,
  getUserImg,
  horizontalPadding,
  lowGray,
  middleGray,
  primaryColor,
  strongGray,
} from '../../utils/const';
import { Button, Text, TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useUpdateUserMutation } from '../../services/LUDU_API/users';
import { useSelector } from 'react-redux';
import { MainAppState } from '../../models/states';
import AvatarMe from './Avatar';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { isApiResponse } from '../../utils/errorType';
import meRoutes from '../../navigation/appRoutes/meRoutes';

const UpdateMeScreen = ({ navigation }: any) => {
  const userFromStore = useSelector((state: MainAppState) => state.user);
  const [
    updateUser,
    { data, isLoading: isloading, isSuccess: isSuccess, isError: isError, error: error },
  ] = useUpdateUserMutation();
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string>('');
  const [addressInput, setAddressInput] = useState<string>('');
  const [phoneInput, setPhoneInput] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [avatarPreview, setAvatarPreview] = useState<string>(getUserImg(userFromStore.avatar));
  const [errorQuery, setError] = useState<string[]>([]);

  const pickImage = async () => {
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
      setAvatar(base64);
      setAvatarPreview(result.assets[0].uri);
    }
  };
  const handleValidate = () => {
    const newUser = {
      id: userFromStore.id,
      ...(usernameInput.length !== 0 && { username: usernameInput }),
      ...(addressInput.length !== 0 && { address: addressInput }),
      ...(phoneInput.length !== 0 && { phone: `0${phoneInput}` }),
      ...(emailInput.length !== 0 && { credentials: { local: { email: emailInput } } }),
      ...(avatar.length !== 0 && { avatar: avatar }),
    };

    updateUser(newUser);
  };

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate(meRoutes.ME_SCREEN);
    }
    if (isError) {
      console.log(error);
      if (isApiResponse(error)) {
        setError(error.data.message);
      } else {
        console.log(error);
      }
    }
  }, [isSuccess, isError]);

  return (
    <>
      {isloading && (
        <View
          style={{
            flex: 1,
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator animating={true} color={primaryColor} />
        </View>
      )}
      {!isloading && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <>
            <View style={styles.wrapperView}>
              <TouchableOpacity style={styles.row} onPress={pickImage}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AvatarMe
                    avatarUri={userFromStore.avatar.length !== 0 ? avatarPreview : ''}
                    username={userFromStore.username}
                  />
                  <Text variant="bodyMedium" style={{ marginLeft: 10 }}>
                    Change your avatar
                  </Text>
                </View>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >
                  <Button>
                    <MaterialIcons name={'keyboard-arrow-right'} color={middleGray} size={24} />
                  </Button>
                </View>
              </TouchableOpacity>
              <View style={styles.containerInput}>
                <Text variant="bodyMedium" style={{ marginBottom: 2, color: strongGray }}>
                  Change your Username
                </Text>
                <TextInput
                  placeholder={userFromStore.username}
                  value={usernameInput}
                  mode={'flat'}
                  activeOutlineColor={primaryColor}
                  outlineColor={'transparent'}
                  selectionColor={primaryColor}
                  underlineColor="transparent"
                  style={styles.inputText}
                  theme={{
                    colors: {
                      primary: `transparent`,
                    },
                  }}
                  onChangeText={(text) => {
                    setUsernameInput(text);
                  }}
                />
              </View>
              <View style={styles.containerInput}>
                <Text variant="bodyMedium" style={{ marginBottom: 2, color: strongGray }}>
                  Change your email
                </Text>
                <TextInput
                  placeholder={userFromStore.email}
                  value={emailInput}
                  mode={'flat'}
                  activeOutlineColor={primaryColor}
                  outlineColor={'transparent'}
                  selectionColor={primaryColor}
                  underlineColor="transparent"
                  style={styles.inputText}
                  theme={{
                    colors: {
                      primary: `transparent`,
                    },
                  }}
                  onChangeText={(text) => {
                    setEmailInput(text);
                  }}
                />
              </View>
              <View style={styles.containerInput}>
                <Text variant="bodyMedium" style={{ marginBottom: 2, color: strongGray }}>
                  Change your Address
                </Text>
                <TextInput
                  placeholder={userFromStore.address}
                  value={addressInput}
                  mode={'flat'}
                  activeOutlineColor={primaryColor}
                  outlineColor={'transparent'}
                  selectionColor={primaryColor}
                  underlineColor="transparent"
                  style={styles.inputText}
                  theme={{
                    colors: {
                      primary: `transparent`,
                    },
                  }}
                  onChangeText={(text) => {
                    setAddressInput(text);
                  }}
                />
              </View>
              <View style={styles.containerInput}>
                <Text variant="bodyMedium" style={{ marginBottom: 2, color: strongGray }}>
                  Change your Username
                </Text>
                <TextInput
                  placeholder={userFromStore.phone.toString()}
                  value={phoneInput.toString()}
                  mode={'flat'}
                  activeOutlineColor={primaryColor}
                  outlineColor={'transparent'}
                  selectionColor={primaryColor}
                  underlineColor="transparent"
                  style={styles.inputText}
                  theme={{
                    colors: {
                      primary: `transparent`,
                    },
                  }}
                  onChangeText={(text) => {
                    setPhoneInput(text);
                  }}
                />
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#fff',
              }}
            >
              <Button
                onPress={handleValidate}
                buttonColor={primaryColor}
                textColor="#fff"
                style={styles.button}
              >
                Valider
              </Button>
            </View>
            {errorQuery.length > 0 &&
              errorQuery.map((item) => {
                <View style={styles.error}>
                  <Text style={{ color: '#fff', fontSize: 14 }}>{item}</Text>
                </View>;
              })}
          </>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapperView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: horizontalPadding,
    paddingLeft: horizontalPadding,
    borderColor: lowGray,
    borderBottomWidth: 1,
  },
  containerInput: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: horizontalPadding,
    paddingLeft: horizontalPadding,
  },
  inputText: {
    width: '100%',
    height: 40,
    borderRadius: 4,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderBottomColor: primaryColor,
    borderBottomWidth: 1,
    paddingHorizontal: 0,
  },
  button: {
    width: 200,
    alignSelf: 'center',
    marginBottom: 8,
    borderRadius: borderRadius,
    marginHorizontal: 16,
  },
  error: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: errorColor,
    color: '#fff',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: borderRadius,
  },
});

export default UpdateMeScreen;
