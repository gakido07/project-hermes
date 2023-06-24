import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, LessThan, Repository } from 'typeorm';
import {
  ConflictException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateAssessmentDto,
  CreateMultipleQuestionsDto,
  PaginationParams,
  RecordAnswerRequestDto,
} from '@projecthermes/core/dto';
import { AnswerEntity } from '@projecthermes/theorygrader/assessment/entities/answer.entity';
import { AssessmentEntity } from '@projecthermes/theorygrader/assessment/entities/assesment.entity';
import { QuestionEntity } from '@projecthermes/theorygrader/assessment/entities/question.entity';
import { generateString } from '@projecthermes/core/util';
import { BeginAttemptDto } from '@projecthermes/core/dto/begin.attempt.dto';
import { AssessmentAttemptEntity } from '@projecthermes/theorygrader/assessment/entities/assessment.attempt';
import { EndAssessmentDto } from '@projecthermes/core/dto/end.assessment.dto';
import { AssessmentPortalDto } from '@projecthermes/core/dto/assessment.portal.dto';
import { AssessmentPortalQuestion } from '@projecthermes/core/dto/assessment.portal.question';
import { MlClient } from '@projecthermes/core/http-client/ml.client';
import * as moment from 'moment';

export class AssessmentService {
  private readonly mlClient = new MlClient();

  constructor(
    @InjectRepository(AssessmentEntity)
    private readonly assessmentRepository: Repository<AssessmentEntity>,
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(AssessmentAttemptEntity)
    private readonly assessmentAttemptRepository: Repository<AssessmentAttemptEntity>,
    private readonly datasource: DataSource,
  ) {}

  async createAssessment(
    organizerId: number,
    { name, deadline, startTime, duration }: CreateAssessmentDto,
  ) {
    const newAssessment = this.assessmentRepository.create({
      name,
      deadline,
      startTime,
      organizerId,
      key: generateString(16),
      duration,
    });
    return await this.assessmentRepository.save(newAssessment);
  }

  async findAllAssessmentAttempts(id: number) {
    return this.assessmentAttemptRepository.find({
      where: {
        assessment: {
          id,
        },
      },
    });
  }

  async loadAssessmentPortalData(key: string) {
    const assessment = await this.assessmentRepository.findOne({
      where: {
        key,
      },
    });
    if (!assessment) throw new NotFoundException('Assessment Not found');
    if (assessment.startTime.getTime() >= new Date().getTime())
      throw new ConflictException('Assessment has not started');

    await assessment.questions;
    return assessment;
  }

  async verifyKeyExistence(key: string): Promise<{ exists: boolean }> {
    const exists = await this.assessmentRepository.exist({
      where: {
        key,
      },
    });
    return { exists };
  }

  async findAnswerById(answerId: number, exception?: HttpException) {
    const answer = await this.answerRepository.findOneBy({
      id: answerId,
    });
    if (!answer && exception) throw exception;
    return answer;
  }

  async editQuestion() {}

  async createQuestion(assessmentId: number, body: CreateMultipleQuestionsDto) {
    const questionCount = await this.questionRepository.count({
      where: {
        assessment: {
          id: assessmentId,
        },
      },
    });
    const assessment = await this.assessmentRepository.findOne({
      where: {
        id: assessmentId,
      },
    });
    for (const questionDto of body.questions) {
      const { sampleAnswer, score, text } = questionDto;
      const newQuestion = this.questionRepository.create({
        sampleAnswer,
        score,
        number: questionCount + 1,
        text,
        assessment: assessment,
      });
      await this.questionRepository.save(newQuestion);
    }
  }

  async deleteQuestionById(questionId: number) {
    await this.questionRepository.delete({ id: questionId });
  }

  async createMultipleQuestions(
    assessmentId: number,
    { questions }: CreateMultipleQuestionsDto,
  ) {
    const assessment = await this.findAssessmentById(
      assessmentId,
      new NotFoundException('assessment not found'),
    );
    await this.questionRepository.delete({
      assessment: {
        id: assessmentId,
      },
    });
    let questionCount = await this.questionRepository.count({
      where: {
        assessment: {
          id: assessmentId,
        },
      },
    });
    for (const { sampleAnswer, score, text } of questions) {
      const newQuestion = this.questionRepository.create({
        sampleAnswer,
        score,
        number: questionCount + 1,
        text,
        assessment: assessment,
      });
      questionCount++;
      await this.questionRepository.save(newQuestion);
    }
    return questions;
  }

  async beginAttempt(
    key: string,
    { matricNo, name }: BeginAttemptDto,
  ): Promise<AssessmentPortalDto> {
    const assessment = await this.assessmentRepository.findOne({
      where: {
        key,
      },
    });
    if (!assessment) throw new NotFoundException('Assessment Not found');
    // if (assessment.startTime.getTime() >= new Date().getTime())
    //   throw new ConflictException('Assessment has not started');
    let attempt = await this.assessmentAttemptRepository.findOne({
      where: {
        assessment: {
          id: assessment.id,
        },
        matricNo,
      },
    });
    if (!attempt) {
      attempt = await this.assessmentAttemptRepository.create({
        assessment: {
          id: assessment.id,
        },
        matricNo,
        number: 1,
        fullName: name,
      });
      await this.assessmentAttemptRepository.save(attempt);
    }
    const questions = await assessment.questions;
    return {
      assessment,
      questions: questions.map(
        question => new AssessmentPortalQuestion(question),
      ),
      assessmentAttempt: attempt,
    };
  }

