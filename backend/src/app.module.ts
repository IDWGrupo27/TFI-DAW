import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncuestasModule } from './modules/encuestas/encuestas.module';
import configuration from './config/configuration';
import { RespuestasModule } from './modules/respuestas/respuestas.modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        autoLoadEntities: true,
        synchronize: false,
        logging: configService.get<boolean>('database.logging'),
        logger: configService.get('database.logger'),
        /*host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'martin014256',
        database: 'encuestas',
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
        logger: 'advanced-console',*/
      }),
    }),
    EncuestasModule,
    RespuestasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
