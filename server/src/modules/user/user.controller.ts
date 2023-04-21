import { UserUpdateDto } from './dto/update.dto';
import { v4 } from 'uuid';
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Delete,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ROLES, UserDocument } from '../../schemas/user.schema';
import { Roles } from '../../middlewares/decorators/RoleAuth';
import { JWTAuth } from '../../middlewares/decorators/JWTAuth';

@Controller('user')
@ApiTags('User')
// @JWTAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  @Roles(ROLES.ADMIN)
  @ApiOperation({ summary: 'Get All user | need Admin' })
  @ApiOkResponse({ description: 'Success', type: UserDto, isArray: true })
  findAll(): Promise<UserDocument[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get user by Id' })
  @ApiOkResponse({ description: 'Success', type: UserDto })
  findById(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.findById(id).then((store) => {
      if (!store) throw new NotFoundException(`User #${id} not found`);
      return store;
    });
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({ description: 'Success', type: UserDto })
  async update(
    @Param('id')
    id: string,
    @Body(new ValidationPipe({ transform: true }))
    userDto: UserUpdateDto,
  ): Promise<UserDocument> {
    const existingUser = await this.userService.findById(id);

    if (!existingUser) throw new NotFoundException(`User #${id} not found`);

    if (userDto.username !== undefined) {
      const existingUser = await this.userService.findOneUsername(userDto.username);
      if (existingUser) throw new NotFoundException(`User with same Username already exist`);
    }
    return await this.userService.update(id, userDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete an user' })
  @ApiOkResponse({ description: 'Success', type: UserDto })
  async remove(
    @Param('id')
    id: string,
  ): Promise<void> {
    await this.userService.remove(id);
  }
}
