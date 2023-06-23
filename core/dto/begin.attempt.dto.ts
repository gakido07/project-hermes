import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class BeginAttemptDto {
  @IsNotEmpty()
  @IsNumber()
  matricNo: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;
}
