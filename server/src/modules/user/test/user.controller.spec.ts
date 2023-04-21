import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { User, UserDocument, UserSchema } from '../../../schemas/user.schema';
import { userStub } from './stubs/user.stub';
import { UserDto } from '../dto/user.dto';
import { AuthController } from '../../auth/auth.controller';
import { AuthService } from '../../auth/auth.service';
import { getModelToken } from '@nestjs/mongoose';

jest.mock('../user.service');
jest.mock('../../auth/auth.service');

describe('UserController', () => {
  let usersController: UserController;
  let usersService: UserService;
  let authController: AuthController;
  let authService: AuthService;
  let userModel: UserDocument;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UserController, AuthController],
      providers: [
        UserService,
        AuthService,
        { provide: getModelToken('userModel'), useValue: userModel },
      ],
    }).compile();

    usersController = module.get<UserController>(UserController);
    usersService = module.get<UserService>(UserService);
    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  describe('GetUser', () => {
    describe('when getUserId is called', () => {
      let user: User;
      beforeAll(async () => {
        user = await usersController.findById(userStub()._id);
      });
      test('then it should call UserService', () => {
        expect(usersService.findById).toBeCalledWith(userStub()._id);
      });
      test('the it should return an user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
  // describe('CreateUser', () => {
  //   describe('when createUser is called', () => {
  //     let user: User;
  //     // eslint-disable-next-line @typescript-eslint/ban-types
  //     let createUserDto: {};
  //     beforeEach(async () => {
  //       createUserDto = {
  //         address: userStub().address,
  //         avatar: userStub().avatar,
  //         credentials: userStub().credentials,
  //         phone: userStub().phone,
  //         role: [undefined],
  //         stores: [],
  //         username: userStub().username,
  //       };
  //     });
  //   });
  // });
});
