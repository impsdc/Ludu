import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RentDto } from './dto/rent.dto';
import { Model } from 'mongoose';
import { RentDocument } from '../../schemas/rent.schema';

export enum RentStatus {
  OVER = 'OVER',
  ONGOING = 'ONGOING',
  BOOKED = 'BOOKED',
}

@Injectable()
export class RentService {
  constructor(
    @InjectModel('Rent')
    private rentModel: Model<RentDocument>,
  ) {}

  public async findAll(done?: string, delivered?: string): Promise<RentDocument[]> {
    const rents = await this.rentModel.find();
    //  If not params return all rents
    if (!done && !delivered) return rents;
    // filter if rent is still
    if (done === 'true') {
      return await this.rentModel.find({
        // Rent done
        endDate: { $ne: null },
      });
    } else if (delivered === 'false') {
      // Rent booked but not delivered
      return await this.rentModel.find({
        deliveredDate: { $eq: null },
      });
    } else if (delivered === 'true') {
      // Rent delivered but not done
      return await this.rentModel.find({
        deliveredDate: { $ne: null },
        endDate: { $eq: null },
      });
    }
  }

  public async findById(id: string): Promise<RentDocument> {
    return await this.rentModel.findById(id).then((rent) => {
      if (!rent) throw new NotFoundException(`Rent #${id} not found`);
      return rent;
    });
  }

  public async findByUserId(userId: string, status: any): Promise<RentDocument[]> {
    const rents = await this.rentModel.find({ user: userId }).sort({ startDate: -1 });
    //  If not params return all rents
    if (!status) {
      return rents;
    }
    let promises = [];
    for (const item of status.split(',')) {
      switch (item) {
        case RentStatus.BOOKED:
          promises.push(
            ...(await this.rentModel
              .find({
                user: userId,
                deliveredDate: null,
                endDate: null,
              })
              .sort({ startDate: -1 })),
          );
          break;
        case RentStatus.ONGOING:
          promises.push(
            ...(await this.rentModel
              .find({
                user: userId,
                deliveredDate: { $ne: null },
                endDate: null,
              })
              .sort({ startDate: -1 })),
          );
          break;
        case RentStatus.OVER:
          promises.push(
            ...(await this.rentModel
              .find({
                user: userId,
                endDate: { $ne: null },
              })
              .sort({ startDate: -1 })),
          );
          break;
        default:
          promises = [...rents];
          break;
      }
    }
    return promises;
  }

  public async create(rentDto: RentDto): Promise<RentDocument> {
    return await this.rentModel.create(rentDto);
  }

  public async update(id: string, RentDto: RentDto): Promise<RentDocument> {
    return await this.rentModel.findByIdAndUpdate({ _id: id }, RentDto);
  }

  public async updateDeliveryDate(id: string): Promise<RentDocument> {
    const rent = await this.rentModel.updateOne(
      { _id: id },
      { $set: { deliveredDate: new Date(Date.now()).toISOString() } },
    );
    return await this.rentModel.findById(id);
  }

  public async updateEndDate(id: string): Promise<RentDocument> {
    await this.rentModel.updateOne(
      { _id: id },
      { $set: { endDate: new Date(Date.now()).toISOString() } },
    );
    return await this.rentModel.findById(id);
  }

  public async remove(id: string): Promise<RentDocument> {
    return await this.rentModel.findByIdAndRemove(id);
  }
}
