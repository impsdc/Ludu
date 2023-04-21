import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { StoreDocument } from '../../../schemas/store.schema';

export class LocationDto {
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty({
    example: 'Au beau jeu',
    description: 'The name of the store',
  })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: '78600',
    description: "Postal code of the store's address",
  })
  @IsNotEmpty()
  readonly postalCode: number;

  @ApiPropertyOptional({ description: 'Stores' })
  readonly stores: StoreDocument[];
}
