import { Module } from "@nestjs/common";
import { SwapController } from "./swap.controller";
import { SwapService } from "./swap.service";
import { SwapRepository } from "./swap.repo";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Price } from "src/common/entities/prices.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Price])],
    controllers: [SwapController],
    providers: [SwapService, SwapRepository]
})
export class SwapModule {}