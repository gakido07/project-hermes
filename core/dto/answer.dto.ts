import { PaginationParams } from '@projecthermes/core/dto/pagination.params';
import { IsNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FindAnswerRequestDto {
  @IsNumber()
  @IsNotEmpty()
  matricNo: number;

  @IsNumber()
  @IsNotEmpty()
  assessmentId: number;

  @IsOptional()
  params?: PaginationParams;
}

export class RecordAnswerRequestDto {
  @IsNotEmpty()
  @IsString()
  answerText: string;

  @IsNumber()
  @IsNotEmpty()
  matricNo: number;

  @IsNumber()
  @IsNotEmpty()
  attemptId: number;

  constructor(answerText: string, matricNo: number, attemptId: number) {
    this.answerText = answerText;
    this.matricNo = matricNo;
    this.attemptId = attemptId;
  }
}
