import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tea, TeaSchema } from './entities/tea.entity';
import { TeaController } from './tea.controller';
import { TeaService } from './tea.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tea.name,
        schema: TeaSchema,
      },
    ]),
  ],
  controllers: [TeaController],
  providers: [TeaService],
})
export class TeaModule {}
