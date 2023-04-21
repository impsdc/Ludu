import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsPhoneNumber, IsOptional } from 'class-validator';

import { OauthDto } from './oauth.dto';
import { LocalDto } from './local.dto';
import { ROLES } from '../../../schemas/user.schema';
import { ObjectId } from 'mongoose';

interface ICredentials {
  local: LocalDto;
  oauth?: OauthDto;
}

class LocalProperty {
  @ApiProperty({
    example: 'email@gmail.com',
    description: 'an email',
  })
  email: string;

  @ApiProperty({
    example: '###',
    description: 'password',
  })
  password: string;

  @ApiProperty({
    example: 'true/false',
    description: 'if the email is verified',
  })
  emailVerified: boolean;
}
class CredentialsProperty {
  @ApiProperty({ type: LocalProperty })
  local: LocalProperty;
}

export class UserDto {
  @Transform(({ value }) => value.toString())
  _id: ObjectId | string;

  @ApiProperty({
    example: 'USER | SELLER | ADMIN',
    description: "User's role",
  })
  @IsNotEmpty()
  @IsString()
  readonly role: ROLES;

  @ApiProperty({
    example: 'impsdc',
    description: 'Your nickname',
  })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ type: CredentialsProperty })
  credentials: ICredentials;

  @ApiProperty({
    example: '+33620202020',
    description: "User's phone number",
  })
  @IsNotEmpty()
  @IsPhoneNumber('FR')
  phone: string;

  @ApiProperty({
    example: "User's address",
    description: '16 rue de beaumont, Montesson 78360',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiPropertyOptional({ description: 'avatar' })
  @IsOptional()
  avatar: string;
}
