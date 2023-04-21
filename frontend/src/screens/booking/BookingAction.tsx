import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Layout from '../Layout';
import CardItem from './Card';
import { Text, Button } from 'react-native-paper';
import { borderRadius, primaryColor } from '../../utils/const';
import LottieView from 'lottie-react-native';
import {
  useLazySetRentToDeliveredQuery,
  useLazySetRentToDoneQuery,
} from '../../services/LUDU_API/rents';
import bookingRoute from '../../navigation/appRoutes/bookingRoutes';

const RentAction = ({ route, navigation }) => {
  const { rent } = route.params;
  const isOngoingRent = rent.deliveredDate;
  const animation = useRef(null);
  const [confirmation, setConfirmation] = useState<boolean>(false);

  const [
    toDone,
    { isLoading: isLoadingDone, isSuccess: isSuccessDone, isError: isErrorDone, error: errorDone },
  ] = useLazySetRentToDoneQuery();
  const [
    toDeli,
    { isLoading: isLoadingDeli, isSuccess: isSuccessDeli, isError: isErrorDeli, error: errorDeli },
  ] = useLazySetRentToDeliveredQuery();

  useEffect(() => {
    animation.current?.play();
  }, []);

  useEffect(() => {
    if (isSuccessDone || isSuccessDeli) {
      setConfirmation(true);
    }
  }, [isSuccessDone, isSuccessDeli]);

  useEffect(() => {
    if (isErrorDone) {
      console.log(errorDone);
    }
    if (isErrorDeli) {
      console.log(errorDeli);
    }
  }, [isErrorDeli, isErrorDone]);

  const handleSubmit = () => {
    if (isOngoingRent) {
      toDone({ _id: rent._id });
    } else {
      toDeli({ _id: rent._id });
    }
  };

  return (
    <Layout>
      <View style={styles.wrapper}>
        <CardItem rent={rent} isAction={false} />
        {(isLoadingDeli || isLoadingDone) && (
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator animating={true} size="large" color={primaryColor} />
          </View>
        )}
        {!(isLoadingDeli || isLoadingDone) && (
          <>
            {!confirmation && (
              <>
                <View style={styles.containerAction}>
                  {isOngoingRent && (
                    <Text style={styles.question}>
                      Has this game been <Text style={{ fontWeight: 'bold' }}>returned</Text> ?{' '}
                    </Text>
                  )}
                  {!isOngoingRent && (
                    <Text style={styles.question}>
                      Has this game been <Text style={{ fontWeight: 'bold' }}>delivered</Text> ?
                    </Text>
                  )}
                </View>
                <Button
                  buttonColor={primaryColor}
                  textColor="white"
                  style={{ borderRadius: borderRadius, width: 'auto' }}
                  onTouchEnd={handleSubmit}
                >
                  Confirm
                </Button>
              </>
            )}

            {confirmation && (
              <View style={{ alignSelf: 'center' }}>
                <LottieView
                  autoPlay
                  loop={false}
                  ref={animation}
                  style={{
                    width: 200,
                    height: 200,
                    backgroundColor: 'transparent',
                  }}
                  // Find more Lottie files at https://lottiefiles.com/featured
                  source={require('../../../assets/confirmation-animation.json')}
                />
                <Text style={{ paddingBottom: 20 }}>Rent status has been changed !</Text>
                <Button
                  style={{ borderRadius: borderRadius }}
                  buttonColor={primaryColor}
                  textColor="white"
                  onPress={() => navigation.push(bookingRoute.BOOKING_SCREEN)}
                >
                  See your bookings
                </Button>
              </View>
            )}
          </>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 10,
    backgroundColor: '#fff',
    height: '100%',
  },
  containerAction: {
    marginTop: 20,
    marginBottom: 40,
  },
  question: {
    textAlign: 'center',
    fontSize: 22,
  },
});

export default RentAction;
