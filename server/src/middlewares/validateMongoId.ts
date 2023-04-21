import { HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectId } from 'mongodb';

/**
 * Check if Params ID is  a valid Mongo ID
 */
@Injectable()
export class ValidateMongoId implements PipeTransform<string> {
  transform(value: string): string {
    // Optional casting into ObjectId if wanted!
    if (ObjectId.isValid(value)) {
      if (String(new ObjectId(value)) === value) return value;
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Id is not valid',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    throw new HttpException(
      {
        status: HttpStatus.CONFLICT,
        error: 'Id is not valid',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
