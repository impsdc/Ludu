import React from 'react';
import { View } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const NotFound = ({ info }: { info: string }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/not-found.png')} />
      <Text variant="bodyMedium" style={styles.info}>
        {info}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },
  image: {
    height: 300,
    marginBottom: 12,
  },
  info: {
    width: 250,
    textAlign: 'center',
  },
});

export default NotFound;
