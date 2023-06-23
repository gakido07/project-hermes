import { Base } from '@projecthermes/core/interfaces';
import { TheoryAssessment } from '@projecthermes/core/models';
import { QuestionEntity } from '@projecthermes/theorygrader/assessment/entities/question.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AssessmentAttemptEntity } from '@projecthermes/theorygrader/assessment/entities/assessment.attempt';

@Entity('assessment')
export class AssessmentEntity implements Base, TheoryAssessment {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  deadline: Date;

  @Column()
  name: string;

  @Column({ name: 'organizer_id' })
  organizerId: number;

  @OneToMany(type => QuestionEntity, question => question.assessment, {
    eager: false,
    orphanedRowAction: 'delete',
  })
  questions: Promise<QuestionEntity[]>;

  @OneToMany(type => AssessmentAttemptEntity, attempt => attempt.assessment, {
    eager: false,
  })
  attempts: Promise<AssessmentAttemptEntity[]>;

  @Column()
  startTime: Date;

  @Column({
    unique: true,
  })
  key: string;

  @Column({
    nullable: true,
  })
  duration: number;

  @Column({
    nullable: true,
  })
  description: string;
}
