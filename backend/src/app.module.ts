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
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: Number(configService.get<string>('DB_PORT', '5432')),
        username: configService.get<string>('DB_USER', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'root'),
        database: configService.get<string>('DB_NAME', 'encuestas'),
        synchronize: true, // ojo, solo desarrollo
        autoLoadEntities: true,
        logging: configService.get<string>('DB_LOGGING', 'false') === 'true',
        logger: 'advanced-console' as
          | 'advanced-console'
          | 'debug'
          | 'simple-console'
          | 'formatted-console'
          | 'file',
      }),
    }),
    EncuestasModule,
    RespuestasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
