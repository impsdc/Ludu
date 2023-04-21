import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { GameService } from '../game/game.service';
import { ApiTags } from '@nestjs/swagger';
import { GameDocument } from '../../schemas/game.schema';
import { JWTAuth } from '../../middlewares/decorators/JWTAuth';

@Controller('category')
@ApiTags('Category')
@JWTAuth()
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly gameService: GameService,
  ) {}

  @Post()
  async create(@Body() CategoryDto: CategoryDto) {
    const categoryExist = await this.categoryService.categoryAlreadyExist(CategoryDto.name);
    if (categoryExist)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Category with the same NAME code already exist',
        },
        HttpStatus.FORBIDDEN,
      );

    return await this.categoryService.create(CategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findById(id).then((category) => {
      if (!category) throw new NotFoundException(`Category #${id} not found`);
      return category;
    });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: CategoryDto) {
    const categoryExist = await this.categoryService.findById(id);
    if (!categoryExist)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Category not found',
        },
        HttpStatus.FORBIDDEN,
      );
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const categoryExist = await this.categoryService.findById(id);
    if (!categoryExist)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Category does not exist',
        },
        HttpStatus.FORBIDDEN,
      );

    const games = await this.gameService.findByCategory(categoryExist._id.toString());
    games.map(async (item: GameDocument) => {
      const newCategories = item.categories.filter(
        (e) => e._id.toString() !== categoryExist._id.toString(),
      );
      return await this.gameService.updateCategories(item._id.toString(), newCategories);
    });
    return this.categoryService.remove(id);
  }
}
