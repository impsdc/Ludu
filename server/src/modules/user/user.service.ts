import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import appConfig from '../../config/app.config';
import { deleteImage, saveImage } from '../../helpers/Utils';
import { Review } from '../../schemas/review.schema';
import { UserDocument } from '../../schemas/user.schema';
import { UserUpdateDto } from './dto/update.dto';
import { UserDto } from './dto/user.dto';
import { Copy } from '../../schemas/copy.schema';
import { StoreDocument } from '../../schemas/store.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDocument>,
  ) {}

  public async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find();
  }

  public async findById(id: ObjectId | string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  public async findOne(field: any): Promise<UserDocument> {
    return await this.userModel.findOne(field).exec();
  }

  public async findOnePassword(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username: username }).select('credentials.local.password');
  }

  public async findOneRefreshToken(id: ObjectId): Promise<UserDocument> {
    return this.userModel.findOne({ _id: id }).select('refreshToken');
  }

  public async findOneUsername(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username: username });
  }

  public async findOneLocalEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ 'credentials.local.email': email });
  }

  public async findOneOauthEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ 'credentials.oauth.email': email });
  }

  async create(UserDto: UserDto): Promise<UserDocument> {
    return this.userModel.create(UserDto);
  }

  public async update(id: string, updateUserDto: UserUpdateDto): Promise<UserDocument> {
    const existingUser = await this.findById(id);

    // checking if avatar has been changed
    if (updateUserDto.avatar === undefined) {
      await this.userModel.updateOne({ _id: id }, { $set: updateUserDto });
      return this.userModel.findById(id);
    }

    const isImageDeleted = deleteImage(
      existingUser.avatar,
      `${appConfig().user.staticFolder}/avatar/`,
    );

    // If false, delete has not occur
    if (!isImageDeleted)
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: "An error occur when the old  user'avatar has been deleted",
        },
        HttpStatus.FORBIDDEN,
      );

    updateUserDto.avatar = await saveImage(
      updateUserDto.avatar,
      `${appConfig().user.staticFolder}/avatar/`,
    );

    await this.userModel.updateOne({ _id: id }, { $set: updateUserDto });
    return this.userModel.findById(id);
  }

  public async updateToken(id: ObjectId, token: string): Promise<UserDocument> {
    const updatedUser = await this.userModel.updateOne(
      { _id: id },
      { $set: { refreshToken: token } },
    );

    if (!updatedUser) throw new NotFoundException(`User #${id} not found`);

    return this.userModel.findById(id);
  }

  public async updateReviews(id: string, reviewId: (string | Review)[]): Promise<UserDocument> {
    const updatedUser = await this.userModel.updateOne(
      { _id: id },
      { $set: { reviews: reviewId } },
    );

    if (!updatedUser) throw new NotFoundException(`User #${id} not found`);

    return this.userModel.findById(id);
  }

  public async remove(id: string): Promise<any> {
    const isUser = await this.userModel.findByIdAndRemove(id);

    if (!isUser) throw new NotFoundException(`User #${id} not found`);

    return isUser;
  }

  public async updateCopies(id: string, copyID: (string | Copy)[]): Promise<any> {
    const updateUserCopy = await this.userModel.updateOne(
      { _id: id },
      { $set: { copies: copyID } },
    );

    if (!updateUserCopy) throw new NotFoundException(`User #${id} not found`);

    return this.userModel.findById(id);
  }

  public async findByCopy(id: string | Copy): Promise<StoreDocument> {
    return this.userModel.findOne({ copies: id });
  }
}
