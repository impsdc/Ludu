import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ReviewDto {
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty({
    example: '3.8',
    description: "User'score",
  })
  @IsNumber()
  @IsNotEmpty()
  readonly score: number;

  @ApiProperty({
    example:
      "Catane, aussi connu sous son nom d'origine 'Les colons de Catanes', est dit-on le jeu qui a ouvert l'ère des jeux de société modernes. Ca n'est pas peu dire !!!",
    description: "User's review",
  })
  @IsString()
  @IsNotEmpty()
  readonly review: string;

  @ApiProperty({
    example: '62e16c1b3f6a897c767bec7d',
    description: "Id d'un User",
  })
  @IsString()
  @IsNotEmpty()
  readonly user: string;

  @ApiProperty({
    example: '62e16c1b3f6a897c767bec7d',
    description: "Id d'un Game",
  })
  @IsString()
  @IsOptional()
  readonly game: string;

  @ApiProperty({
    example: '62e16c1b3f6a897c767bec7d',
    description: "Id d'un Store",
  })
  @IsString()
  @IsOptional()
  readonly store: string;
}
