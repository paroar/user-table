import { Module } from '@nestjs/common';
import { CandidateModule } from 'src/candidate/candidate.module';

@Module({
  imports: [CandidateModule],
})
export class AppModule {}
