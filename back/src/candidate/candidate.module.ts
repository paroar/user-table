import { Module } from '@nestjs/common';
import { CandidateController } from 'src/candidate/candidate.controller';
import { CandidateService } from 'src/candidate/candidate.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CandidateController],
  providers: [CandidateService],
})
export class CandidateModule {}
