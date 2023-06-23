import { IsNotEmpty, IsNumber } from 'class-validator';

export class EndAssessmentDto {
  @IsNumber()
  @IsNotEmpty()
  matricNo: number;

  @IsNotEmpty()
  @IsNumber()
  attemptId: number;
}
