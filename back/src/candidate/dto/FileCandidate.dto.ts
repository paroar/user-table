import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsNumber, IsPositive } from 'class-validator';
import { SeniorityLevel } from 'src/candidate/enum/seniority';

export class FileCandidateDto {
  @IsIn([...Object.values(SeniorityLevel)])
  seniority: SeniorityLevel;

  @IsPositive()
  @IsNumber()
  years: number;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  availability: boolean;
}
