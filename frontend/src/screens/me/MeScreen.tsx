import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { InlineTextIcon } from '../../components/InlineTextIcon';
import {
  borderRadius,
  errorColor,
  getUserImg,
  horizontalPadding,
  lowGray,
  middleGray,
  strongGray,
} from '../../utils/const';
import AvatarMe from '../me/Avatar';
import { MaterialIcons } from '@expo/vector-icons';
import { removeUser } from '../../store/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { MainAppState } from '../../models/states';
import * as SecureStore from 'expo-secure-store';
import { useLazyLogoutQuery } from '../../services/LUDU_API/auth';

const MeScreen = () => {
  const dispatch = useDispatch();
  const userFromStore = useSelector((state: MainAppState) => state.user);
  const [trigger, data] = useLazyLogoutQuery();

  const handleLogOut = async () => {
    dispatch(removeUser());
    trigger('');
    await SecureStore.deleteItemAsync('refreshToken');
    await SecureStore.deleteItemAsync('accesToken');
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          <View style={styles.wrapperView}>
            <View style={styles.wrapperAvatar}>
              <AvatarMe
                avatarUri={
                  userFromStore?.avatar?.length !== 0 ? getUserImg(userFromStore?.avatar) : ''
                }
                username={userFromStore?.username}
              />
              <Text variant="bodyMedium" style={{ marginBottom: 16 }}>
                {userFromStore?.username}
              </Text>
              <Text variant="bodyMedium" style={{ marginBottom: 16 }}>
                {userFromStore?.email}
              </Text>
              <Text variant="bodyMedium" style={{ marginBottom: 16 }}>
                {userFromStore?.address}
              </Text>
              <Text variant="bodyMedium" style={{ marginBottom: 16 }}>
                +33{userFromStore?.phone}
              </Text>
            </View>
            <TouchableOpacity style={styles.row}>
              <InlineTextIcon text="Customization" icon={'help'} />
              <View style={styles.container}>
                <Button>
                  <MaterialIcons name={'keyboard-arrow-right'} color={middleGray} size={24} />
                </Button>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.row}>
              <InlineTextIcon text="Favorite games" icon={'heart-outline'} />
              <View style={styles.container}>
                <Button>
                  <MaterialIcons name={'keyboard-arrow-right'} color={middleGray} size={24} />
                </Button>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.row}>
              <InlineTextIcon text="My wallet" icon={'wallet-outline'} />
              <View style={styles.container}>
                <Text style={{ marginLeft: 4, color: strongGray }}>66.00€</Text>
                <Button>
                  <MaterialIcons name={'keyboard-arrow-right'} color={middleGray} size={24} />
                </Button>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.row}>
              <InlineTextIcon text="Settings" icon={'settings-outline'} />
              <View style={styles.container}>
                <Button>
                  <MaterialIcons name={'keyboard-arrow-right'} color={middleGray} size={24} />
                </Button>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.row}>
              <InlineTextIcon text="About Ludu" icon={'information-circle-outline'} />
              <View style={styles.container}>
                <Button>
                  <MaterialIcons name={'keyboard-arrow-right'} color={middleGray} size={24} />
                </Button>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.row}>
              <InlineTextIcon text="My reviews" icon={'happy-outline'} />
              <View style={styles.container}>
                <Button>
                  <MaterialIcons name={'keyboard-arrow-right'} color={middleGray} size={24} />
                </Button>
              </View>
            </TouchableOpacity>
            <View style={styles.rowPrivacy}>
              <Text variant="bodySmall" style={{ fontWeight: '100' }}>
                Privacy Policy
              </Text>
              <Text variant="titleSmall" style={{ margin: 8 }}>
                .
              </Text>
              <Text variant="bodySmall" style={{ fontWeight: '100' }}>
                Use of cookies
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
            }}
          >
            <Button
              onPress={handleLogOut}
              buttonColor={errorColor}
              textColor="#fff"
              style={styles.logout}
            >
              Logout
            </Button>
          </View>
        </>
      </ScrollView>
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
  wrapperAvatar: {
    marginHorizontal: 1,
    paddingTop: 8,
    paddingBottom: 8,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: lowGray,
    borderBottomWidth: 1,
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
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowPrivacy: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingTop: 8,
    paddingBottom: 8,
  },
  logout: {
    width: 200,
    alignSelf: 'center',
    marginBottom: 8,
    borderRadius: borderRadius,
    marginHorizontal: 16,
  },
});

export default MeScreen;
