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
} from 'class-validator';
import { Type } from 'class-transformer';

// Only diffence with game.dto is the optional base64 for thumbnail

export class GameUpdateDto {
  @Transform(({ value }) => value.toString())
  _id: string;

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
    example: '75',
    description: 'Number of this game in all stores',
  })
  @IsNumber()
  readonly quantity: number;

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
  @IsOptional()
  thumbnail: string;

  @ApiProperty({
    example: '[3,9]',
    description: 'fourchette du nombre de joueurs pour jouer au jeu',
  })
  @Type(() => Number)
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  readonly players: number[];

  @ApiProperty({
    example: '30',
    description: 'Temps de jeu en minute du jeu',
  })
  @IsNumber()
  readonly playTime: number;

  @ApiProperty({
    example: '[62e16c1b3f6a897c767bec7d, 62dafb6aabb3d527725fb11a]',
    description: 'array Id de categories',
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly categories: string[];
}
