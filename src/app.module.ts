import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PriceModule } from './modules/price/price.module';
import { SwapModule } from './modules/swap/swap.module';
import { AlertModule } from './modules/alert/alert.module';

@Module({
  imports: [PriceModule, SwapModule, AlertModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
