import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDto } from './dto/category.dto';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../../schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  public async findAll(): Promise<CategoryDocument[]> {
    return await this.categoryModel.find().exec();
  }

  public async findById(id: string): Promise<CategoryDocument> {
    return await this.categoryModel.findById(id);
  }

  public async categoryAlreadyExist(name: string): Promise<CategoryDocument> {
    return await this.categoryModel.findOne({
      name: name,
    });
  }

  public async create(CategoryDto: CategoryDto): Promise<CategoryDocument> {
    return await this.categoryModel.create(CategoryDto);
  }

  public async update(id: string, updateCategoryDto: CategoryDto): Promise<CategoryDocument> {
    const existingCategory = await this.categoryModel.findByIdAndUpdate(
      { _id: id },
      updateCategoryDto,
    );

    if (existingCategory == null) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return await this.categoryModel.findById(id);
  }

  public async remove(id: string): Promise<CategoryDocument> {
    const isCategory = await this.categoryModel.findByIdAndRemove(id);

    if (isCategory == null) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return isCategory;
  }
}
