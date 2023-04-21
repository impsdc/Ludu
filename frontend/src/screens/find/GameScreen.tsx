import React, { useEffect } from 'react';
import GameReviewCard from '../../components/GameReviewCard';
import GameCard from '../../components/GameCard';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { InlineTextIcon } from '../../components/InlineTextIcon';
import { Button, Divider, Text } from 'react-native-paper';
import Tag from '../../components/Tag';
import findRoutes from '../../navigation/appRoutes/findRoutes';
import { borderRadius, horizontalPadding, primaryColor, secondaryColor } from '../../utils/const';
import { useGetGameByIdQuery, useRandomGameQuery } from '../../services/LUDU_API/games';
import { Game } from '../../models/states/Game';
import { Category } from '../../models/states/Category';
import NotFound from '../../components/NotFound';
import ImageHandle from '../../components/Image';

const Reviews = ({ reviews }: { reviews: string[] }) => {
  return (
    <View style={{ paddingLeft: horizontalPadding, marginBottom: 16 }}>
      <Text
        variant="headlineMedium"
        style={{
          marginBottom: 4,
          fontWeight: 'bold',
        }}
      >
        They loved playing it
      </Text>
      <ScrollView
        contentContainerStyle={{
          paddingRight: horizontalPadding,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentOffset={{ x: -horizontalPadding, y: 0 }}
        style={{
          overflow: 'visible',
          width: Dimensions.get('window').width,
        }}
      >
        {reviews.map((review: string, index: number) => (
          <GameReviewCard reviewId={review} key={index} />
        ))}
      </ScrollView>
    </View>
  );
};

const Suggestion = ({ navigation, gameId }: any) => {
  const { data: games, refetch, isLoading, isSuccess } = useRandomGameQuery();

  useEffect(() => {
    refetch(); // Prevent cache
  }, [gameId]);

  if (isSuccess && games.length === 0) {
    return <></>;
  }
  return (
    <View
      style={{
        marginBottom: 16,
        paddingLeft: horizontalPadding,
      }}
    >
      <Text
        variant="headlineMedium"
        style={{
          marginBottom: 4,
          fontWeight: 'bold',
        }}
      >
        Game alike
      </Text>
      {isLoading && (
        <View style={styles.center}>
          <ActivityIndicator animating={true} size="large" color={primaryColor} />
        </View>
      )}
      {isSuccess && (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingRight: horizontalPadding,
          }}
          horizontal
          contentOffset={{ x: -horizontalPadding, y: 0 }}
          style={{
            overflow: 'visible',
            width: Dimensions.get('window').width,
          }}
        >
          {games.map((game: Game, index: number) => (
            <GameCard id={game._id} navigation={navigation} size="small" key={index} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const GameScreen = ({ route, navigation }: any) => {
  const { data: game, isLoading, isSuccess, isError } = useGetGameByIdQuery({ _id: route.params });

  useEffect(() => {
    navigation.setOptions({ title: '' });
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      navigation.setOptions({ title: game.name });
    }
  }, [isSuccess]);

  return (
    <>
      {isLoading && (
        <View style={styles.center}>
          <ActivityIndicator animating={true} size="large" color={primaryColor} />
        </View>
      )}
      {isError && (
        <View style={styles.center}>
          <View style={styles.center}>
            <NotFound info={'These game was not found'} />
            <Button
              onPress={() => navigation.navigate(findRoutes.HOME_FEED)}
              buttonColor={primaryColor}
              textColor="white"
              style={{
                borderRadius: borderRadius,
                marginHorizontal: 16,
                marginVertical: 12,
              }}
            >
              Go Back
            </Button>
          </View>
        </View>
      )}
      {isSuccess && (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>
          {/* Display likes reviews and share number*/}
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 16,
              marginHorizontal: horizontalPadding,
            }}
          >
            <InlineTextIcon icon={'star-outline'} text={`${game.likes} Likes`} />
            <View style={{ marginHorizontal: 8 }}>
              <InlineTextIcon
                icon={'chatbubbles-outline'}
                text={`${game.reviews.length} Reviews`}
              />
            </View>
          </View>

          {/* display image, tags, description */}
          <View style={{ paddingRight: horizontalPadding, paddingLeft: horizontalPadding }}>
            <View>
              <ImageHandle
                src={game.thumbnail}
                resizeMode={'cover'}
                width={Dimensions.get('window').width - horizontalPadding * 2}
                height={350}
              />
            </View>
            <View></View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginVertical: 16,
              }}
            >
              {game.categories.length !== 0 && (
                <>
                  {game.categories.map((item: Category, index: number) => {
                    return (
                      <Text
                        variant="bodyLarge"
                        key={index}
                        style={{
                          color: primaryColor,
                          borderWidth: 1,
                          borderColor: primaryColor,
                          borderRadius: borderRadius,
                          padding: 4,
                        }}
                      >
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                      </Text>
                    );
                  })}
                </>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 8,
                }}
              >
                <>
                  {Object.values(game.tags).map(
                    (tag: string, index: React.Key | null | undefined) => (
                      <Tag
                        tagValue={tag}
                        tagName={Object.keys(game.tags).find((key) => game.tags[key] === tag)}
                        key={index}
                      />
                    ),
                  )}
                </>
              </View>

              <Text style={{ fontSize: 12 }}>{game.description}</Text>
            </View>
          </View>

          {/* render 'play now' and 'book' button */}
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 4,
              width: '100%',
              justifyContent: 'space-around',
            }}
          >
            <Button
              onPress={() => navigation.navigate(findRoutes.BOOKING_FEED, { game: game })}
              textColor={'white'}
              buttonColor={secondaryColor}
              mode="contained"
              icon="book"
              style={{
                width: 140,
                marginBottom: 8,
                borderRadius: borderRadius,
                paddingHorizontal: 16,
              }}
            >
              Book
            </Button>
          </View>
          <Divider style={{ marginVertical: 16 }} />
          {/* render 'they loved playing it' */}
          {game.reviews.length !== 0 && <Reviews reviews={game.reviews} />}
          {/* render 'game alike' */}
          <Suggestion navigation={navigation} gameId={route.params} />
        </ScrollView>
      )}
    </>
  );
};

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
});

export default GameScreen;
