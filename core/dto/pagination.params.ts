import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { IsOptional, Min } from 'class-validator';

export class PaginationParams {
  // @IsOptional()
  // @IsNumber()
  // @Type(() => Number)
  // @Min(0)
  offset?: number;

  // @IsOptional()
  // @IsNumber()
  // @Type(() => Number)
  // @Min(1)
  limit?: number;
}
