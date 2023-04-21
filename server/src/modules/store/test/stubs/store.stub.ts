import { Store } from '../../../../schemas/store.schema';

export const StoreStub = (): Store => {
  return {
    _id: '1',
    address: '96 rue de stations, Lille 59000',
    iban: 'FR7630004000031234567890143',
    location: undefined,
    name: 'KingJouet',
    owner: 'Richard Santamaria',
    phone: '0628392839',
    copies: [],
    reviews: [],
  };
};
