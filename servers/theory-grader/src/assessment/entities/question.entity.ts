import { Question } from 'core/models';
import { Base } from 'core/interfaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { AssessmentEntity } from '@projecthermes/theorygrader/assessment/entities/assesment.entity';
import { AnswerEntity } from '@projecthermes/theorygrader/assessment/entities/answer.entity';

@Entity({ name: 'question' })
export class QuestionEntity implements Question, Base {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  number: number;

  @Column()
  sampleAnswer: string;

  @Column()
  score: number;

  @ManyToOne(() => AssessmentEntity, assessment => assessment.questions)
  @JoinColumn({ name: 'assessment_id', referencedColumnName: 'id' })
  assessment: AssessmentEntity;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(type => AnswerEntity, answer => answer.question, {
    eager: false,
  })
  answers: AnswerEntity[];

  @Column()
  text: string;
}

export interface QuestionEntityConstructorParams {
  number: number;
  sampleAnswer: string;
  score: number;
  assessment: AssessmentEntity;
  text: string;
}
