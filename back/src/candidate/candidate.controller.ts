import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateDto } from 'src/candidate/dto/CandidateDto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { QueryParamsDto } from 'src/candidate/dto/QueryParams.dto';

@Controller()
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post('candidates')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() candidateDto: CandidateDto,
  ) {
    return this.candidateService.create(file, candidateDto);
  }

  @Get('candidates')
  get(@Query() queryParamsDto: QueryParamsDto) {
    return this.candidateService.get(queryParamsDto);
  }
}