  async endAttempt(key: string, { matricNo, attemptId }: EndAssessmentDto) {
    const attempt = await this.assessmentAttemptRepository.findOne({
      where: {
        assessment: {
          key,
          id: attemptId,
        },
        matricNo,
      },
    });
    if (!attempt) throw new NotFoundException('Attempt not found');
    return await this.assessmentAttemptRepository.update(
      {
        assessment: {
          key,
          id: attemptId,
        },
        matricNo,
      },
      {
        endedAt: new Date(),
      },
    );
  }

  async findPageableAssessmentsByOrganizerId({
    organizerId,
    params,
  }: {
    organizerId: number;
    params?: PaginationParams;
  }) {
    return this.assessmentRepository.find({
      where: {
        organizerId,
      },
      order: {
        createdAt: 'ASC',
      },
      skip: params?.offset || 0,
      take: params?.limit || 10,
    });
  }

  async findAssessmentById(id: number, exception?: HttpException) {
    const assessment = await this.assessmentRepository.findOne({
      where: {
        id,
      },
    });
    if (!assessment && exception) throw exception;
    return assessment;
  }

  async editAnswer(answerId: number, textValue: string) {
    const answer = await this.findAnswerById(
      answerId,
      new NotFoundException('Answer not found'),
    );
    answer.textValue = textValue;
    return this.answerRepository.save(answer);
  }

  async pageablefindQuestionsByAssessmentId({
    assessmentId,
    params,
  }: {
    assessmentId: number;
    params: PaginationParams;
  }) {
    return await this.questionRepository.find({
      where: {
        assessment: {
          id: assessmentId,
        },
      },
      order: {
        number: 'ASC',
      },
      skip: params?.offset || 0,
      take: params?.limit || 10,
    });
  }

  async findUngradedFinishedAttempts(): Promise<AssessmentAttemptEntity[]> {
    console.log(moment.utc().toDate());
    return this.assessmentAttemptRepository.find({
      where: {
        grade: null,
        endedAt: LessThan(moment.utc().toDate()),
      },
    });
  }

  // async generateAssessmentState({
  //   assessmentId,
  //   matricNo,
  //   params,
  // }: FindAnswerRequestDto) {
  //   const { offset, limit } = params;
  //   const assessment = await this.assessmentRepository.findOne({
  //     where: {
  //       id: assessmentId,
  //     },
  //   });
  //   if (!assessment) throw new NotFoundException('Assessment not found');
  //   const [data, count] = await this.answerRepository.findAndCount({
  //     where: {
  //       assessment: {
  //         id: assessmentId,
  //       },
  //       matricNo,
  //     },
  //     skip: offset || 0,
  //     take: limit || 10,
  //   });
  //   return {
  //     data,
  //     count,
  //     offset,
  //     limit,
  //   };
  // }

  async setAnswerGrade(answerId: number, grade: number) {
    return this.answerRepository.update(
      {
        id: answerId,
      },
      {
        score: grade,
      },
    );
  }

  async findQuestionById(questionId: number) {
    return this.questionRepository.findOne({
      where: {
        id: questionId,
      },
    });
  }

  async recordAnswer(
    questionId: number,
    { matricNo, answerText, attemptId }: RecordAnswerRequestDto,
  ) {
    const question = await this.questionRepository.findOne({
      where: {
        id: questionId,
      },
    });
    const attempt = await this.assessmentAttemptRepository.findOne({
      where: {
        id: attemptId,
      },
    });
    if (!attempt) throw new NotFoundException('Attempt not found');
    if (!question) throw new NotFoundException('Question not found');
    const alreadyAnswered = await this.answerRepository.exist({
      where: {
        assessmentAttempt: {
          matricNo,
        },
        question: {
          id: questionId,
        },
      },
    });
    if (alreadyAnswered) {
      await this.answerRepository.update(
        {
          assessmentAttempt: {
            matricNo,
          },
          question: {
            id: questionId,
          },
        },
        {
          textValue: answerText,
        },
      );
    } else {
      const answer = await this.answerRepository.create({
        textValue: answerText,
        matricNo,
        question: question,
        assessmentAttempt: attempt,
      });
      await this.answerRepository.save(answer);
    }
  }

  async gradeAnswer(answerId: number) {
    const answer = await this.answerRepository.findOne({
      where: {
        id: answerId,
      },
    });
    const { sampleAnswer } = answer.question;
    // const {
    //   data: { score },
    // } = await this.mlClient.getTextSimilarity(answer.textValue, sampleAnswer);
    // await this.answerRepository.update(
    //   {
    //     id: answer.id,
    //   },
    //   {
    //     score,
    //   },
    // );
  }

  async findQuestionsAndAnswersByMatricNoAndAssessmentId(
    matricNo: number,
    assessmentId: number,
  ) {
    const data = this.datasource
      .createQueryBuilder(QuestionEntity, 'question')
      .leftJoin('answer.assessment_id', 'answer')
      .where('answer.assessment_id = :assessmentId', { assessmentId })
      .andWhere('answer.matric_no = :matricNo', {
        matricNo,
      });
    return data;
  }
}
