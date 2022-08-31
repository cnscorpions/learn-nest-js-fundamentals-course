import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './constant/coffee.constant';

class configService {}
class developmentConfigService {}
class productionConfigService {}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavour, Event])],
  controllers: [CoffeeController],
  providers: [
    CoffeeService,
    {
      provide: COFFEE_BRANDS,
      useValue: ['星巴克', '瑞幸', '幸运咖'],
    },
    {
      provide: configService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? developmentConfigService
          : productionConfigService,
    },
  ],
  exports: [CoffeeService],
})
export class CoffeeModule {}
