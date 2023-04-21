import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'body-parser';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const errorPrinter = winston.format((info) => {
  if (!info.error) return info;
  const errorMsg = info.error.stack || info.error.toString();
  info.message += `\n${errorMsg}`;
  return info;
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        winston.format.errors({ stack: true }),
        errorPrinter(),
        nestWinstonModuleUtilities.format.nestLike('ludu-api', {
          prettyPrint: true,
          colors: true,
        }),
      ),
      transports: [new winston.transports.Console({ stderrLevels: ['error'] })],
    }),
  });

  const config = new DocumentBuilder()
    .setTitle('LUDU API')
    .setDescription('Ludu API documentation')
    .setVersion('0.0.1')
    .addTag('LUDU')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
    .build();

  await app.useGlobalPipes(new ValidationPipe());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
