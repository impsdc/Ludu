import { Injectable, NotFoundException } from '@nestjs/common';
import { CopyDto } from './dto/copy.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Copy, CopyDocument } from '../../schemas/copy.schema';

@Injectable()
export class CopyService {
  constructor(
    @InjectModel(Copy.name)
    private CopyModel: Model<CopyDocument>,
  ) {}

  public async findAll(): Promise<CopyDocument[]> {
    return await this.CopyModel.find();
  }

  public async findById(id: string): Promise<CopyDocument> {
    return await this.CopyModel.findById(id).populate('game');
  }

  public async findByAvailability(): Promise<CopyDocument[] | []> {
    return await this.CopyModel.find({
      available: true,
    });
  }

  public async create(copyDto: CopyDto): Promise<CopyDocument> {
    return await this.CopyModel.create(copyDto);
  }

  public async update(id: string, updateCopyDto: CopyDto): Promise<CopyDocument> {
    const existingCopy = await this.CopyModel.findByIdAndUpdate({ _id: id }, updateCopyDto);

    if (existingCopy == null) {
      throw new NotFoundException(`Copy #${id} not found`);
    }

    return await this.CopyModel.findById(id).populate('game');
  }

  public async toggleAvailable(id: string): Promise<CopyDocument> {
    const existingCopy = await this.CopyModel.findById(id);

    if (existingCopy == null) {
      throw new NotFoundException(`Copy #${id} not found`);
    }

    await this.CopyModel.updateOne({ _id: id }, { $set: { available: !existingCopy.available } });

    return await this.CopyModel.findById(id).populate('game');
  }

  public async remove(id: string): Promise<any> {
    const isCopy = await this.CopyModel.findByIdAndRemove(id);

    if (isCopy == null) {
      throw new NotFoundException(`Copy #${id} not found`);
    }

    return isCopy;
  }
}
