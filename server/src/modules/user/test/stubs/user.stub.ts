export const userStub = (): {
  createdAt: string;
  role: [string];
  address: string;
  city: string;
  postCode: string;
  credentials: {
    local: { emailVerified: string; password: string; email: string };
  };
  phone: string;
  _id: string;
  store: string;
  avatar: string;
  username: string;
  updatedAt: string;
  reviews: string[];
} => {
  return {
    _id: '62c6d3251715b648a83c2e5b',
    store: '',
    username: 'paul',
    credentials: {
      local: {
        email: 'paul@gmail.com',
        password: '$2a$10$iM7GgdjUp6ZXwtI2tCIP5.2pE9HJHwPQSao.bUFTn0HYKJUaJyiu2',
        emailVerified: 'false',
      },
    },
    role: ['USER'],
    phone: '629382938',
    avatar: '4a9c06e7-00b1-42c4-9104-4cc39c811e8f',
    address: '4 avenue Hoche',
    city: 'Maisons Laffitte',
    postCode: '78600',
    createdAt: '2022-07-07T12:35:49.239Z',
    updatedAt: '2022-07-07T12:35:49.239Z',
    reviews: [],
  };
};
