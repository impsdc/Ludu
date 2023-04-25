import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import NotFound from '../components/NotFound';
import { primaryColor } from '../utils/const';

const LoadingScreen = () => {
  return (
    <View style={styles.center}>
      <StatusBar animated={true} backgroundColor={'#fff'} barStyle={'dark-content'} />
      <NotFound info={'We are currently retrieving your location'} />
      <ActivityIndicator animating={true} color={primaryColor} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});
