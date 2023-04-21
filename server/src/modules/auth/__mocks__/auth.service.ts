import { userStub } from '../../user/test/stubs/user.stub';

export const AuthService = jest.fn().mockReturnValue({
  register: jest.fn().mockResolvedValue(userStub()),
});
