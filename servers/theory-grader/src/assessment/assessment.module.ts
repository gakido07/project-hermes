import { Module } from '@nestjs/common';
import { AssessmentService } from '@projecthermes/theorygrader/assessment/services/assessment.service';
import { AssessmentController } from '@projecthermes/theorygrader/assessment/controllers/assessment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssessmentEntity } from '@projecthermes/theorygrader/assessment/entities/assesment.entity';
import { AnswerEntity } from '@projecthermes/theorygrader/assessment/entities/answer.entity';
import { QuestionEntity } from '@projecthermes/theorygrader/assessment/entities/question.entity';
import { AssessmentAttemptEntity } from '@projecthermes/theorygrader/assessment/entities/assessment.attempt';
import { AssessmentScheduler } from '@projecthermes/theorygrader/assessment/schedulers/assessment.scheduler';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssessmentEntity,
      AnswerEntity,
      QuestionEntity,
      AssessmentAttemptEntity,
    ]),
  ],
  providers: [AssessmentService, AssessmentScheduler],
  controllers: [AssessmentController],
})
export class AssessmentModule {}
