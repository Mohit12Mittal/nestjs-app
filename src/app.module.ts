import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module.js';
import { UserModule } from './user/user.module.js';
import { loggerMiddleware } from './middleware/logger.middleware.js';
import { AdminModule } from './admin/admin.module.js';
import { HealthcheckController } from './healthcheck/healthcheck.controller.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        onConnectionCreate: (connection) => {
          connection.on('connected', () => {
            console.log('Mongodb Connected Successfully');
          });
          connection.on('disconnected', () => {
            console.log('Mongodb Disconnected Successfully');
          });
          connection.on('error', (error) => {
            console.log('Error arrive while connecting to mongodb', error);
          });
          return connection;
        },
      }),
    }),
    AuthModule,
    UserModule,
    AdminModule,
  ],
  controllers: [AppController, HealthcheckController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loggerMiddleware).forRoutes('*');
  }
}
