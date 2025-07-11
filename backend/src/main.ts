import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  const configService = app.get(ConfigService);

  const globalPrefix: string = configService.get('prefix') as string;

  app.setGlobalPrefix(globalPrefix);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  app.useGlobalInterceptors( new ClassSerializerInterceptor(app.get(Reflector)));

  // Acá activás CORS
 app.enableCors({
  origin: '*', 
});

  const swaggerHabilitado: boolean = configService.get('swaggerHabilitado') as boolean;

  if (swaggerHabilitado) {
    const config = new DocumentBuilder()
    .setTitle('Encuesta')
    .setDescription('Descripcion de la API del sistema de encuestas')
    .build()
  }

  const port: number = configService.get<number>('port') as number;

  await app.listen(port);
}
bootstrap();
