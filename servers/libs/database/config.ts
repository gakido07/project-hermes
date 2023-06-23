import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '@projecthermes/authserver/user/entities/user.entity';
import { AssessmentEntity } from 'servers/theory-grader/src/assessment/entities/assesment.entity';
import { AssessmentAttemptEntity } from 'servers/theory-grader/src/assessment/entities/assessment.attempt';
import { QuestionEntity } from 'servers/theory-grader/src/assessment/entities/question.entity';
import { AnswerEntity } from 'servers/theory-grader/src/assessment/entities/answer.entity';

const devDatabaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.PG_URI ?? 'postgres://root:root@127.0.0.1:5432/postgres',
  entities: [
    UserEntity,
    AssessmentEntity,
    AssessmentAttemptEntity,
    QuestionEntity,
    AnswerEntity,
  ],
  synchronize: true,
  logging: ['error'],
};

export const getDatabaseConfig = (): TypeOrmModuleOptions => {
  return devDatabaseConfig;
};
