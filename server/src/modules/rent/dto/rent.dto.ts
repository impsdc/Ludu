import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, MinDate } from 'class-validator';
import { RENT } from '../../../schemas/rent.schema';

export class RentDto {
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty({
    example: 'unix date',
    description: 'Timestamp in unix when the game is delivered',
  })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  readonly startDate: Date | string;

  @ApiProperty({
    example: 'unix date',
    description: 'Timestamp in unix when the game is delivered',
  })
  @IsOptional()
  endDate: string | null;

  @ApiProperty({
    example: '62e16c1b3f6a897c767bec7d',
    description: "Id d'un User/Store qui détient la copy",
  })
  @IsString()
  owner_id: string;

  @ApiProperty({
    example: 'unix date',
    description: 'Timestamp in unix when the game is delivered',
  })
  @IsOptional()
  deliveredDate: string | null;

  @ApiProperty({
    example: 'unix date',
    description: 'Timestamp in unix when the game is delivered',
  })
  @IsEnum(RENT)
  @IsNotEmpty()
  readonly type: RENT;

  @ApiProperty({
    example: '62e16c1b3f6a897c767bec7d',
    description: "Id d'un User",
  })
  @IsString()
  readonly user: string;

  @ApiProperty({
    example: '62dafb6aabb3d527725fb11a',
    description: "Id d'une Copy d'un jeu",
  })
  @IsString()
  readonly game: string;
}
