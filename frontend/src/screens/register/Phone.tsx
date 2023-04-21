import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View, StatusBar } from 'react-native';
import appRoutes from '../../navigation/appRoutes/index';
import { Button, TextInput, Text } from 'react-native-paper';
import { RegisterContext } from '../../utils/registerContext';
import { isValidPhonenumber, isZipCodeValide } from '../../utils/regex';
import { borderRadius, errorColor, lowGray, primaryColor, secondaryColor } from '../../utils/const';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: ScreenWidth } = Dimensions.get('screen');
const headerHeight = StatusBar.currentHeight;
export default function Phone({ navigation }: any) {
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [postcode, setPostcode] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [zipError, setZipError] = useState<string>('');
  const { user, setUser } = useContext(RegisterContext);

  useEffect(() => {
    setTimeout(() => {
      if (!isValidPhonenumber(phone) && phone.length !== 0) {
        setPhoneError('Phone is invalid');
      } else {
        setPhoneError('');
      }
    }, 2000);
  }, [phone]);

  useEffect(() => {
    setTimeout(() => {
      if (!isZipCodeValide(postcode) && postcode.length !== 0) {
        setZipError('PostCode is invalid');
      } else {
        setZipError('');
      }
    }, 2000);
  }, [postcode]);

  const isInputInValid = phoneError.length !== 0 || zipError.length !== 0;

  const isInputEmpty =
    phone.length === 0 || address.length === 0 || city.length === 0 || postcode.length === 0;

  const register = () => {
    const userProperties = {
      phone: phone,
      address: `${address}, ${city}, ${postcode}`,
    };
    setUser({ ...user, ...userProperties });
    navigation.navigate(appRoutes.REGISTER_AVATAR_SCREEN);
  };

  return (
    <View>
      <LinearGradient colors={[primaryColor, secondaryColor]} style={{ height: '100%' }}>
        <View
          style={{
            paddingTop: 30,
            paddingLeft: 10,
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: 'transparent' }}
          >
            <Ionicons size={34} color={'white'} name="arrow-back" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: headerHeight + 50,
          }}
        >
          <Text
            variant="titleMedium"
            style={{ color: 'white', marginBottom: 20, width: 200, textAlign: 'center' }}
          >
            Please register your phone and your postal address
          </Text>
          <TextInput
            value={phone}
            style={[styles.input, phoneError.length !== 0 && styles.inputError]}
            label="Phone"
            placeholder="0618273625"
            placeholderTextColor="gray"
            activeOutlineColor={`${phoneError ? errorColor : primaryColor}`}
            outlineColor={`${lowGray}`}
            selectionColor={`${phoneError ? errorColor : primaryColor}`}
            underlineColor="transparent"
            theme={{
              colors: {
                primary: phoneError ? errorColor : primaryColor,
              },
            }}
            onChangeText={(text) => {
              setPhone(text);
            }}
          />
          <TextInput
            value={address}
            style={styles.input}
            label="Address"
            placeholder=" 16 rue de Beaumont"
            placeholderTextColor="gray"
            activeOutlineColor={`${primaryColor}`}
            outlineColor={`${lowGray}`}
            selectionColor={`${primaryColor}`}
            underlineColor="transparent"
            theme={{
              colors: {
                primary: primaryColor,
              },
            }}
            onChangeText={(text) => {
              setAddress(text);
            }}
          />
          <TextInput
            value={city}
            style={styles.input}
            label="City Address"
            placeholder="Paris"
            placeholderTextColor="gray"
            activeOutlineColor={`${primaryColor}`}
            outlineColor={`${lowGray}`}
            selectionColor={`${primaryColor}`}
            underlineColor="transparent"
            theme={{
              colors: {
                primary: primaryColor,
              },
            }}
            onChangeText={(text) => {
              setCity(text);
            }}
          />
          <TextInput
            value={postcode}
            style={[styles.input, zipError.length !== 0 && styles.inputError]}
            label="Postcode"
            placeholder="59000"
            placeholderTextColor="gray"
            activeOutlineColor={`${zipError ? errorColor : primaryColor}`}
            outlineColor={`${lowGray}`}
            selectionColor={`${zipError ? errorColor : primaryColor}`}
            underlineColor="transparent"
            theme={{
              colors: {
                primary: zipError ? errorColor : primaryColor,
              },
            }}
            onChangeText={(text) => {
              setPostcode(text);
            }}
          />
          <View
            style={{
              opacity: isInputInValid ? 0.6 : 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
          ></View>
        </View>
        <View
          style={{
            paddingTop: 60,
            alignSelf: 'center',
          }}
        >
          {isInputInValid && (
            <View style={styles.error}>
              {phoneError && <Text style={styles.errorMessage}>{phoneError}</Text>}
              {zipError && <Text style={styles.errorMessage}>{zipError}</Text>}
            </View>
          )}
          {!isInputInValid && !isInputEmpty && (
            <Button
              onPress={register}
              disabled={isInputInValid}
              buttonColor={primaryColor}
              textColor="white"
              style={{ borderRadius: 5, marginHorizontal: 16 }}
              icon="arrow-right-bold-box-outline"
            >
              Next
            </Button>
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
    borderRadius: borderRadius,
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
  inputError: {
    borderWidth: 1,
    borderColor: errorColor,
  },
  inputStyle: { fontSize: 16 },
  labelStyle: { fontSize: 14, color: 'gray' },
  placeholderStyle: { fontSize: 16, color: 'gray' },
  textErrorStyle: { fontSize: 16, color: errorColor },
  registerTextStyle: {
    color: '#acabb0',
  },
  logo: {
    width: 150,
    height: 150,
    shadowColor: '#383838',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.7,
  },
  error: {
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
  errorMessage: {
    color: '#fff',
  },
});
