import { Module } from '@nestjs/common';
import { CoffeeModule } from 'src/coffee/coffee.module';
import { DatabaseModule } from 'src/database/database.module';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [
    CoffeeModule,
    // DatabaseModule.register({
    //   type: 'postgres',
    // }),
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
