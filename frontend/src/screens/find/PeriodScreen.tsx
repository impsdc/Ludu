import React, { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Button, Checkbox, Text } from 'react-native-paper';
import findRoutes from '../../navigation/appRoutes/findRoutes';
import { primaryColor } from '../../utils/const';
import Layout from '../Layout';
import { useCreateRentMutation } from '../../services/LUDU_API/rents';
import { useSelector } from 'react-redux';
import { MainAppState } from '../../models/states';
import moment from 'moment';
import { RentType } from '../../models/states/Rent';
import DateTimePicker from '@react-native-community/datetimepicker';

function PeriodScreen({ route, navigation }: any) {
  const game = route.params.game;
  const store = route.params.store;
  const deliveredDate = route.params.date;
  const user = useSelector((state: MainAppState) => state.user);

  const [isSelected, setSelection] = useState(false);
  const [date, setDate] = useState(new Date(deliveredDate));
  const [show, setShow] = useState(false);
  const [createRent, { isError }] = useCreateRentMutation();

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
  };

  const showTimepicker = () => {
    setShow(true);
  };

  const deliveryTime = new Date(date);
  const hoursToAdd = 2;
  deliveryTime.setUTCHours(deliveryTime.getUTCHours() + hoursToAdd);

  const handleSubmit = () => {
    const formData = {
      startDate: deliveryTime,
      game: store.copies.find((copy) => copy.convertedGameId === game._id && copy.available)._id,
      owner_id: store._id,
      user: user.id,
      type: isSelected ? RentType.HOME : RentType.STORE,
    };
    createRent(formData)
      .unwrap()
      .then((res) => {
        handleNavigation(res);
      })
      .catch((error) => {
        if (isError) {
          console.log(error.data);
        }
      });
  };

  const handleNavigation = (response) => {
    navigation.navigate(findRoutes.BOOKING_CONFIRMATION, {
      game: game,
      store: store,
      response: response,
    });
  };

  const handleCheck = () => {
    setSelection(!isSelected);
  };

  return (
    <Layout>
      <View style={{ position: 'relative', height: '100%', alignItems: 'center' }}>
        <View style={{ marginTop: 70 }}>
          <View
            style={{
              paddingHorizontal: 8,
              alignItems: 'center',
              paddingTop: 5,
            }}
          >
            <Text variant="headlineMedium" style={{ fontWeight: 'bold' }}>
              Booking for: {game.name}
            </Text>
            <Text variant="bodyLarge">
              at{' '}
              <Text style={{ fontWeight: 'bold' }}>
                {store.name} <Text>on</Text>{' '}
                <Text style={{ fontWeight: 'bold' }}>
                  {moment(route.params.date).format('DD/MM/YYYY')}
                </Text>
              </Text>
            </Text>
          </View>
          <View
            style={{
              width: 'auto',
              flexDirection: 'row-reverse',
              marginTop: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text variant="titleMedium">Bring me the game home</Text>
            <Checkbox.Android
              status={isSelected ? 'checked' : 'unchecked'}
              color={primaryColor}
              uncheckedColor={primaryColor}
              onPress={() => handleCheck()}
            />
          </View>
        </View>
        <View style={styles.container}>
          {Platform.OS === 'ios' && (
            <>
              <Text variant="titleMedium" style={{ marginBottom: 10 }}>
                What time do you want the game delivered ?
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginRight: 5 }}>
                  <Text variant="bodyLarge">Chosen time:</Text>
                </View>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="time"
                  display="default"
                  onChange={onChange}
                />
              </View>
            </>
          )}
          {Platform.OS === 'android' && (
            <View>
              <Button
                onPress={showTimepicker}
                style={[styles.btnTime]}
                buttonColor={primaryColor}
                textColor="white"
              >
                Pick Time for delivery!
              </Button>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="time"
                  display="default"
                  onChange={onChange}
                />
              )}
              <Text style={styles.time}>
                Time picked: {moment(deliveryTime).utc().format('hh:mm a')}
              </Text>
            </View>
          )}
        </View>
        <Button
          style={[styles.btn]}
          buttonColor={primaryColor}
          textColor="white"
          onPress={() => handleSubmit()}
        >
          Continue
        </Button>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginTop: 100,
  },
  btn: {
    borderRadius: 5,
    width: 'auto',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  btnTime: {
    borderRadius: 5,
    width: 'auto',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  time: {
    display: 'flex',
    alignSelf: 'center',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 15,
  },
  buttonActive: {
    backgroundColor: '#000000',
  },
  textActive: {
    color: 'white',
  },
});
export default PeriodScreen;
