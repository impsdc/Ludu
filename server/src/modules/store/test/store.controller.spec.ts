import { Test, TestingModule } from '@nestjs/testing';
import { StoreController } from '../store.controller';
import { StoreService } from '../store.service';
import { Store, StoreDocument } from '../../../schemas/store.schema';
import { StoreStub } from './stubs/store.stub';
import { StoreDto } from '../dto/store.dto';
import { LocationDocument } from '../../../schemas/location.schema';
import { getModelToken } from '@nestjs/mongoose';

jest.mock('../store.service');

describe('StoreController', () => {
  let storeController: StoreController;
  let storeService: StoreService;
  let storeModel: StoreDocument;
  let locationModel: LocationDocument;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreController],
      providers: [StoreService],
    }).compile();

    storeController = module.get<StoreController>(StoreController);
    storeService = module.get<StoreService>(StoreService);
    jest.clearAllMocks();
  });
  //getLocation
  describe('getStore', () => {
    //TEST FINDBYID
    describe('when get findById is called', () => {
      let store: Store;
      beforeAll(async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        store = await storeController.findById(StoreStub()._id);
      });
      test('then it should called StoreService.findById', () => {
        expect(storeService.findById).toBeCalledWith(StoreStub()._id);
      });

      test('then it should return a Store', () => {
        expect(store).toEqual(StoreStub());
      });
    });

    //TEST FINDALL
    describe('when get findAll is called', () => {
      let store: Store;
      beforeAll(async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        store = await storeController.findAll();
      });
      test('then it should called StoreService.findById', () => {
        expect(storeService.findAll).toBeCalled();
      });

      test('then it should return a Store', () => {
        expect(store).toEqual([StoreStub()]);
      });
    });
  });
  // CREATE LOCATION
  describe('Create Store', () => {
    describe('when create Store is called', () => {
      let store: Store;
      let createStore: StoreDto;
      beforeAll(async () => {
        createStore = {
          _id: undefined,
          address: '43 rue de toto, Lille 59000',
          iban: '624b38cba7e749T6ZE9Y2',
          location: '624b38cba7e740343c07062e',
          name: 'machin',
          owner: 'WIlliam OFfei',
          phone: '0674382949',
        };
        store = await storeController.create(createStore);
      });
      test('then it should called Store.create', () => {
        expect(storeService.create).toBeCalledWith(createStore);
      });
      test('then it should return the Store created', () => {
        expect(store).toEqual(StoreStub());
      });
    });
  });
});
