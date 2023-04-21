import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CategoryDto {
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty({
    example: 'jeu de role',
    description: 'a game category',
  })
  @IsString()
  readonly name: string;
}
