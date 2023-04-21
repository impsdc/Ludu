import { v4 } from 'uuid';
import * as Sharp from 'sharp';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { unlinkSync } from 'fs';

export const isPasswordInvalid = (password: string) => {
  const match = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return !match.test(password);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const saveImage = async (base64: string, path: string): Promise<string> => {
  const validUriForBuffer = base64.split(';base64,').pop();
  const buffer = Buffer.from(validUriForBuffer, 'base64');
  const filename = v4();
  await Sharp(buffer)
    .resize(400, 400)
    .webp({ lossless: true })
    .toFile(`${path}${filename}.webp`)
    .catch((err) => {
      Logger.log(err);
      throw new HttpException(
        {
          status: HttpStatus.EXPECTATION_FAILED,
          error: 'Something went wrong in the convertion to webp extention',
        },
        HttpStatus.EXPECTATION_FAILED,
      );
    });
  return filename;
};

export const deleteImage = (fileName: string, path: string): boolean => {
  const filePath = `${path}${fileName}.webp`;
  try {
    unlinkSync(filePath);
    return true;
  } catch (err) {
    Logger.log(err);
    // If ENOENT error, it mean that file does not exist
    if (err.code === 'ENOENT') {
      return true;
    } else {
      return false;
    }
  }
};
