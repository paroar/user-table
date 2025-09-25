import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class QueryParamsDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10) || 1)
  page: number = 1;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10) || 10)
  limit: number = 10;

  public getSkip(): number {
    return (this.page - 1) * this.limit;
  }
}
