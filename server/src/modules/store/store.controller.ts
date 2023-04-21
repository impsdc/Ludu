import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StoreService } from './store.service';
import { StoreDocument } from '../../schemas/store.schema';
import { StoreDto } from './dto/store.dto';
import { Roles } from '../../middlewares/decorators/RoleAuth';
import { ROLES } from '../../schemas/user.schema';
import { JWTAuth } from '../../middlewares/decorators/JWTAuth';

@Controller('store')
@ApiTags('Store')
@JWTAuth()
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Get('')
  // @Roles(ROLES.ADMIN)
  @ApiOperation({ summary: 'Fetch all stores' })
  @ApiOkResponse({ description: 'Success', type: StoreDto, isArray: true })
  findAll(): Promise<StoreDocument[]> {
    return this.storeService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Find a store by ID' })
  @ApiOkResponse({ description: 'Success', type: StoreDto })
  async findById(
    @Param('id')
    id: string,
  ): Promise<StoreDocument> {
    const store = await this.storeService.findById(id);

    if (!store) {
      throw new NotFoundException(`Store #${id} not found`);
    }
    return store;
  }

  @Post('')
  @ApiOperation({ summary: 'Create a store' })
  @ApiOkResponse({ description: 'Success', type: StoreDto })
  create(
    @Body(new ValidationPipe({ transform: true }))
    storeDto: StoreDto,
  ): Promise<StoreDocument> {
    return this.storeService.create(storeDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a store' })
  @ApiOkResponse({ description: 'Success', type: StoreDto })
  update(
    @Param('id')
    id: string,
    @Body(new ValidationPipe({ transform: true }))
    locationDto: StoreDto,
  ): Promise<StoreDocument> {
    return this.storeService.update(id, locationDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a store' })
  @ApiOkResponse({ description: 'Success', type: StoreDto })
  async remove(
    @Param('id')
    id: string,
  ): Promise<void> {
    await this.storeService.remove(id);
  }
}
