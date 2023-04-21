import { userStub } from '../test/stubs/user.stub';

export const UserService = jest.fn().mockReturnValue({
  findById: jest.fn().mockResolvedValue(userStub()),
  createUser: jest.fn().mockResolvedValue(userStub()),
});
