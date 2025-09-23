import { IsString } from 'class-validator';

export class CandidateDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;
}
