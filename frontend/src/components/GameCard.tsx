import React, { useEffect, useState } from 'react';
import findRoutes from '../navigation/appRoutes/findRoutes';
import Tag from './Tag';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Game } from '../models/states/Game';
import { useGetGameByIdQuery } from '../services/LUDU_API/games';
import ImageHandle from './Image';
import { lowGray, verticalPadding } from '../utils/const';

interface IGameCard {
  id: string;
  navigation: any;
  size: string;
}

const GameCard = ({ id, navigation, size }: IGameCard) => {
  const {
    data: game,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetGameByIdQuery({ _id: id }, { refetchOnMountOrArgChange: true });

  if (isLoading) {
    return <></>;
  }

  if (isError) {
    console.log(error);
    return (
      <View>
        <Text>Error Game Card</Text>
      </View>
    );
  }
  if (isSuccess) {
    return (
      <TouchableOpacity onPress={() => navigation.push(findRoutes.GAME_SCREEN, game._id)}>
        <View style={[styles.card, size === 'small' ? styles.smallCard : styles.largeCard]}>
          <ImageHandle src={game.thumbnail} resizeMode={'cover'} height={180} />
          <View style={styles.content}>
            <Text
              variant="titleLarge"
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{ fontWeight: 'bold', marginBottom: 8 }}
            >
              {game.name}
            </Text>
            <View
              style={{
                flexDirection: size === 'small' ? 'column' : 'row',
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              {Object.values(game.tags).map((tag: string, index: React.Key | null | undefined) => (
                <Tag
                  tagValue={tag}
                  tagName={Object.keys(game.tags).find((key) => game.tags[key] === tag)}
                  key={index}
                />
              ))}
            </View>
            <View style={{ marginBottom: 8 }}>
              {size !== 'small' && (
                <Text variant="bodySmall" style={styles.description}>
                  {game.description}
                </Text>
              )}
              {size === 'small' && (
                <Text
                  variant="bodySmall"
                  numberOfLines={3}
                  ellipsizeMode="tail"
                  style={styles.description}
                >
                  {game.description}
                </Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

export default GameCard;

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    overflow: 'hidden',
    height: 'auto',
    borderRadius: 5,
    width: '50%',
    borderWidth: 1,
    backgroundColor: lowGray,
  },
  smallCard: {
    width: Dimensions.get('window').width / 2,
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginRight: 15,
    height: 350,
  },
  largeCard: {
    width: Dimensions.get('window').width - verticalPadding * 2,
    alignItems: 'center',
    flexDirection: 'column',
  },
  content: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: 12,
    width: '90%',
    alignSelf: 'center',
  },
  description: {
    maxWidth: '100%',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});
