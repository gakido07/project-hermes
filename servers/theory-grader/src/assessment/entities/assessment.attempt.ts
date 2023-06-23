import { AssessmentAttempt } from '@projecthermes/core/models';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnswerEntity } from '@projecthermes/theorygrader/assessment/entities/answer.entity';
import { AssessmentEntity } from '@projecthermes/theorygrader/assessment/entities/assesment.entity';

@Entity('assessment_attempt')
export class AssessmentAttemptEntity implements AssessmentAttempt {
  @PrimaryGeneratedColumn()
  readonly id: number;
  @Column()
  matricNo: number;
  @Column()
  number: number;

  @Column()
  fullName: string;

  @OneToMany(() => AnswerEntity, answer => answer.assessmentAttempt, {
    eager: true,
  })
  answers: AnswerEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    default: null,
  })
  grade: number;

  @Column({
    nullable: true,
  })
  endedAt: Date;

  @ManyToOne(() => AssessmentEntity, assessment => assessment.attempts, {
    eager: true,
  })
  assessment: AssessmentEntity;
}
