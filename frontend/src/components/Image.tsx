import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ImageResizeMode, ActivityIndicator } from 'react-native';
import { getGameImg, primaryColor } from '../utils/const';

interface IImageHandle {
  src: string;
  resizeMode: ImageResizeMode;
  width?: number;
  height: number;
}
const ImageHandle: React.FC<IImageHandle> = ({ src, resizeMode, width, height }: IImageHandle) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    const fetchImage = async () => {
      const url = getGameImg(src);
      const res = await fetch(url);
      if (res.status === 404) {
        setImageError(true);
      } else {
        setImageUrl(url);
      }
    };
    fetchImage();
  }, [src]);

  if (imageError) {
    return (
      <View style={styles.center}>
        <Image
          style={{ width: width ? width : '100%', height: height }}
          resizeMode={resizeMode}
          source={require('../../assets/not-found.png')}
        />
      </View>
    );
  }

  if (!imageUrl) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating={true} size="large" color={primaryColor} />
      </View>
    );
  }

  return (
    <Image
      style={{ width: width ? width : '100%', height: height }}
      resizeMode={resizeMode}
      source={{
        uri: imageUrl,
      }}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    height: 150,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageHandle;
