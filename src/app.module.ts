import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CategoiresModule } from './categoires/categoires.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Users } from './users/users.entity';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // ignoreEnvFile: true,
      // envFilePath: ['.env'],
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('database'),
      // useFactory: (configService: ConfigService) => ({
      //   type: 'mysql',
      //   host: configService.get('host'),
      //   port: configService.get('port'),
      //   username: configService.get('username'),
      //   password: configService.get('password'),
      //   database: configService.get('database'),
      //   entities: [Users],
      // }),
      // synchronize: configService.get('synchronize'),
      inject: [ConfigService],
    }), 
    UsersModule,
    CategoiresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}