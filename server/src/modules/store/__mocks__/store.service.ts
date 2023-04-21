import { StoreStub } from '../test/stubs/store.stub';

export const StoreService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockReturnValue([StoreStub()]),
  findById: jest.fn().mockReturnValue(StoreStub()),
  create: jest.fn().mockReturnValue(StoreStub()),
  update: jest.fn().mockReturnValue(StoreStub()),
  remove: jest.fn().mockReturnValue('Success'),
});
