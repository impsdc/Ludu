import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'paco',
    description: 'username',
  })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({
    example: '###',
    description: 'password',
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
