import * as React from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { primaryColor } from '../../utils/const';

interface IAvatarMe {
  avatarUri: string;
  username: string;
}
const AvatarMe = ({ avatarUri, username }: IAvatarMe) => {
  const AvatarWithUri = () => {
    return (
      <>
        <Avatar.Image size={84} source={{ uri: avatarUri }} />
      </>
    );
  };

  const AvatarLess = () => {
    return (
      <>
        <Avatar.Text
          size={84}
          label={username.slice(0, 2).toUpperCase()}
          color={primaryColor}
          style={{ backgroundColor: primaryColor, marginBottom: 16 }}
        />
      </>
    );
  };

  return <View>{avatarUri.length !== 0 ? <AvatarWithUri /> : <AvatarLess />}</View>;
};
export default AvatarMe;
