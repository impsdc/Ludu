import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from '../location.controller';
import { LocationService } from '../location.service';
import { Location, LocationDocument } from '../../../schemas/location.schema';
import { locationStub } from './stubs/location.stub';
import { LocationDto } from '../dto/location.dto';

jest.mock('../location.service');

describe('LocationController', () => {
  let locationController: LocationController;
  let locationService: LocationService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [LocationService],
    }).compile();

    locationController = module.get<LocationController>(LocationController);
    locationService = module.get<LocationService>(LocationService);
    jest.clearAllMocks();
  });

  describe('getLocation', () => {
    //TEST FINDBYID
    describe('when get findById is called', () => {
      let location: LocationDocument[];
      beforeAll(async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        location = await locationController.findById(locationStub()._id);
      });
      test('then it should called locationService.findById', () => {
        expect(locationService.findById).toBeCalledWith(locationStub()._id);
      });

      test('then it should return a location', () => {
        expect(location).toEqual(locationStub());
      });
    });
    //TEST FIND ALL
    describe('when get findAll  is called', () => {
      let location: LocationDocument[];

      beforeAll(async () => {
        location = await locationController.findAll();
      });
      test('then it should called locationService.findAll', () => {
        expect(locationService.findAll).toBeCalled();
      });

      test('then it should return a location', () => {
        expect(location).toEqual([locationStub()]);
      });
    });
    //TEST FINDBYZIP
    /*  describe('when get findByZip is called', () => {
      let location: LocationDocument[];

      beforeAll(async () => {
        location = await locationController.findByZip(
          locationStub().postalCode,
        );
      });
      test('then it should called locationService.findByZib', () => {
        expect(locationService.findByZip).toBeCalledWith(
          locationStub().postalCode,
        );
      });

      test('then it should return an array of location', () => {
        expect(location).toEqual([locationStub()]);
      });
    });*/
  });
  // CREATE LOCATION
  describe('Create Location', () => {
    describe('when create location is called', () => {
      let location: Location;
      let createLocation: LocationDto;
      beforeAll(async () => {
        createLocation = {
          _id: undefined,
          name: locationStub().name,
          postalCode: locationStub().postalCode,
          stores: undefined,
        };
        location = await locationController.create(createLocation);
      });
      test('then it should called locationService.create', () => {
        expect(locationService.create).toBeCalledWith(createLocation);
      });
      test('then it should return the location created', () => {
        expect(location).toEqual(locationStub());
      });
    });
  });
});
