import { BadRequestException, Injectable } from '@nestjs/common';
import { CandidateDto } from './dto/CandidateDto.dto';
import { read, utils } from 'xlsx';
import { validate } from 'class-validator';
import { FileCandidateDto } from 'src/candidate/dto/FileCandidate.dto';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';
import { QueryParamsDto } from 'src/candidate/dto/QueryParams.dto';

@Injectable()
export class CandidateService {
  constructor(private readonly prismaService: PrismaService) {}

  async fileCandidateProperties(file: Express.Multer.File) {
    const workbook = read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rows: any[][] = utils.sheet_to_json(sheet, { header: 1 });
    const [seniority, years, availability] = rows.length > 0 ? rows[0] : [];
    const fileCandidateProperties = plainToInstance(FileCandidateDto, {
      seniority,
      years,
      availability,
    });

    const errors = await validate(fileCandidateProperties, {
      forbidNonWhitelisted: true,
    });

    if (errors.length) {
      throw new BadRequestException(errors);
    }

    return fileCandidateProperties;
  }

  async create(file: Express.Multer.File, candidateDto: CandidateDto) {
    const fileCandidateProperties = await this.fileCandidateProperties(file);
    return this.prismaService.candidate.create({
      data: { ...candidateDto, ...fileCandidateProperties },
    });
  }

  async get(queryParamsDto: QueryParamsDto) {
    const [data, total] = await Promise.all([
      this.prismaService.candidate.findMany({
        skip: queryParamsDto.getSkip(),
        take: queryParamsDto.limit,
        orderBy: { id: 'asc' },
      }),
      this.prismaService.candidate.count(),
    ]);

    return { data, total };
  }
}
