import { ActiveUser } from '../../middlewares/decorators/UserRequest';
import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';
import { UserDocument } from '../../schemas/user.schema';
import appConfig from '../../config/app.config';
import { LoginDto } from './dto/login.dto';
import { saveImage } from '../../helpers/Utils';
import { JWTAuth } from '../../middlewares/decorators/JWTAuth';
import { RefreshToken } from '../../middlewares/decorators/RefreshTokesRequest';
import { RefreshTokenGuard } from '../../middlewares/guards/jwt-refresh.guard';
import { IActiveUser } from './stategy/Jwt.strategy';
import { IRefreshToken } from './stategy/Jwt-refresh.strategy';

export interface UserResponse {
  token: string;
  refreshToken: string;
  user: UserDocument;
}

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/register')
  async create(
    @Body(new ValidationPipe({ transform: true }))
    userDto: UserDto,
  ): Promise<UserResponse> {
    await this.authService.checkUniqueField(userDto);
    if (userDto.avatar) {
      userDto.avatar = await saveImage(userDto.avatar, `${appConfig().user.staticFolder}/avatar/`);
    }
    return this.authService.register(userDto);
  }

  @Post('/local/login')
  login(
    @Body(new ValidationPipe({ transform: true }))
    userLogin: LoginDto,
  ): Promise<UserResponse> {
    return this.authService.login(userLogin);
  }

  @Get('/local/refresh')
  @UseGuards(RefreshTokenGuard)
  refresh(@RefreshToken() user: IRefreshToken) {
    return this.authService.refreshTokens(user.id, user.refreshToken);
  }

  @Get('/local/logout')
  @JWTAuth()
  logout(@ActiveUser() user: IActiveUser) {
    return this.authService.logout(user.id);
  }
}
