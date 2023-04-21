import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

export default (customOpts: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: customOpts.uri,
    }),
  });

export const closeMongoConnection = async () => {
  if (mongod) await mongod.stop();
};
