import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateTeaDto } from './dto/create-tea.dto';
import { UpdateTeaDto } from './dto/update-tea.dto';
import { TeaService } from './tea.service';

@Controller('tea')
export class TeaController {
  constructor(private readonly teaService: TeaService) {}

  @Get()
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.teaService.findAll(paginationQueryDto);
  }

  @Post()
  create(@Body() createTeaDto: CreateTeaDto) {
    return this.teaService.create(createTeaDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeaDto: UpdateTeaDto) {
    return this.teaService.update(id, updateTeaDto);
  }
}
