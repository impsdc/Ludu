import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsBase64,
  IsNumber,
  IsArray,
  ArrayMaxSize,
  ArrayMinSize,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

class TagsProperty {
  @ApiProperty({
    example: '[2,10]',
    description: 'range of players',
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  readonly players: number[];

  @ApiProperty({
    example: '30',
    description: 'Gametime in minute',
  })
  @Type(() => Number)
  readonly playTime: number;
}

export class GameDto {
  @Transform(({ value }) => value.toString())
  _id: string | undefined;

  @ApiProperty({
    example: '8435407619432',
    description: 'Codebar of the game',
  })
  @IsString()
  readonly ean: string;

  @ApiProperty({
    example: 'Catan',
    description: 'The name of the game',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'Version Maritime',
    description: 'Différentiation des différentes version du jeu ',
  })
  @IsString()
  readonly version: string;

  @ApiProperty({
    example:
      "Lance-toi à la conquête d'une île vierge mais pleine de ressources. Sauras-tu construire tes villes et colonies plus vite que tes adversaires ? Un classique au succès mondial, qui revient avec un nouveau design. Construis ta route vers la victoire ! Dès 10 ans.",
    description: 'Description du jeu',
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    example: '38',
    description: "number of users' likes for this game",
  })
  @IsNumber()
  readonly likes: number;

  @ApiProperty({
    example: 'BASE64 encode image',
    description: 'Image of the game',
  })
  @IsBase64()
  thumbnail: string;

  @ApiProperty({ type: TagsProperty })
  @ValidateNested()
  @Type(() => TagsProperty)
  @IsObject()
  @IsNotEmpty()
  tags: TagsProperty;

  @ApiProperty({
    example: '[62e16c1b3f6a897c767bec7d, 62dafb6aabb3d527725fb11a]',
    description: 'array Id de categories',
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly categories: string[];
}
