import React from 'react';
import { Dimensions, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { useGetReviewByIdQuery } from '../services/LUDU_API/reviews';
import { borderRadius, getUserImg, primaryColor } from '../utils/const';
import RatingsStars from './RatingsStars';

const GameReviewCard = ({ reviewId }: any) => {
  const { data: review, isLoading, isSuccess } = useGetReviewByIdQuery({ _id: reviewId });

  return (
    <>
      {isLoading && (
        <View style={styles.center}>
          <ActivityIndicator animating={true} size="large" color={primaryColor} />
        </View>
      )}
      {isSuccess && review && (
        <View style={[styles.card]}>
          <View style={styles.left}>
            <Avatar.Image size={54} source={{ uri: getUserImg(review.user.avatar) }} />
          </View>
          <View style={styles.right}>
            <Text variant="bodyMedium" style={styles.username}>
              {review.user.username}
            </Text>
            <RatingsStars rating={review.score} />
            <Text variant="bodySmall">{review.review}</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default GameReviewCard;

const styles = StyleSheet.create({
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    height: 'auto',
    width: Dimensions.get('window').width - 60,
    marginBottom: 6,
    marginRight: 16,
    overflow: 'hidden',
    borderWidth: 1,
    padding: 12,
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderRadius: borderRadius,
  },
  left: {
    width: '20%',
  },
  right: {
    width: '80%',
  },
  username: {
    fontWeight: 'bold',
  },
  img: {
    width: 75,
    height: 75,
  },
  containerStart: {
    flexDirection: 'row',
  },
});
