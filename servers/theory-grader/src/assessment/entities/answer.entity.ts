import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Base } from '@projecthermes/core/interfaces';
import { AssessmentEntity } from '@projecthermes/theorygrader/assessment/entities/assesment.entity';
import { AnswerModel } from '@projecthermes/core/models';
import { QuestionEntity } from '@projecthermes/theorygrader/assessment/entities/question.entity';
import { AssessmentAttemptEntity } from '@projecthermes/theorygrader/assessment/entities/assessment.attempt';

@Entity('answer')
export class AnswerEntity implements AnswerModel, Base {
  @CreateDateColumn()
  createdAt: Date;

  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({
    default: null,
    nullable: true,
  })
  score: number;

  @Column({ name: 'text_value' })
  textValue: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => QuestionEntity, question => question.answers, {
    eager: true,
  })
  @JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
  question: QuestionEntity;

  @ManyToOne(
    () => AssessmentAttemptEntity,
    assessmentAttempt => assessmentAttempt.answers,
  )
  @JoinColumn({ name: 'assessment_attempt_id', referencedColumnName: 'id' })
  assessmentAttempt: AssessmentAttemptEntity;

  matricNo: number;
}
