import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateTeaDto } from './dto/create-tea.dto';
import { UpdateTeaDto } from './dto/update-tea.dto';
import { Tea } from './entities/tea.entity';

@Injectable()
export class TeaService {
  constructor(@InjectModel(Tea.name) private readonly teaModel: Model<Tea>) {}

  findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = paginationQueryDto;
    return this.teaModel.find().skip(offset).limit(limit).exec();
  }

  create(createTeaDto: CreateTeaDto) {
    console.log('createTeaDto', createTeaDto);
    const tea = new this.teaModel(createTeaDto);
    return tea.save();
  }

  update(id: string, updateTeaDto: UpdateTeaDto) {
    const existingTea = this.teaModel.findOneAndUpdate(
      {
        _id: id,
      },
      { $set: updateTeaDto },
      {
        new: true,
      },
    );
    if (!existingTea) {
      throw new NotFoundException(`Tea #${id} not found!`);
    }
    return existingTea;
  }
}
