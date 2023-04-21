import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LocationModule } from './modules/location/location.module';
import { StoreModule } from './modules/store/store.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { GameModule } from './modules/game/game.module';
import { CopyModule } from './modules/copy/copy.module';
import { RentModule } from './modules/rent/rent.module';
import { CategoryModule } from './modules/category/category.module';
import { ReviewModule } from './modules/review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('app.database.prod'),
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static/images'),
    }),
    LocationModule,
    StoreModule,
    AuthModule,
    UserModule,
    GameModule,
    CopyModule,
    CategoryModule,
    RentModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
