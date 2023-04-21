import { users } from './../../../test/seed/data/user.data';
import { Injectable, HttpException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserDto } from '../user/dto/user.dto';
import { ObjectId } from 'mongoose';
import { ROLES } from '../../schemas/user.schema';
import { compare, hash } from '../../helpers/Bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserResponse } from './auth.controller';

interface AuthToken {
  id: ObjectId;
  username: string;
  role: ROLES;
}

interface UserToken {
  id: ObjectId;
  role: ROLES;
  username: string;
  iat: string;
  exp: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(userToken: UserToken): Promise<boolean> {
    const user = await this.userService.findById(userToken.id);

    if (!user || user.username != userToken.username) return false;

    return true;
  }

  async login(userLogin: LoginDto): Promise<UserResponse> {
    // find an user mathcing the username
    const userExist = await this.userService.findOnePassword(userLogin.username);
    if (!userExist) throw new ForbiddenException(`User #${userLogin.username} not found`);

    // checking password
    const isCorrectPassword = compare(userLogin.password, userExist.credentials.local.password);
    if (!isCorrectPassword) throw new ForbiddenException(`Wrong password`);

    const user = await this.userService.findById(userExist._id);

    const tokens = await this.getTokens({
      username: user.username,
      id: user._id,
      role: user.role,
    });

    await this.updateRefreshToken(user._id, tokens.refreshToken);

    return {
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: user,
    };
  }

  async register(userDto: UserDto): Promise<UserResponse> {
    const user = await this.userService.create(userDto);

    const tokens = await this.getTokens({
      username: user.username,
      id: user._id,
      role: user.role,
    });

    return { token: tokens.accessToken, refreshToken: tokens.refreshToken, user: user };
  }

  async updateRefreshToken(userId: ObjectId, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken);
    await this.userService.updateToken(userId, hashedRefreshToken);
  }

  async getTokens(userDto: AuthToken) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userDto.id,
          username: userDto.username,
          role: userDto.role,
        },
        {
          secret: this.configService.get<string>('app.jwtSecret'),
          expiresIn: this.configService.get<string>('app.jwtExpire'),
        },
      ),
      this.jwtService.signAsync(
        {
          id: userDto.id,
        },
        {
          secret: this.configService.get<string>('app.jwtRefreshSecret'),
          expiresIn: this.configService.get<string>('app.jwtExpireRefresh'),
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: ObjectId, refreshToken: string) {
    const user = await this.userService.findOneRefreshToken(userId);
    if (!user || !user.refreshToken) throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await compare(refreshToken, user.refreshToken);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens({
      id: user._id,
      username: user.username,
      role: user.role,
    });
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    return tokens;
  }

  async checkUniqueField(userDto: UserDto): Promise<any> {
    let userExist = await this.userService.findOneUsername(userDto.username);

    // if username is already taken
    if (userExist)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Username already exist',
        },
        HttpStatus.FORBIDDEN,
      );

    userExist = await this.userService.findOneLocalEmail(userDto.credentials.local.email);
    // if email is already taken
    if (userExist)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Email already exist',
        },
        HttpStatus.FORBIDDEN,
      );
  }

  async logout(userId: ObjectId) {
    return await this.userService.updateToken(userId, null);
  }
}
