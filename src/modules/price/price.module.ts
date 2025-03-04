import { Module } from "@nestjs/common";
import { PriceController } from "./price.controller";
import { PriceService } from "./price.service";
import { PriceRepository } from "./price.repo";
import { Price } from "src/common/entities/prices.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Price])],
    controllers : [PriceController],
    providers: [PriceService, PriceRepository]
})
export class PriceModule {}