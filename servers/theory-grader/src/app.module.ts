import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@projecthermes/common/guards/jwt.auth.guard';
import { AuthModule } from '@projecthermes/authserver/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from '@projecthermes/core/server-libs/database';
import { AssessmentModule } from '@projecthermes/theorygrader/assessment/assessment.module';
import { LoggingMiddleware } from '@projecthermes/common/middlewares/request.logger.middleware';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...getDatabaseConfig(), synchronize: true }),
    AuthModule,
    AssessmentModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('/');
  }
}
