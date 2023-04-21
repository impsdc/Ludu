import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsPhoneNumber, IsOptional } from 'class-validator';

import { OauthDto } from './oauth.dto';
import { LocalDto } from './local.dto';
import { ROLES } from '../../../schemas/user.schema';

interface ICredentials {
  local: LocalDto;
  oauth?: OauthDto;
}

class LocalProperty {
  @ApiProperty({
    example: 'email@gmail.com',
    description: 'an email',
  })
  @IsOptional()
  email: string;
}
class CredentialsProperty {
  @ApiProperty({ type: LocalProperty })
  @IsOptional()
  local: LocalProperty;
}

export class UserUpdateDto {
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty({
    example: 'impsdc',
    description: 'Your nickname',
  })
  @IsOptional()
  @IsString()
  readonly username: string;

  @ApiProperty({ type: CredentialsProperty })
  credentials: ICredentials;

  @ApiProperty({
    example: '+33620202020',
    description: "User's phone number",
  })
  @IsOptional()
  @IsPhoneNumber('FR')
  phone: string;

  @ApiProperty({
    example: "User's address",
    description: '16 rue de beaumont, Montesson 78360',
  })
  @IsOptional()
  @IsString()
  address: string;

  @ApiPropertyOptional({ description: 'avatar' })
  @IsOptional()
  avatar: string;
}
