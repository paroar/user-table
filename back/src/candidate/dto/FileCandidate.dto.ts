import { IsIn, IsNumber, IsPositive } from 'class-validator';

export class FileCandidateDto {
  @IsIn(['junior', 'senior'])
  seniority: string;

  @IsPositive()
  @IsNumber()
  years: number;

  @IsIn(['true', 'false'])
  availability: string;
}
