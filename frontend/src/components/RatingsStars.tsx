import React from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const RatingsStars = ({ rating }) => {
  return (
    <View>
      <View style={styles.containerStart}>
        {Array.from({ length: rating }, (x, i) => {
          return <Ionicons key={i} name="star" size={18} color="#FFA000" />;
        })}
        {Array.from({ length: 5 - rating }, (x, i) => {
          return <Ionicons key={i} name="star-outline" size={18} color="#FFA000" />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStart: {
    flexDirection: 'row',
  },
});

export default RatingsStars;
