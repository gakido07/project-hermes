import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAssessmentDto {
  @IsDateString()
  @IsNotEmpty()
  deadline: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
