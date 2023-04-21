import React, { useEffect } from 'react';
import moment from 'moment';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import {
  borderRadius,
  getGameImg,
  lowGray,
  middleGray,
  primaryColor,
  strongGray,
} from '../../utils/const';
import { useGetCopyByIdQuery } from '../../services/LUDU_API/copies';
import { MaterialIcons } from '@expo/vector-icons';
import { RentStatus } from '../../models/states/Rent';

const CardItem = ({ rent, isAction }) => {
  const {
    data: copy,
    isSuccess,
    isError,
  } = useGetCopyByIdQuery({ _id: rent.game }, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (isError) {
      console.log(isError);
    }
  }, [isError]);

  const status =
    rent.endDate && rent.deliveredDate
      ? RentStatus.OVER
      : !rent.endDate && rent.deliveredDate
      ? RentStatus.ONGOING
      : !rent.deliveredDate
      ? RentStatus.BOOKED
      : '';

  return (
    <>
      {isSuccess && (
        <Card style={styles.cardStyle} mode={'contained'}>
          <Card.Title
            title={copy.game.name}
            titleStyle={styles.title}
            subtitle={status}
            subtitleStyle={[
              styles.subtitle,
              {
                color:
                  status == RentStatus.BOOKED
                    ? '#00b894'
                    : status == RentStatus.ONGOING
                    ? primaryColor
                    : status == RentStatus.OVER
                    ? strongGray
                    : '',
              },
            ]}
            left={() => (
              <Avatar.Image size={60} source={{ uri: getGameImg(copy.game.thumbnail) }} />
            )}
            right={() => {
              return (
                isAction &&
                status !== RentStatus.OVER && (
                  <View style={{ marginRight: 20 }}>
                    <TouchableOpacity>
                      <MaterialIcons name={'keyboard-arrow-right'} color={middleGray} size={24} />
                    </TouchableOpacity>
                  </View>
                )
              );
            }}
          />

          <Card.Content>
            <Text style={{ fontWeight: 'bold', marginBottom: 14 }}>
              Delivery in: <Text style={{ textTransform: 'capitalize' }}>{rent.type}</Text>
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: 'bold', marginBottom: 14 }}>Booked At : </Text>
              {moment(rent.startDate).utc().format('LLLL')}
            </Text>
            {status === RentStatus.OVER && (
              <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold', marginBottom: 14 }}>Return : </Text>
                {moment(rent.endDate).utc().format('LLLL')}
              </Text>
            )}
          </Card.Content>
        </Card>
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
    zIndex: 1,
    height: 180,
  },
  cardStyle: {
    marginHorizontal: 10,
    marginBottom: 14,
    borderRadius: borderRadius,
    backgroundColor: lowGray,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  subtitle: {
    fontSize: 16,
    marginLeft: 20,
    marginTop: 10,
    textTransform: 'uppercase',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  content: {
    marginBottom: 20,
  },
  text: {
    marginBottom: 18,
  },
});

export default CardItem;
