import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class StoreDto {
  @Transform(({ value }) => value.toString())
  _id: string | undefined;

  @ApiProperty({
    example: 'FR7612548029989876543210917',
    description: 'Iban of the company',
  })
  @IsString()
  readonly iban: string;

  @ApiProperty({
    example: 'Location 1',
    description: 'The name of the store',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: '75 rue de test',
    description: 'The address of the store',
  })
  @IsString()
  readonly address: string;

  @ApiProperty({
    example: 'Santamaria',
    description: "Name of the shop's owner",
  })
  @IsString()
  owner: string;

  @ApiProperty({
    example: '+33639393939',
    description: "Number of the shop's owner",
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'Paris',
    description: 'Location of the shop, OneToMany relation',
  })
  @IsString()
  location: string;
}
