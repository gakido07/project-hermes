import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AssessmentService } from '@projecthermes/theorygrader/assessment/services/assessment.service';
import {
  CreateAssessmentDto,
  CreateMultipleQuestionsDto,
  CreateQuestionDto,
  PaginationParams,
  RecordAnswerRequestDto,
} from '@projecthermes/core/dto';
import { AssessmentGuard } from '@projecthermes/theorygrader/assessment/guards/assessment.guard';
import { Claims } from '@projecthermes/common/decorators/claims';
import { BeginAttemptDto } from '@projecthermes/core/dto/begin.attempt.dto';
import { AssessmentDto } from '@projecthermes/core/dto/assessment.dto';
import { VerifyKeyDto } from '@projecthermes/core/dto/verify.key.dto';
import { EndAssessmentDto } from '@projecthermes/core/dto/end.assessment.dto';

@Controller('/assessments')
@UseGuards(AssessmentGuard)
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Post('/')
  async createAssessment(
    @Body() body: CreateAssessmentDto,
    @Claims('sub') userId: number,
  ) {
    return this.assessmentService.createAssessment(userId, body);
  }

  @Get('/assessment/:id/student')
  async generateAssessmentResults(@Param('id') id: number) {}

  // @Get('/assessment/:id/student/:matricNo')
  // async generateAssessmentResultByStudentMatric(
  //   @Param('id') id: number,
  //   @Param('matricNo') matricNo: number,
  // ) {
  //   // return this.assessmentService.generateAssessmentState()
  // }

  @Get('/:id/attempts')
  async getAssessmentAttempts(@Param('id') id: number) {
    return this.assessmentService.findAllAssessmentAttempts(id);
  }

  @Post('/questions/:questionId')
  async recordAnswer(
    @Param('questionId') question: number,
    @Body() body: RecordAnswerRequestDto,
  ) {
    return this.assessmentService.recordAnswer(question, body);
  }

  @Get('/organizer/')
  async findAssessmentByOrganizerId(
    @Claims('sub') organizerId: number,
    @Query() query: PaginationParams,
  ) {
    return this.assessmentService.findPageableAssessmentsByOrganizerId({
      organizerId,
      params: query,
    });
  }

  @Get('/:id')
  async findAssessmentById(@Param('id') id: number) {
    const assessment = await this.assessmentService.findAssessmentById(id);
    await assessment.questions;
    return AssessmentDto.fromEntity(assessment);
  }

  // @Put('/:id/questions')
  // async rearrangeQuestions(@Param('id') id: number) {}

  @Post('/:id/questions')
  async createQuestion(
    @Claims('sub') userId: number,
    @Param('id') id: number,
    @Body() body: CreateMultipleQuestionsDto,
  ) {
    return this.assessmentService.createQuestion(id, body);
  }

  @Put('/:id/questions')
  async createMultipleQuestions(
    @Param('id') id: number,
    @Body() body: CreateMultipleQuestionsDto,
  ) {
    return this.assessmentService.createMultipleQuestions(id, body);
  }

  @Delete('/:id/questions')
  async deleteQuestion(@Param('id') id: number) {
    return this.assessmentService.deleteQuestionById(id);
  }

  @Put('/:assessmentId/answers/:answerId')
  async editAnswer(
    @Param('assessmentId') assessmentId: number,
    @Param('questionId') answerId: number,
  ) {
    // return this.assessmentService.editAnswer(asse);
  }

  @Post('/portal/attempt')
  async beginAttempt(@Query('key') key: string, @Body() body: BeginAttemptDto) {
    return this.assessmentService.beginAttempt(key, body);
  }

  @Post('/portal/attempt/:attemptId')
  async finishAttempt(
    @Query('key') key: string,
    @Param('attemptId') attemptId: string,
    @Body() body: EndAssessmentDto,
  ) {
    return this.assessmentService.endAttempt(key, body);
  }

  @Get('/verify/key')
  async verifyKeyExistence(@Query() query: VerifyKeyDto) {
    return this.assessmentService.verifyKeyExistence(query.key);
  }
}
