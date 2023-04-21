import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
import { hash } from '../helpers/Bcrypt';
import { Review } from './review.schema';
import { Exclude } from 'class-transformer';
import { Copy } from './copy.schema';

export type UserDocument = User & Document;

export enum ROLES {
  USER = 'USER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
}
export class Oauth {
  @Prop()
  token: string;

  @Prop()
  email: string;

  @Prop()
  name: string;
}

export class LocalAuth {
  @IsEmail()
  @Prop({ unique: true })
  email: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    select: false,
  })
  @Exclude()
  password: string;

  @Prop()
  emailVerified: boolean;
}

export class Credentials {
  @Prop({ type: LocalAuth })
  local: LocalAuth;

  @Prop({ type: Oauth })
  oauth: Oauth;
}

@Schema({ timestamps: true })
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ type: Credentials })
  credentials: Credentials;

  @Prop({
    type: String,
    enum: ROLES,
    default: ROLES.USER,
  })
  role: ROLES;

  @Prop({ required: true })
  phone: number;

  @Prop()
  avatar: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: Types.ObjectId, ref: 'Store' })
  store: string;

  @Prop({ default: null, select: false })
  refreshToken: string;

  @Prop({ type: [Types.ObjectId], ref: 'Copy', default: [] })
  copies: Copy[];

  @Prop({ type: [Types.ObjectId], ref: 'Review', default: [] })
  reviews: Review[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (user.credentials.local.password) {
    // if (isPasswordInvalid(user.credentials.local.password))
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.BAD_REQUEST,
    //       error: 'password:invalid:min(8)|required(upper,lower,number)',
    //     },
    //     HttpStatus.BAD_REQUEST,
    //   );

    this.credentials.local.password = hash(this.credentials.local.password);
  }
  next();
});
