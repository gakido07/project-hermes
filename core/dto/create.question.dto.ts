import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuestionDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  score: number;

  @IsString()
  @IsNotEmpty()
  sampleAnswer: string;

  @IsString()
  @IsNotEmpty()
  text: string;
  id?: number;
}

export class CreateMultipleQuestionsDto {
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateQuestionDto)
  @IsNotEmpty()
  questions: CreateQuestionDto[];
}
