import { Location } from '../../../../schemas/location.schema';

export const locationStub = (): Location => {
  return {
    _id: '1',
    name: 'Nancy',
    postalCode: 54800,
    stores: [],
  };
};
