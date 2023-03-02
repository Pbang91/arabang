import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CategoiresModule } from './categoires/categoires.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('database'),
      inject: [ConfigService],
    }), 
    UsersModule,
    CategoiresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}