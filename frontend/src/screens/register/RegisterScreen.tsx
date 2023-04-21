import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Dimensions, Text, View, Image, StatusBar } from 'react-native';
import appRoutes from '../../navigation/appRoutes/index';
import { Button, TextInput } from 'react-native-paper';
import { RegisterContext } from '../../utils/registerContext';
import { isPasswordInvalid, isEmailInvalid } from '../../utils/regex';
import { borderRadius, errorColor, lowGray, primaryColor, secondaryColor } from '../../utils/const';
import { LinearGradient } from 'expo-linear-gradient';

const { width: ScreenWidth } = Dimensions.get('screen');
const headerHeight = StatusBar.currentHeight;

export default function Register({ navigation }: any) {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  useEffect(() => {
    setTimeout(() => {
      if (isEmailInvalid(email) && email.length !== 0) {
        setEmailError('Email is invalid');
      } else {
        setEmailError('');
      }
    }, 2000);
  }, [email]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (isPasswordInvalid(password) && password.length !== 0) {
  //       setPasswordError('Password is invalid');
  //     } else {
  //       setPasswordError('');
  //     }
  //   }, 3000);
  // }, [password]);

  const { user, setUser } = useContext(RegisterContext);

  const isInputInValid = emailError.length !== 0 || passwordError.length !== 0;
  const isInputEmpty = username.length === 0 || email.length === 0 || password.length === 0;

  const handleRegister = async () => {
    try {
      await setUser({
        username: username,
        credentials: {
          local: { email: email, password: password, emailVerified: false },
        },
        role: 'USER',
      });
    } catch (err) {
      console.log(err);
    }
    navigation.navigate(appRoutes.REGISTER_PHONE_SCREEN);
  };
  return (
    <View>
      <LinearGradient colors={[primaryColor, secondaryColor]} style={styles.container}>
        <Image style={styles.logo} source={require('../../../assets/ludu_logo.png')} />
        <>
          <TextInput
            value={username}
            style={styles.input}
            label="Username"
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
              setUsername(text);
            }}
          />
          <TextInput
            value={email}
            style={[styles.input, emailError.length !== 0 && styles.inputError]}
            label="Email"
            placeholderTextColor="gray"
            activeOutlineColor={`${primaryColor}`}
            outlineColor={`${lowGray}`}
            selectionColor={`${emailError ? errorColor : primaryColor}`}
            underlineColor="transparent"
            theme={{
              colors: {
                primary: emailError ? errorColor : primaryColor,
              },
            }}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <TextInput
            value={password}
            style={[styles.input, passwordError.length !== 0 && styles.inputError]}
            label="Password"
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
            secureTextEntry
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </>
        <View
          style={{
            paddingTop: 60,
          }}
        >
          {isInputInValid && (
            <View style={styles.error}>
              {emailError && <Text style={styles.errorMessage}>{emailError}</Text>}
              {passwordError && <Text style={styles.errorMessage}>{passwordError}</Text>}
            </View>
          )}
          {!isInputInValid && !isInputEmpty && (
            <Button
              onPress={handleRegister}
              disabled={isInputInValid}
              buttonColor={primaryColor}
              textColor="white"
              style={{
                borderRadius: borderRadius,
                marginHorizontal: 16,
                marginTop: 20,
                marginBottom: 12,
              }}
              icon="arrow-right-bold-box-outline"
            >
              Next
            </Button>
          )}
          <Button
            onPress={() => navigation.navigate(appRoutes.LOGIN_SCREEN)}
            mode="text"
            textColor="#fff"
            style={{ padding: 0, margin: 0 }}
          >
            Already an account ?
          </Button>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: headerHeight + 50,
    alignItems: 'center',
    height: '100%',
  },
  input: {
    width: ScreenWidth * 0.8,
    height: 55,
    marginTop: 30,
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
