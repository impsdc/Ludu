import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { RentService } from './rent.service';
import { RentDto } from './dto/rent.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CopyService } from '../copy/copy.service';
import { UserService } from '../user/user.service';
import { Rent } from '../../schemas/rent.schema';
import { JWTAuth } from '../../middlewares/decorators/JWTAuth';
import { StoreService } from '../store/store.service';

@Controller('rent')
@ApiTags('Rent')
@JWTAuth()
@JWTAuth()
export class RentController {
  constructor(
    private readonly rentService: RentService,
    private readonly CopyService: CopyService,
    private readonly UserService: UserService,
    private readonly StoreService: StoreService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Filter all Rent by "done" and "is_delivered" params',
  })
  @ApiOkResponse({ description: 'Success', type: Rent })
  findAll() {
    return this.rentService.findAll();
  }

  @Post()
  async create(@Body() RentDto: RentDto) {
    const availableCopy = await this.CopyService.findById(RentDto.game);
    if (!availableCopy) throw new NotFoundException(`Copy #${RentDto.game} not found`);
    const userExist = await this.UserService.findById(RentDto.user);
    if (!userExist) throw new NotFoundException(`User #${RentDto.user} not found`);

    // if (RentDto.type === RENT.USER) {
    //   const userOwner = await this.UserService.findById(RentDto.owner_id);
    //   if (RentDto.owner_id == userOwner._id.toString()) {
    //     throw new HttpException(
    //       {
    //         status: HttpStatus.FORBIDDEN,
    //         error: 'User cant rent one of its game',
    //       },
    //       HttpStatus.FORBIDDEN,
    //     );
    //   }
    // }

    if (!availableCopy.available)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This game is not available',
        },
        HttpStatus.FORBIDDEN,
      );
    try {
      const rent = await this.rentService.create(RentDto);
      // Set the copy unavailable
      await this.CopyService.toggleAvailable(RentDto.game.toString());
      return rent;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'StartDate need to be a string created as "new Date(Date.now()).toISOString()"',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Filter all Rent by "done" and "is_delivered" params',
  })
  @ApiOkResponse({ description: 'Success', type: Rent })
  findAllWithParams(@Query('done') done?: string, @Query('is_delivered') is_delivered?: string) {
    return this.rentService.findAll(done, is_delivered);
  }

  @Get('user/:id')
  @ApiOperation({
    summary: 'Filter all Rent of a specific user by "status" params',
  })
  @ApiOkResponse({ description: 'Success', type: Rent })
  async findAllByUserWithParams(@Param('id') userId: string, @Query('status') status?: any) {
    const userExist = await this.UserService.findById(userId);
    if (!userExist) throw new NotFoundException(`User #${userId} not found`);
    if (!Array.isArray(status)) {
      status = [status].join();
    }
    return this.rentService.findByUserId(userId, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a rent by its ID' })
  @ApiOkResponse({ description: 'Success', type: Rent })
  async findOne(@Param('id') id: string) {
    return await this.rentService.findById(id).then((rent) => {
      if (!rent) throw new NotFoundException(`Rent #${id} not found`);
      return rent;
    });
  }

  @Get('/delivered/:id')
  @ApiOperation({ summary: 'Game is delivered to the customers' })
  @ApiOkResponse({ description: 'Success', type: Rent })
  async updateDelivered(@Param('id') id: string) {
    const rent = await this.rentService.findById(id);
    if (!rent) throw new NotFoundException(`Rent #${id} not found`);

    return this.rentService.updateDeliveryDate(id);
  }

  @Get('/done/:id')
  @ApiOperation({ summary: 'Close the rent' })
  @ApiOkResponse({ description: 'Success', type: Rent })
  async updateEndDate(@Param('id') id: string) {
    const rent = await this.rentService.findById(id);
    // Set the copy available
    this.CopyService.toggleAvailable(rent.game.toString());
    return this.rentService.updateEndDate(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const isRent = await this.rentService.findById(id);
    if (isRent == null) {
      throw new NotFoundException(`Rent #${id} not found`);
    }
    this.CopyService.toggleAvailable(isRent.game.toString());
    return this.rentService.remove(id);
  }
}
