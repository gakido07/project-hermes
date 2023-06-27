import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AnswerSimilarityDto } from '@projecthermes/core/dto/answer.similarity.dto';
import { MlClient } from '@projecthermes/core/http-client/ml.client';
import { AssessmentService } from '@projecthermes/theorygrader/assessment/services/assessment.service';

@Injectable()
export class AssessmentScheduler {
  private mlClient = new MlClient();
  private readonly logger = new Logger();
  constructor(private readonly assessmentService: AssessmentService) {}

  @Cron('*/1 * * * *')
  async scheduleAssessmentGrading() {
    this.logger.log('Running grading cron');
    const attempts =
      await this.assessmentService.findUngradedFinishedAttempts();
    if (attempts.length < 1) {
      this.logger.log('No attempts to grade');
      return;
    }
    const attempt = attempts[0];
    const similarityDtoArray = attempt.answers.map(answer => {
      return new AnswerSimilarityDto(
        answer.id,
        answer.textValue,
        answer.question.sampleAnswer,
      );
    });
    try {
      const response = await this.mlClient.evaluateSimilarityWithArray(
        similarityDtoArray,
      );
      console.log(response);
      const similarityResult = response.data as AnswerSimilarityDto[];
      for (const result of similarityResult) {
        const answer = await this.assessmentService.findAnswerById(
          result.answerId,
        );
        await answer.question;
        console.log(answer.question);
        const question = await this.assessmentService.findQuestionById(
          answer.question.id,
        );
        this.assessmentService.setAnswerGrade(
          result.answerId,
          this.establishGrade(result.similarityValue, question.score),
        );
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  establishGrade(similarityValue: number, questionScore: number): number {
    if (similarityValue <= 0) return 0;
    if (similarityValue > 0 && similarityValue <= 8.5) return questionScore / 2;
    return questionScore;
  }
}
