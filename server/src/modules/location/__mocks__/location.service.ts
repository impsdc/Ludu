import { locationStub } from '../test/stubs/location.stub';

export const LocationService = jest.fn().mockReturnValue({
  findById: jest.fn().mockReturnValue(locationStub()),
  findAll: jest.fn().mockReturnValue([locationStub()]),
  findByZib: jest.fn().mockReturnValue([locationStub()]),
  create: jest.fn().mockReturnValue(locationStub()),
  update: jest.fn().mockReturnValue(locationStub()),
});
